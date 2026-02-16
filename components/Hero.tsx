
import React from 'react';
import { Clock, Zap, Star, MousePointer2 } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-40 pb-32 overflow-hidden border-b border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <Star className="w-3 h-3 fill-indigo-400 text-indigo-400" />
          High School's Best Kept Secret
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          SLIDES THAT <span className="text-indigo-500">DON'T SUCK.</span><br />
          GRADES THAT <span className="text-white italic">DO.</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
          Just dump your messy notes, half-baked slides, or rough topics. We transform them into professional, high-impact decks while you sleep.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollTo('upload')}
            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Zap className="w-5 h-5 fill-white" />
            FIX MY MESSY SLIDES
          </button>
          <button 
            onClick={() => scrollTo('ai-preview')}
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            Try AI Preview
          </button>
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-50 transition-all cursor-default">
          <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:text-indigo-400 transition-colors">
            <Clock className="w-4 h-4 text-indigo-500" /> 6H Express Delivery
          </div>
          <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:text-indigo-400 transition-colors">
            <Star className="w-4 h-4 fill-indigo-500 text-indigo-500" /> 100% Academic Win
          </div>
          <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:text-indigo-400 transition-colors">
            <MousePointer2 className="w-4 h-4 text-indigo-500" /> Zero Effort Required
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
