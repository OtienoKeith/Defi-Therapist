import type { VercelRequest, VercelResponse } from '@vercel/node';

// Copy the trade data generation logic from server/lib/trades.ts
interface Trade {
  pair: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
  timestamp: string;
  profitLoss?: number;
}

interface TradeMetrics {
  totalTrades: number;
  mostActivePair: string;
  profitLoss: number;
}

function generateSimulatedTrades(walletAddress: string): {
  trades: Trade[];
  metrics: TradeMetrics;
} {
  // Generate trades based on wallet address hash for consistency
  const seed = walletAddress.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (min: number, max: number) => min + ((seed * 9301 + 49297) % 233280) / 233280 * (max - min);
  
  const pairs = ['SOL/USDC', 'RAY/SOL', 'BONK/SOL', 'JUP/SOL', 'WIF/SOL'];
  const trades: Trade[] = [];
  
  // Generate 10-50 trades
  const tradeCount = Math.floor(random(10, 50));
  let totalVolume = 0;
  let winningTrades = 0;
  
  for (let i = 0; i < tradeCount; i++) {
    const pair = pairs[Math.floor(random(0, pairs.length))];
    const type = random(0, 1) > 0.5 ? 'buy' : 'sell';
    const amount = random(0.1, 10);
    const price = random(0.01, 200);
    const profitLoss = random(-50, 100);
    
    if (profitLoss > 0) winningTrades++;
    totalVolume += amount * price;
    
    trades.push({
      pair,
      type,
      price,
      amount,
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      profitLoss
    });
  }
  
  // Calculate metrics
  const pairCounts = trades.reduce((acc, trade) => {
    acc[trade.pair] = (acc[trade.pair] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostActivePair = Object.entries(pairCounts)
    .sort(([,a], [,b]) => b - a)[0][0];
  
  const totalProfitLoss = trades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
  
  const metrics: TradeMetrics = {
    totalTrades: trades.length,
    mostActivePair,
    profitLoss: totalProfitLoss
  };
  
  return { trades, metrics };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress } = req.query;

  if (!walletAddress || typeof walletAddress !== 'string') {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    // For now, using simulated data - in production you would fetch from OKX DEX API
    const { trades, metrics } = generateSimulatedTrades(walletAddress);
    
    res.status(200).json({
      trades,
      metrics
    });
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Failed to fetch trading data' });
  }
}