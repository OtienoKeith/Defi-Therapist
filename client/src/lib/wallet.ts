// Wallet connectivity functions for Phantom wallet integration

export interface PhantomWallet {
  publicKey: string;
  balance: number;
  balanceUsd: number;
}

// Since we can't connect to a real wallet in this environment,
// we'll simulate the connection with demo data
export async function connectPhantomWallet(): Promise<PhantomWallet> {
  try {
    // Demo wallet data (simulated)
    // Generate a random-looking Solana address
    const generateRandomAddress = () => {
      const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < 44; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the SOL price
    const solPrice = await getSolPrice();
    
    // Create a simulated wallet with random data
    const balance = 3.5 + (Math.random() * 10);
    const balanceUsd = balance * solPrice;
    
    return {
      publicKey: generateRandomAddress(),
      balance,
      balanceUsd
    };
  } catch (error) {
    console.error("Error connecting to Phantom wallet:", error);
    throw error;
  }
}

export async function disconnectPhantomWallet(): Promise<void> {
  // Simulate disconnecting
  await new Promise(resolve => setTimeout(resolve, 500));
  return;
}

async function getWalletBalance(publicKey: string): Promise<number> {
  // This function is now only used internally, but we'll keep it
  // for future real implementation
  try {
    // Simulate a balance between 1 and 15 SOL
    return 1 + (Math.random() * 14);
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
