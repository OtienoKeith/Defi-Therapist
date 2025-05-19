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
              className="bg-[#AB9FF2] hover:bg-[#9D8DE8] text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
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
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 50 50" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path d="M25 5C14 5 5 14 5 25C5 36 14 45 25 45C36 45 45 36 45 25C45 14 36 5 25 5ZM20 20C21.1 20 22 20.9 22 22C22 23.1 21.1 24 20 24C18.9 24 18 23.1 18 22C18 20.9 18.9 20 20 20ZM30 20C31.1 20 32 20.9 32 22C32 23.1 31.1 24 30 24C28.9 24 28 23.1 28 22C28 20.9 28.9 20 30 20Z" fill="white"/>
                  </svg>
                  Connect Phantom Wallet
                </>
              )}
            </Button>
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
