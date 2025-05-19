interface AnalysisLoadingProps {
  progress: number;
}

export default function AnalysisLoading({ progress }: AnalysisLoadingProps) {
  return (
    <section id="analysisLoading" className="mb-12 bg-dark-lighter rounded-xl p-8 shadow-lg text-center animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary mx-auto"></div>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-3">Analyzing Your Trading Psychology</h2>
        <p className="text-slate-300 mb-8">
          Our AI is processing your trading history to provide personalized insights and recommendations...
        </p>
        <div className="w-full bg-dark rounded-full h-2 mb-4">
          <div
            id="analysisProgressBar"
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-slate-400 text-sm">This usually takes less than a minute</div>
      </div>
    </section>
  );
}
