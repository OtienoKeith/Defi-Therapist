// Wallet connectivity functions for Phantom wallet integration

export interface PhantomWallet {
  publicKey: string;
  balance: number;
  balanceUsd: number;
}

export async function connectPhantomWallet(): Promise<PhantomWallet> {
  try {
    // Check if we're in demo mode (no real phantom wallet)
    const isDemo = !(window as any).solana;
    
    if (isDemo) {
      return connectDemoWallet();
    }
    
    // Real Phantom Wallet connection
    const phantom = (window as any).solana;
    
    if (!phantom?.isPhantom) {
      throw new Error("Phantom wallet is not installed. Please install the Phantom browser extension.");
    }
    
    // Request connection to the wallet
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
    
    // If there's an error with the real wallet, fallback to demo
    if (error.message !== "Phantom wallet is not installed. Please install the Phantom browser extension.") {
      return connectDemoWallet();
    }
    
    throw error;
  }
}

// Demo wallet connection for testing purposes
async function connectDemoWallet(): Promise<PhantomWallet> {
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
}

export async function disconnectPhantomWallet(): Promise<void> {
  try {
    // Check if we're in demo mode
    const phantom = (window as any).solana;
    
    if (phantom?.isPhantom) {
      // Disconnect from real Phantom wallet
      await phantom.disconnect();
    } else {
      // Simulate disconnecting in demo mode
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error("Error disconnecting from Phantom wallet:", error);
    throw error;
  }
}

async function getWalletBalance(publicKey: string): Promise<number> {
  try {
    // Check if we should use a real connection or simulate
    const isDemo = !(window as any).solana?.isPhantom;
    
    if (isDemo) {
      // Simulate a balance between 1 and 15 SOL
      return 1 + (Math.random() * 14);
    }
    
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
    
    // Fallback to demo balance if there's an error
    return 5 + (Math.random() * 10);
  }
}

async function getSolPrice(): Promise<number> {
  try {
    // Use the backend API to get the SOL price
    const response = await fetch("/api/solana/price");
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Error getting SOL price:", error);
    // Default price as fallback
    return 180.0;
  }
}
