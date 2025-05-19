import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onConnectWallet: () => Promise<void>;
  isConnecting: boolean;
}

export default function HeroSection({ onConnectWallet, isConnecting }: HeroSectionProps) {
  return (
    <section className="mb-12 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trading Psychology Therapy for DeFi Traders
          </h1>
          <p className="text-lg text-slate-300 mb-6">
            Get AI-powered insights into your trading behavior and psychology. Connect your
            Solana wallet to reveal your trading patterns and receive personalized recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
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
            <a
              href="#how-it-works"
              className="border border-slate-600 hover:border-slate-400 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800"
            alt="Cryptocurrency trading dashboard"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
