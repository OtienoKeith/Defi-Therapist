import { 
  users, 
  type User, 
  type InsertUser, 
  wallets, 
  type Wallet,
  type InsertWallet,
  tradingAnalyses,
  type TradingAnalysis,
  type InsertTradingAnalysis 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Wallet methods
  getWallet(id: number): Promise<Wallet | undefined>;
  getWalletByAddress(address: string): Promise<Wallet | undefined>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  updateWalletLastAnalyzed(id: number, lastAnalyzed: Date): Promise<Wallet>;
  
  // Trading Analysis methods
  getTradingAnalysis(id: number): Promise<TradingAnalysis | undefined>;
  getAnalysesByWalletId(walletId: number): Promise<TradingAnalysis[]>;
  getLatestAnalysisByWalletId(walletId: number): Promise<TradingAnalysis | undefined>;
  createTradingAnalysis(analysis: InsertTradingAnalysis): Promise<TradingAnalysis>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private wallets: Map<number, Wallet>;
  private tradingAnalyses: Map<number, TradingAnalysis>;
  private userIdCounter: number;
  private walletIdCounter: number;
  private analysisIdCounter: number;

  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.tradingAnalyses = new Map();
    this.userIdCounter = 1;
    this.walletIdCounter = 1;
    this.analysisIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Wallet methods
  async getWallet(id: number): Promise<Wallet | undefined> {
    return this.wallets.get(id);
  }
  
  async getWalletByAddress(address: string): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(
      (wallet) => wallet.address === address,
    );
  }
  
  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const id = this.walletIdCounter++;
    const wallet: Wallet = { 
      ...insertWallet, 
      id,
      lastAnalyzed: null 
    };
    this.wallets.set(id, wallet);
    return wallet;
  }
  
  async updateWalletLastAnalyzed(id: number, lastAnalyzed: Date): Promise<Wallet> {
    const wallet = await this.getWallet(id);
    if (!wallet) {
      throw new Error(`Wallet with ID ${id} not found`);
    }
    
    const updatedWallet: Wallet = { 
      ...wallet, 
      lastAnalyzed 
    };
    this.wallets.set(id, updatedWallet);
    return updatedWallet;
  }
  
  // Trading Analysis methods
  async getTradingAnalysis(id: number): Promise<TradingAnalysis | undefined> {
    return this.tradingAnalyses.get(id);
  }
  
  async getAnalysesByWalletId(walletId: number): Promise<TradingAnalysis[]> {
    return Array.from(this.tradingAnalyses.values())
      .filter(analysis => analysis.walletId === walletId)
      .sort((a, b) => {
        const aTime = a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.getTime() || 0;
        return bTime - aTime; // Sort by most recent first
      });
  }
  
  async getLatestAnalysisByWalletId(walletId: number): Promise<TradingAnalysis | undefined> {
    const analyses = await this.getAnalysesByWalletId(walletId);
    return analyses.length > 0 ? analyses[0] : undefined;
  }
  
  async createTradingAnalysis(insertAnalysis: InsertTradingAnalysis): Promise<TradingAnalysis> {
    const id = this.analysisIdCounter++;
    const analysis: TradingAnalysis = { 
      ...insertAnalysis, 
      id,
      createdAt: new Date()
    };
    this.tradingAnalyses.set(id, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
