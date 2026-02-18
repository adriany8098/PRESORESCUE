
import React, { useState, useEffect, useRef } from 'react';
import { MissionBriefing } from '../services/gemini';
import { Shield, Target, FileText, Zap, ChevronRight, Hash, Lock, Download } from 'lucide-react';
import Pricing from './Pricing';

const TypewriterText = ({ text, delay = 15, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

interface MissionCanvasProps {
  briefing: MissionBriefing;
  onReset: () => void;
  isPaid: boolean;
  onDownload?: () => void;
  onPaymentSuccess?: (email: string, planType: 'chill' | 'emergency') => void;
}

const MissionCanvas: React.FC<MissionCanvasProps> = ({ briefing, onReset, isPaid, onDownload, onPaymentSuccess }) => {
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!pricingRef.current) {
      const pricingEl = document.getElementById('pricing');
      pricingEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-6 md:p-12 animate-in fade-in duration-700 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              {isPaid ? `Mission Ready (${briefing.planType === 'emergency' ? 'PRO' : 'CHILL'})` : "Tactical Preview Active"}
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              <TypewriterText text={briefing.operationName} delay={30} />
            </h2>
            <div className="flex items-center gap-6">
              <p className="text-slate-400 font-bold flex items-center gap-2">
                <Hash className="w-4 h-4 text-indigo-500" />
                MISSION ID: {briefing.missionId}
              </p>
              <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-500">
                Theme: {briefing.theme}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {isPaid ? (
              <button 
                onClick={onDownload}
                className="px-8 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(99,102,241,0.4)]"
              >
                <Download className="w-5 h-5" />
                Download .PPTX
              </button>
            ) : (
              <button 
                onClick={scrollToPricing}
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all active:scale-95 flex items-center gap-3"
              >
                <Lock className="w-5 h-5" />
                Unlock Full Presentation
              </button>
            )}
            <button 
              onClick={onReset}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Objective & Tactical Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass p-10 rounded-[40px] border-white/5 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3">
              <Target className="w-4 h-4" />
              Primary Objective
            </h3>
            <p className="text-2xl md:text-3xl font-black leading-tight tracking-tight italic">
              "<TypewriterText text={briefing.objective} delay={10} />"
            </p>
          </div>
          <div className="glass p-10 rounded-[40px] border-white/5 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-purple-400 flex items-center gap-3">
              <Shield className="w-4 h-4" />
              Tactical Intel
            </h3>
            <ul className="space-y-4">
              {briefing.tacticalNotes.map((note, idx) => (
                <li key={idx} className="flex gap-3 text-sm font-bold text-slate-300">
                  <span className="text-indigo-500">•</span>
                  <TypewriterText text={note} delay={15} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Slide Deck Canvas */}
        <div className="space-y-8">
          <div className="flex justify-between items-center px-4">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
               Deployment Schedule / Strategic Slides
             </h3>
             {!isPaid && (
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 animate-pulse bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                 Preview Mode: 2 Slides Unlocked
               </span>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {briefing.slides.map((slide, idx) => {
              const isLocked = !isPaid && idx > 1;
              
              return (
                <div 
                  key={idx} 
                  className={`group relative glass p-8 rounded-[40px] border-white/5 transition-all duration-500 flex flex-col justify-between min-h-[420px] ${
                    isLocked ? 'overflow-hidden' : 'hover:border-indigo-500/30'
                  }`}
                >
                  <div className={isLocked ? 'blur-[8px] pointer-events-none select-none opacity-40' : ''}>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-4xl font-black text-white/10 group-hover:text-indigo-500/20 transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                      <FileText className="w-5 h-5 text-slate-600 group-hover:text-indigo-400" />
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-6 leading-none">
                      {isLocked ? slide.title : <TypewriterText text={slide.title} delay={20} />}
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {slide.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex gap-3 text-xs font-bold text-slate-400 leading-relaxed">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed">
                        Visual Directive: {slide.visualDirective}
                      </p>
                      {isPaid && slide.speakerScript && (
                        <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                          <p className="text-[10px] font-black uppercase text-indigo-400 mb-2">Speaker Script</p>
                          <p className="text-[11px] font-medium text-slate-300 leading-relaxed italic line-clamp-3">
                            {slide.speakerScript}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isLocked && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-[2px]">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-lg font-black uppercase tracking-tighter text-white mb-2">Data Encrypted</h5>
                      <p className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">Pay to unlock instant AI generation.</p>
                      <button 
                        onClick={scrollToPricing}
                        className="px-6 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-lg"
                      >
                        Unlock Now
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {!isPaid && (
          <div 
            ref={pricingRef}
            id="pricing"
            className="pt-24 border-t border-white/5 animate-in slide-in-from-bottom-20 duration-1000"
          >
            <Pricing onPaymentSuccess={onPaymentSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionCanvas;
