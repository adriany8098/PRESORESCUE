import React from 'react';
import { Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 h-16 flex justify-between items-center border border-white/10 shadow-2xl">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.6)] group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">
            Preso<span className="text-indigo-400">Rescue</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('how')} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">The Method</button>
          <button onClick={() => scrollTo('pricing')} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Pricing</button>
          <button 
            onClick={() => scrollTo('upload')}
            className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-400 hover:text-white transition-all shadow-lg active:scale-95"
          >
            Rescue My Deck
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;