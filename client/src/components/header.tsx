import { useState } from "react";
import { Brain } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 border-b border-slate-700 bg-dark-lighter">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="text-secondary text-2xl" />
          <h1 className="text-xl font-bold text-white">DeFi Therapist</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">
            FAQ
          </a>
        </div>
        <button 
          className="p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-slate-300"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden pt-2 pb-4 px-6 border-b border-slate-700">
          <div className="flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
