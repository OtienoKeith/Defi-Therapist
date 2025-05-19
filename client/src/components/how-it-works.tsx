import { Wallet, BarChart, Brain } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-dark-lighter p-6 rounded-xl">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Wallet className="text-primary text-xl" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">1. Connect Your Wallet</h3>
          <p className="text-slate-300">
            Securely connect your Phantom wallet. We only access public transaction data with your permission.
          </p>
        </div>
        
        <div className="bg-dark-lighter p-6 rounded-xl">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
            <BarChart className="text-secondary text-xl" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">2. Analyze Trading Data</h3>
          <p className="text-slate-300">
            Our AI examines your trading history from OKX DEX, looking for patterns in your trading behavior.
          </p>
        </div>
        
        <div className="bg-dark-lighter p-6 rounded-xl">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Brain className="text-primary text-xl" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">3. Get Personalized Insights</h3>
          <p className="text-slate-300">
            Receive a detailed analysis of your trading psychology with actionable recommendations to improve.
          </p>
        </div>
      </div>
    </section>
  );
}
