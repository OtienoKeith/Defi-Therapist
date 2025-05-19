import { Brain } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 border-b border-slate-700 bg-dark-lighter">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="text-secondary text-2xl" />
          <h1 className="text-xl font-bold text-white">DeFi Therapist</h1>
        </div>
      </div>
    </header>
  );
}
