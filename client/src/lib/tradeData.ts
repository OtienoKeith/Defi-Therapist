// Client functions for fetching trading data from OKX DEX

export interface Trade {
  pair: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
  timestamp: string;
  profitLoss?: number;
}

export interface TradeMetrics {
  totalTrades: number;
  mostActivePair: string;
  profitLoss: number;
}

export async function fetchTradingData(walletAddress: string): Promise<{
  trades: Trade[];
  metrics: TradeMetrics;
}> {
  try {
    const response = await fetch(`/api/trades/${walletAddress}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trading data: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching trading data:", error);
    throw error;
  }
}
