import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-6">What Traders Are Saying</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-dark-lighter p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="text-warning mr-1 flex">
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
            </div>
            <span className="text-white ml-2">5.0</span>
          </div>
          <p className="text-slate-300 mb-4">
            "The analysis perfectly identified my tendency to FOMO into trades. Implementing the
            recommendations has already improved my win rate."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h4 className="text-white font-medium">Alex K.</h4>
              <p className="text-slate-400 text-sm">SOL Trader, 2 years</p>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-lighter p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="text-warning mr-1 flex">
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4 text-opacity-50" />
            </div>
            <span className="text-white ml-2">4.5</span>
          </div>
          <p className="text-slate-300 mb-4">
            "I was skeptical at first, but the psychological insights were spot on. The position
            sizing recommendation helped me manage risk better."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <h4 className="text-white font-medium">Maya T.</h4>
              <p className="text-slate-400 text-sm">Crypto Day Trader</p>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-lighter p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="text-warning mr-1 flex">
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
              <Star className="fill-current h-4 w-4" />
            </div>
            <span className="text-white ml-2">5.0</span>
          </div>
          <p className="text-slate-300 mb-4">
            "The cooling-off period recommendation was a game-changer for me. I no longer make
            impulsive trades after losses and my portfolio is growing steadily."
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">
              J
            </div>
            <div>
              <h4 className="text-white font-medium">Jamal W.</h4>
              <p className="text-slate-400 text-sm">DeFi Enthusiast</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
