import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-" });

/**
 * Analyzes trading behavior and psychology based on trade history
 */
export async function analyzeTradingPsychology(trades: any[]): Promise<any> {
  try {
    // Prepare the trades data for analysis
    const formattedTrades = trades.map(trade => ({
      pair: trade.pair,
      type: trade.type,
      price: trade.price,
      amount: trade.amount,
      timestamp: trade.timestamp,
      profitLoss: trade.profitLoss
    }));

    // Calculate basic statistics to provide context
    const totalTrades = formattedTrades.length;
    const profitableTrades = formattedTrades.filter(t => (t.profitLoss || 0) > 0).length;
    const winRate = (profitableTrades / totalTrades * 100).toFixed(1);
    
    // Prepare the prompt for the AI
    const prompt = `
    As a specialized AI trading therapist, analyze this Solana trader's behavior and psychology based on their trade history.
    
    Here are the trader's recent trades:
    ${JSON.stringify(formattedTrades, null, 2)}
    
    Please provide a comprehensive trading psychology analysis in JSON format with:
    
    1. Summary of overall trading activity including trading volume, win rate (${winRate}%), and emotional index
    2. Detailed trading pattern analysis with ratings for risk management, entry timing, and exit discipline
    3. Psychological strengths (at least 3)
    4. Areas for improvement (at least 3)
    5. Actionable recommendations (at least 4)
    
    Format your response as valid JSON with the following structure:
    {
      "summary": {
        "tradingVolume": "$X,XXX",
        "winRate": "XX%",
        "emotionalIndex": "Low|Moderate|High",
        "winRateStats": "X of X trades profitable"
      },
      "patterns": {
        "summary": "detailed psychological analysis",
        "riskManagement": XX (1-100 score),
        "entryTiming": XX (1-100 score),
        "exitDiscipline": XX (1-100 score)
      },
      "strengths": [
        { "title": "strength title", "description": "detailed explanation" },
        ...
      ],
      "weaknesses": [
        { "title": "weakness title", "description": "detailed explanation" },
        ...
      ],
      "recommendations": [
        { "title": "recommendation title", "description": "detailed explanation" },
        ...
      ],
      "date": "current date string"
    }
    `;

    // Query the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert trading psychologist specializing in cryptocurrency traders. You analyze trading patterns to identify psychological strengths, weaknesses, and provide actionable insights." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    const analysisResult = JSON.parse(content);
    
    // Add the current date if it's missing
    if (!analysisResult.date) {
      analysisResult.date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    return analysisResult;
  } catch (error) {
    console.error("Error analyzing trading psychology:", error);
    throw new Error(`Failed to analyze trading psychology: ${error.message}`);
  }
}
