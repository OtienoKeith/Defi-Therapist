import { Button } from "@/components/ui/button";
import { Download, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { TradeAnalysisResult } from "@/lib/openai";
import { jsPDF } from 'jspdf';

interface AnalysisResultsProps {
  analysis: TradeAnalysisResult;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  // Function to download the analysis report as a PDF file
  const handleDownloadReport = (analysisData: TradeAnalysisResult) => {
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      const lineHeight = 8;
      let y = 20;
      
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(171, 159, 242); // Purple color similar to Phantom brand
      doc.text("DeFi Therapist: Trading Psychology Analysis", 20, y);
      y += lineHeight * 2;
      
      // Date
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Analysis date: ${new Date(analysisData.date).toLocaleDateString()}`, 20, y);
      y += lineHeight * 2;
      
      // Summary Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Trade Performance Summary", 20, y);
      y += lineHeight * 1.5;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Trading Volume: ${analysisData.summary.tradingVolume}`, 20, y);
      y += lineHeight;
      doc.text(`Win Rate: ${analysisData.summary.winRate}`, 20, y);
      y += lineHeight;
      doc.text(`Emotional Index: ${analysisData.summary.emotionalIndex}`, 20, y);
      y += lineHeight;
      doc.text(`Win Rate Statistics: ${analysisData.summary.winRateStats}`, 20, y);
      y += lineHeight * 2;
      
      // Patterns Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Trading Patterns Analysis", 20, y);
      y += lineHeight * 1.5;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      
      // Split the patterns summary into lines to avoid overflow
      const patternsSummary = analysisData.patterns.summary;
      const splitSummary = doc.splitTextToSize(patternsSummary, 170);
      doc.text(splitSummary, 20, y);
      y += (splitSummary.length * lineHeight) + lineHeight;
      
      doc.text(`Risk Management Score: ${analysisData.patterns.riskManagement * 10}%`, 20, y);
      y += lineHeight;
      doc.text(`Entry Timing Score: ${analysisData.patterns.entryTiming * 10}%`, 20, y);
      y += lineHeight;
      doc.text(`Exit Discipline Score: ${analysisData.patterns.exitDiscipline * 10}%`, 20, y);
      y += lineHeight * 2;
      
      // Check if we need a new page for strengths
      if (y > 240) {
        doc.addPage();
        y = 20;
      }
      
      // Strengths Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(34, 197, 94); // Green color
      doc.text("Strengths", 20, y);
      y += lineHeight * 1.5;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Loop through strengths
      for (const strength of analysisData.strengths) {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.setFont("helvetica", "bold");
        doc.text(strength.title, 20, y);
        y += lineHeight;
        
        doc.setFont("helvetica", "normal");
        const splitDesc = doc.splitTextToSize(strength.description, 170);
        doc.text(splitDesc, 20, y);
        y += (splitDesc.length * lineHeight) + lineHeight;
      }
      
      // Check if we need a new page for weaknesses
      if (y > 240) {
        doc.addPage();
        y = 20;
      }
      
      // Weaknesses Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(239, 68, 68); // Red color
      doc.text("Areas for Improvement", 20, y);
      y += lineHeight * 1.5;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Loop through weaknesses
      for (const weakness of analysisData.weaknesses) {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.setFont("helvetica", "bold");
        doc.text(weakness.title, 20, y);
        y += lineHeight;
        
        doc.setFont("helvetica", "normal");
        const splitDesc = doc.splitTextToSize(weakness.description, 170);
        doc.text(splitDesc, 20, y);
        y += (splitDesc.length * lineHeight) + lineHeight;
      }
      
      // Check if we need a new page for recommendations
      if (y > 240) {
        doc.addPage();
        y = 20;
      }
      
      // Recommendations Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(59, 130, 246); // Blue color
      doc.text("Recommendations", 20, y);
      y += lineHeight * 1.5;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Loop through recommendations
      for (const recommendation of analysisData.recommendations) {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.setFont("helvetica", "bold");
        doc.text(recommendation.title, 20, y);
        y += lineHeight;
        
        doc.setFont("helvetica", "normal");
        const splitDesc = doc.splitTextToSize(recommendation.description, 170);
        doc.text(splitDesc, 20, y);
        y += (splitDesc.length * lineHeight) + lineHeight;
      }
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("DeFi Therapist - Your Trading Psychology Analysis", 20, 290);
        doc.text(`Page ${i} of ${pageCount}`, 180, 290);
      }
      
      // Save the PDF
      doc.save(`trading-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };
  return (
    <section id="analysisResults" className="mb-12 animate-slide-up">
      <div className="bg-dark-lighter rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-2">Your Trading Psychology Analysis</h2>
          <p className="text-slate-300">Analysis completed on {analysis.date}</p>
        </div>
        
        {/* Trading Summary */}
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-medium text-white mb-4">Trading Summary</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dark-card p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M21 15L15.5657 10.2484C15.2533 9.97399 15.0972 9.83679 14.9192 9.78596C14.7612 9.74113 14.5936 9.7425 14.4363 9.79001C14.2581 9.84345 14.1038 9.98293 13.7954 10.2619L10.2046 13.7381C9.89616 14.0171 9.74194 14.1565 9.56368 14.21C9.40638 14.2575 9.23876 14.2589 9.08078 14.214C8.90283 14.1632 8.74667 14.026 8.43436 13.7516L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h4 className="text-lg font-medium text-white">Trading Volume</h4>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">{analysis.summary.tradingVolume}</p>
              <p className="text-slate-400 text-sm">Past 30 days</p>
            </div>
            <div className="bg-dark-card p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L9 4M15 12V4M21 10V4M3 20L3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h4 className="text-lg font-medium text-white">Win Rate</h4>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">{analysis.summary.winRate}</p>
              <p className="text-slate-400 text-sm">{analysis.summary.winRateStats}</p>
            </div>
            <div className="bg-dark-card p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.34961 7C4.1928 5.49114 5.44922 4.25866 6.96094 3.40738C8.47266 2.55611 10.2083 2.11108 11.9746 2.11108C13.7409 2.11108 15.4766 2.55611 16.9883 3.40738C18.5 4.25866 19.7564 5.49114 20.5996 7M3.3496 17C4.19279 18.5089 5.44921 19.7413 6.96093 20.5926C8.47265 21.4439 10.2083 21.8889 11.9746 21.8889C13.7409 21.8889 15.4765 21.4439 16.9882 20.5926C18.5 19.7413 19.7563 18.5089 20.5996 17M10.9995 12H11.9995H12.9995M5.99951 12H6.99951H7.99951M15.9995 12H16.9995H17.9995" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h4 className="text-lg font-medium text-white">Emotional Index</h4>
              </div>
              <p className="text-2xl font-semibold text-warning mb-1">{analysis.summary.emotionalIndex}</p>
              <p className="text-slate-400 text-sm">Some emotion-driven trades</p>
            </div>
          </div>
        </div>
        
        {/* Psychological Analysis */}
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-medium text-white mb-4">Psychological Analysis</h3>
          <div className="space-y-6">
            <div className="bg-dark-card p-5 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-3">Trading Patterns</h4>
              <p className="text-slate-300 mb-4">{analysis.patterns.summary}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Risk Management</span>
                    <span className="text-sm text-error">Needs Improvement</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div 
                      className="bg-error h-2 rounded-full" 
                      style={{ width: `${analysis.patterns.riskManagement}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Entry Timing</span>
                    <span className="text-sm text-success">Strong</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full" 
                      style={{ width: `${analysis.patterns.entryTiming}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Exit Discipline</span>
                    <span className="text-sm text-warning">Average</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full" 
                      style={{ width: `${analysis.patterns.exitDiscipline}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-card p-5 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-3">Strengths</h4>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-success h-5 w-5 mt-1" />
                      <div>
                        <h5 className="font-medium text-white">{strength.title}</h5>
                        <p className="text-slate-300 text-sm">{strength.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-dark-card p-5 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-3">Areas for Improvement</h4>
                <ul className="space-y-3">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="text-error h-5 w-5 mt-1" />
                      <div>
                        <h5 className="font-medium text-white">{weakness.title}</h5>
                        <p className="text-slate-300 text-sm">{weakness.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="p-6">
          <h3 className="text-xl font-medium text-white mb-4">Actionable Recommendations</h3>
          <div className="bg-dark-card p-5 rounded-lg">
            <div className="space-y-4">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded-full text-primary">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white">{recommendation.title}</h5>
                    <p className="text-slate-300">{recommendation.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h5 className="font-medium text-white mb-2">Next Steps</h5>
              <p className="text-slate-300 mb-4">
                Implement these recommendations and return in 30 days for a follow-up analysis to measure your progress.
              </p>
              {/* PDF download button removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
