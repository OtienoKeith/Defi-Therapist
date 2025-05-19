import { useState } from "react";
import { Wallet, Brain, Copy, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhantomWallet } from "@/lib/wallet";
import { TradeMetrics } from "@/lib/tradeData";

interface WalletConnectionProps {
  wallet: PhantomWallet | null;
  isConnecting: boolean;
  isLoadingTrades: boolean;
  tradeMetrics: TradeMetrics | null;
  onConnectWallet: () => Promise<void>;
  onDisconnectWallet: () => Promise<void>;
  onAnalyzeTrading: () => Promise<void>;
}

export default function WalletConnection({
  wallet,
  isConnecting,
  isLoadingTrades,
  tradeMetrics,
  onConnectWallet,
  onDisconnectWallet,
  onAnalyzeTrading,
}: WalletConnectionProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.publicKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return "";
    return address.length > 12
      ? `${address.slice(0, 6)}...${address.slice(-6)}`
      : address;
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  // Format SOL balance
  const formatSol = (value: number) => {
    return `${value.toFixed(2)} SOL`;
  };

  return (
    <section id="walletConnection" className="mb-12 bg-dark-lighter rounded-xl p-6 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-semibold text-white mb-4">Connect & Analyze</h2>

      {/* Not Connected State */}
      {!wallet && (
        <div id="walletNotConnected">
          <p className="text-slate-300 mb-6">
            Connect your Phantom wallet to begin the analysis process. Your wallet data is analyzed
            securely using advanced AI algorithms.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Button
              className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2 w-full md:w-auto"
              onClick={onConnectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  Connect Phantom Wallet
                </>
              )}
            </Button>
            <p className="text-slate-400 text-sm">We only access public wallet data with your permission</p>
          </div>
        </div>
      )}

      {/* Connected State */}
      {wallet && (
        <div id="walletConnected">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-card p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Wallet Information</h3>
              <div className="mb-3">
                <label className="text-slate-400 text-sm">Connected Address</label>
                <div className="font-mono text-sm bg-dark-lighter p-2 rounded flex items-center justify-between overflow-hidden">
                  <span id="walletAddress" className="truncate">
                    {wallet.publicKey}
                  </span>
                  <button
                    className="text-slate-400 hover:text-white"
                    onClick={copyAddress}
                    title="Copy address"
                  >
                    {isCopied ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-sm">SOL Balance</label>
                  <p className="text-white font-semibold" id="solBalance">
                    {formatSol(wallet.balance)}
                  </p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">USD Value</label>
                  <p className="text-white font-semibold" id="usdBalance">
                    {formatCurrency(wallet.balanceUsd)}
                  </p>
                </div>
              </div>
              <button
                id="disconnectWalletBtn"
                className="mt-4 text-slate-400 hover:text-white text-sm flex items-center gap-1"
                onClick={onDisconnectWallet}
              >
                <LogOut className="h-4 w-4" /> Disconnect Wallet
              </button>
            </div>

            <div className="bg-dark-card p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Trading Activity</h3>
              {isLoadingTrades && (
                <div id="tradesLoading">
                  <div className="flex items-center justify-center space-x-2 py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary"></div>
                    <span className="text-slate-300">Loading trades...</span>
                  </div>
                </div>
              )}
              
              {!isLoadingTrades && tradeMetrics && (
                <div id="tradesLoaded">
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">Trades Retrieved</span>
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                        {tradeMetrics.totalTrades} trades
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 text-sm">Most Active Pair</label>
                        <p className="text-white font-semibold">
                          {tradeMetrics.mostActivePair}
                        </p>
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm">30-Day P&L</label>
                        <p className={`font-semibold ${tradeMetrics.profitLoss >= 0 ? 'text-success' : 'text-error'}`}>
                          {tradeMetrics.profitLoss >= 0 ? '+' : ''}
                          {formatCurrency(tradeMetrics.profitLoss)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-secondary hover:bg-secondary-dark text-white font-medium px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    onClick={onAnalyzeTrading}
                  >
                    <Brain className="h-5 w-5" />
                    Get Trade Therapy Analysis
                  </Button>
                </div>
              )}

              {!isLoadingTrades && !tradeMetrics && (
                <div id="noTradesFound">
                  <div className="text-center py-6">
                    <svg className="mx-auto h-12 w-12 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <p className="text-slate-300 mt-3">No trading history found for this wallet.</p>
                    <p className="text-slate-400 text-sm mt-2">
                      Make some trades on OKX DEX and return for analysis.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
