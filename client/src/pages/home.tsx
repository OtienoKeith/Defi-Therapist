import { useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import WalletConnection from "@/components/wallet-connection";
import AnalysisLoading from "@/components/analysis-loading";
import AnalysisResults from "@/components/analysis-results";
import HowItWorks from "@/components/how-it-works";
import { Notification, useNotification } from "@/components/notification";
import { analyzeTradingPsychology, TradeAnalysisResult } from "@/lib/openai";
import { PhantomWallet, connectPhantomWallet, disconnectPhantomWallet } from "@/lib/wallet";
import { fetchTradingData, Trade, TradeMetrics } from "@/lib/tradeData";

export default function Home() {
  const [wallet, setWallet] = useState<PhantomWallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingTrades, setIsLoadingTrades] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tradeMetrics, setTradeMetrics] = useState<TradeMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<TradeAnalysisResult | null>(null);
  const { notifications, addNotification, removeNotification } = useNotification();

  // Function to handle wallet connection
  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      const connectedWallet = await connectPhantomWallet();
      setWallet(connectedWallet);
      addNotification("Wallet connected successfully!", "success");
      
      // Start loading trades after wallet connects
      await handleLoadTrades(connectedWallet.publicKey);
      
      setIsConnecting(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      addNotification("Failed to connect wallet. Please try again.", "error");
      setIsConnecting(false);
    }
  };

  // Function to handle wallet disconnection
  const handleDisconnectWallet = async () => {
    try {
      await disconnectPhantomWallet();
      setWallet(null);
      setTrades([]);
      setTradeMetrics(null);
      setAnalysisResult(null);
      addNotification("Wallet disconnected", "warning");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      addNotification("Failed to disconnect wallet", "error");
    }
  };

  // Function to load trading data
  const handleLoadTrades = async (walletAddress: string) => {
    try {
      setIsLoadingTrades(true);
      const { trades, metrics } = await fetchTradingData(walletAddress);
      setTrades(trades);
      setTradeMetrics(metrics);
      addNotification(`${metrics.totalTrades} trades loaded from OKX DEX`, "success");
      setIsLoadingTrades(false);
    } catch (error) {
      console.error("Failed to load trades:", error);
      addNotification("Failed to load trading data", "error");
      setIsLoadingTrades(false);
    }
  };

  // Function to handle analysis request
  const handleAnalyzeTrading = async () => {
    if (!wallet || trades.length === 0) {
      addNotification("No wallet or trading data available", "error");
      return;
    }

    try {
      setIsAnalyzing(true);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          const newProgress = prev + 15;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 800);

      // Perform the actual analysis
      const result = await analyzeTradingPsychology({
        walletAddress: wallet.publicKey,
        trades: trades,
      });

      // Clear interval and set final progress
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Short delay to show 100% before displaying results
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
        setAnalysisProgress(0);
        
        // Scroll to the results section
        const resultsSection = document.getElementById("analysisResults");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    } catch (error) {
      console.error("Analysis failed:", error);
      addNotification("Analysis failed. Please try again.", "error");
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-slate-200 font-sans flex flex-col">
      <Notification
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 flex-grow">
        <HeroSection onConnectWallet={handleConnectWallet} isConnecting={isConnecting} />
        <WalletConnection
          wallet={wallet}
          isConnecting={isConnecting}
          isLoadingTrades={isLoadingTrades}
          tradeMetrics={tradeMetrics}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
          onAnalyzeTrading={handleAnalyzeTrading}
        />
        {isAnalyzing && (
          <AnalysisLoading progress={analysisProgress} />
        )}
        {analysisResult && (
          <AnalysisResults analysis={analysisResult} />
        )}
        <HowItWorks />
      </main>
    </div>
  );
}
