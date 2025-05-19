import { Trade, TradeMetrics } from "@/lib/tradeData";

// Cache for prices to avoid excessive API calls
const priceCache: { [key: string]: { price: number; timestamp: number } } = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * Fetches trading data for a wallet from OKX DEX
 */
export async function fetchWalletTrades(walletAddress: string): Promise<{
  trades: Trade[];
  metrics: TradeMetrics;
}> {
  try {
    // Normally we would call the OKX DEX API here, but since this is a simulation
    // we'll generate realistic trading data based on the wallet address as a seed
    
    // Use the last 8 characters of the wallet address as a pseudo-random seed
    const seed = walletAddress.slice(-8);
    const seedNum = parseInt(seed, 16);
    
    // Generate between 25-50 trades
    const numTrades = 25 + (seedNum % 25);
    const trades: Trade[] = [];
    
    // Common trading pairs
    const pairs = ["SOL/USDC", "BTC/USDC", "ETH/USDC", "JUP/USDC", "BONK/USDC"];
    
    // Generate trades over the last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    let totalProfitLoss = 0;
    const pairCounts: { [key: string]: number } = {};
    
    for (let i = 0; i < numTrades; i++) {
      // Select a random pair with some bias towards SOL/USDC
      const pairIndex = i % 3 === 0 ? 0 : Math.floor((seedNum * (i + 1)) % pairs.length);
      const pair = pairs[pairIndex];
      
      // Count occurrences for most active pair
      pairCounts[pair] = (pairCounts[pair] || 0) + 1;
      
      // Random timestamp in the last 30 days
      const timestamp = new Date(
        thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
      ).toISOString();
      
      // Generate price based on pair
      let price = 0;
      switch (pair) {
        case "SOL/USDC":
          price = 150 + ((seedNum * i) % 50); // $150-$200
          break;
        case "BTC/USDC":
          price = 60000 + ((seedNum * i) % 10000); // $60,000-$70,000
          break;
        case "ETH/USDC":
          price = 3000 + ((seedNum * i) % 1000); // $3,000-$4,000
          break;
        case "JUP/USDC":
          price = 0.5 + ((seedNum * i) % 100) / 100; // $0.5-$1.5
          break;
        case "BONK/USDC":
          price = 0.00001 + ((seedNum * i) % 100) / 10000000; // Very small price
          break;
      }
      
      // Randomize buy/sell
      const type = (seedNum * i) % 2 === 0 ? "buy" : "sell";
      
      // Amount based on pair
      let amount = 0;
      switch (pair) {
        case "SOL/USDC":
          amount = 5 + ((seedNum * i) % 20); // 5-25 SOL
          break;
        case "BTC/USDC":
          amount = 0.1 + ((seedNum * i) % 10) / 100; // 0.1-0.2 BTC
          break;
        case "ETH/USDC":
          amount = 0.5 + ((seedNum * i) % 20) / 10; // 0.5-2.5 ETH
          break;
        case "JUP/USDC":
          amount = 100 + ((seedNum * i) % 900); // 100-1000 JUP
          break;
        case "BONK/USDC":
          amount = 1000000 + ((seedNum * i) % 9000000); // Lots of BONK
          break;
      }
      
      // Calculate profit/loss
      const profitLossPercent = ((seedNum * i) % 20) - 10; // -10% to +10%
      const profitLoss = (type === "sell" ? 1 : -1) * price * amount * (profitLossPercent / 100);
      
      totalProfitLoss += profitLoss;
      
      trades.push({
        pair,
        type,
        price,
        amount,
        timestamp,
        profitLoss
      });
    }
    
    // Sort by timestamp (newest first)
    trades.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Calculate most active pair
    let mostActivePair = pairs[0];
    let maxCount = 0;
    
    for (const [pair, count] of Object.entries(pairCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostActivePair = pair;
      }
    }
    
    const metrics: TradeMetrics = {
      totalTrades: trades.length,
      mostActivePair,
      profitLoss: totalProfitLoss
    };
    
    return { trades, metrics };
  } catch (error) {
    console.error("Error fetching wallet trades:", error);
    throw new Error(`Failed to fetch trades: ${error.message}`);
  }
}

/**
 * Fetches the current SOL price from a public API
 */
export async function fetchSolanaPrice(): Promise<number> {
  try {
    // Check cache first
    if (
      priceCache.SOL && 
      (Date.now() - priceCache.SOL.timestamp < CACHE_DURATION)
    ) {
      return priceCache.SOL.price;
    }
    
    // Fetch from CoinGecko API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    const price = data.solana.usd;
    
    // Update cache
    priceCache.SOL = {
      price,
      timestamp: Date.now()
    };
    
    return price;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    
    // Return a reasonable fallback price if API fails
    return 180.0;
  }
}
