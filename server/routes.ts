import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeTradingPsychology } from "./lib/openai";
import { fetchWalletTrades, fetchSolanaPrice } from "./lib/trades";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get SOL price
  app.get("/api/solana/price", async (req: Request, res: Response) => {
    try {
      const price = await fetchSolanaPrice();
      res.json({ price });
    } catch (error) {
      console.error("Error fetching SOL price:", error);
      res.status(500).json({ message: "Failed to fetch SOL price" });
    }
  });

  // Fetch trading data for a wallet
  app.get("/api/trades/:walletAddress", async (req: Request, res: Response) => {
    try {
      const { walletAddress } = req.params;
      
      // Validate wallet address
      if (!walletAddress || walletAddress.length < 32) {
        return res.status(400).json({ message: "Invalid wallet address" });
      }
      
      const tradeData = await fetchWalletTrades(walletAddress);
      res.json(tradeData);
    } catch (error) {
      console.error("Error fetching trading data:", error);
      res.status(500).json({ message: "Failed to fetch trading data" });
    }
  });

  // Analyze trading psychology
  app.post("/api/analyze", async (req: Request, res: Response) => {
    try {
      const { walletAddress, trades } = req.body;
      
      // Validate request
      if (!walletAddress || !trades || !Array.isArray(trades)) {
        return res.status(400).json({ message: "Invalid request data" });
      }
      
      // Check if we have an existing wallet in storage
      let wallet = await storage.getWalletByAddress(walletAddress);
      
      // If not, create a new wallet
      if (!wallet) {
        wallet = await storage.createWallet({ address: walletAddress });
      }
      
      // Check if we have a recent analysis for this wallet
      const existingAnalysis = await storage.getLatestAnalysisByWalletId(wallet.id);
      
      // If we have a recent analysis (less than 24 hours old), return it
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;
      if (
        existingAnalysis && 
        existingAnalysis.createdAt && 
        (new Date().getTime() - existingAnalysis.createdAt.getTime() < ONE_DAY_MS)
      ) {
        return res.json(existingAnalysis.analysisData);
      }
      
      // Otherwise, create a new analysis
      const analysisResult = await analyzeTradingPsychology(trades);
      
      // Save the analysis result to storage
      await storage.createTradingAnalysis({
        walletId: wallet.id,
        analysisData: analysisResult,
      });
      
      // Update the wallet's last analyzed timestamp
      await storage.updateWalletLastAnalyzed(wallet.id, new Date());
      
      // Return the analysis result
      res.json(analysisResult);
    } catch (error) {
      console.error("Error analyzing trading psychology:", error);
      res.status(500).json({ message: "Analysis failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
