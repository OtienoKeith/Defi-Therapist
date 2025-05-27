import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch Solana price from CoinGecko API
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('Failed to fetch SOL price');
    }

    const price = data.solana?.usd || 0;
    res.status(200).json({ price });
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    res.status(500).json({ error: 'Failed to fetch SOL price' });
  }
}