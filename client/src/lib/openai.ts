// The client-side API for interacting with the OpenAI service via our backend
// The actual OpenAI client implementation is on the server

/**
 * Analyzes trading data to produce psychological insights
 */
export interface AnalysisRequest {
  walletAddress: string;
  trades: Array<any>;
}

export interface TradeAnalysisResult {
  summary: {
    tradingVolume: string;
    winRate: string;
    emotionalIndex: string;
    winRateStats: string;
  };
  patterns: {
    summary: string;
    riskManagement: number;
    entryTiming: number;
    exitDiscipline: number;
  };
  strengths: Array<{
    title: string;
    description: string;
  }>;
  weaknesses: Array<{
    title: string;
    description: string;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
  }>;
  date: string;
}

export async function analyzeTradingPsychology(
  request: AnalysisRequest
): Promise<TradeAnalysisResult> {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(
        `Analysis request failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing trading psychology:", error);
    throw error;
  }
}
