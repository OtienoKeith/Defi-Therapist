// Wallet connectivity functions for Phantom wallet integration

export interface PhantomWallet {
  publicKey: string;
  balance: number;
  balanceUsd: number;
}

export async function connectPhantomWallet(): Promise<PhantomWallet> {
  try {
    // Check if Phantom is installed
    const phantom = (window as any).solana;
    
    if (!phantom) {
      throw new Error("Phantom wallet is not installed");
    }
    
    // Connect to the wallet
    const response = await phantom.connect();
    const publicKey = response.publicKey.toString();
    
    // Get the wallet balance
    const balance = await getWalletBalance(publicKey);
    
    // Get the SOL price
    const solPrice = await getSolPrice();
    
    // Calculate the balance in USD
    const balanceUsd = balance * solPrice;
    
    return {
      publicKey,
      balance,
      balanceUsd
    };
  } catch (error) {
    console.error("Error connecting to Phantom wallet:", error);
    throw error;
  }
}

export async function disconnectPhantomWallet(): Promise<void> {
  try {
    const phantom = (window as any).solana;
    
    if (!phantom) {
      throw new Error("Phantom wallet is not installed");
    }
    
    await phantom.disconnect();
  } catch (error) {
    console.error("Error disconnecting from Phantom wallet:", error);
    throw error;
  }
}

async function getWalletBalance(publicKey: string): Promise<number> {
  try {
    // Solana RPC endpoint
    const rpcUrl = "https://api.mainnet-beta.solana.com";
    
    // Request the balance
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [publicKey],
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(`RPC error: ${data.error.message}`);
    }
    
    // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
    return data.result.value / 1000000000;
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    throw error;
  }
}

async function getSolPrice(): Promise<number> {
  try {
    // Use a public API to get the SOL price in USD
    const response = await fetch("/api/solana/price");
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Error getting SOL price:", error);
    // Default price as fallback
    return 180.0;
  }
}
