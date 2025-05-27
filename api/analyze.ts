import type { VercelRequest, VercelResponse } from '@vercel/node';

// OpenAI integration for trading psychology analysis
async function analyzeTradingPsychology(trades: any[]): Promise<any> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  // Prepare trading data for analysis
  const tradingSummary = {
    totalTrades: trades.length,
    winningTrades: trades.filter(t => (t.profitLoss || 0) > 0).length,
    losingTrades: trades.filter(t => (t.profitLoss || 0) < 0).length,
    totalVolume: trades.reduce((sum, t) => sum + (t.amount * t.price), 0),
    totalProfitLoss: trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0),
    mostTradedPairs: [...new Set(trades.map(t => t.pair))].slice(0, 3),
    recentTrades: trades.slice(0, 10)
  };

  const prompt = `As a trading psychology expert, analyze this DeFi trader's behavior and provide insights:

Trading Summary:
- Total Trades: ${tradingSummary.totalTrades}
- Winning Trades: ${tradingSummary.winningTrades}
- Losing Trades: ${tradingSummary.losingTrades}
- Win Rate: ${((tradingSummary.winningTrades / tradingSummary.totalTrades) * 100).toFixed(1)}%
- Total Volume: $${tradingSummary.totalVolume.toLocaleString()}
- Total P&L: $${tradingSummary.totalProfitLoss.toFixed(2)}
- Most Traded Pairs: ${tradingSummary.mostTradedPairs.join(', ')}

Recent Trading Activity:
${tradingSummary.recentTrades.map(t => 
  `${t.type.toUpperCase()} ${t.amount} ${t.pair} at $${t.price} (P&L: $${(t.profitLoss || 0).toFixed(2)})`
).join('\n')}

Please provide a comprehensive trading psychology analysis in JSON format with:
{
  "summary": {
    "tradingVolume": "formatted volume string",
    "winRate": "percentage with %",
    "emotionalIndex": "rating/description",
    "winRateStats": "detailed win rate description"
  },
  "patterns": {
    "summary": "overall trading pattern analysis",
    "riskManagement": number (1-10 scale),
    "entryTiming": number (1-10 scale),
    "exitDiscipline": number (1-10 scale)
  },
  "strengths": [
    {"title": "strength name", "description": "detailed explanation"}
  ],
  "weaknesses": [
    {"title": "weakness name", "description": "detailed explanation"}
  ],
  "recommendations": [
    {"title": "recommendation name", "description": "actionable advice"}
  ]
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are a professional trading psychology analyst. Provide detailed, actionable insights in the exact JSON format requested."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    
    // Add current date to analysis
    analysis.date = new Date().toISOString();
    
    return analysis;
  } catch (error: any) {
    console.error('OpenAI analysis error:', error);
    throw new Error(`Failed to analyze trading psychology: ${error.message}`);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress, trades } = req.body;

    if (!walletAddress || !trades || !Array.isArray(trades)) {
      return res.status(400).json({ 
        error: 'Wallet address and trades array are required' 
      });
    }

    if (trades.length === 0) {
      return res.status(400).json({ 
        error: 'No trades found for analysis' 
      });
    }

    // Perform AI analysis
    const analysis = await analyzeTradingPsychology(trades);
    
    res.status(200).json(analysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze trading data' 
    });
  }
}