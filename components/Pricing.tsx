
import React from 'react';
import { Check, Zap, Rocket, Flame } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black tracking-tight mb-4 uppercase">Student-Friendly Damage</h2>
          <p className="text-slate-500 text-lg">Cheaper than a lunch delivery, better for your GPA.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Standard */}
          <div className="glass rounded-[40px] p-10 hover:border-indigo-500/30 transition-all flex flex-col group">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Chill Saver</h3>
                <p className="text-slate-500 text-sm font-medium">Standard 24h delivery</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-indigo-500/10 transition-colors">
                <Rocket className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
              </div>
            </div>
            <div className="mb-10">
              <span className="text-6xl font-black text-white tracking-tighter">$9.99</span>
              <span className="text-slate-500 font-bold ml-2">fixed</span>
            </div>
            <ul className="space-y-5 mb-10 flex-grow">
              {['24-hour turnaround', 'Professional formatting', 'AI content polishing', 'Up to 12 slides', 'Presentation notes included'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                  <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-white hover:text-black transition-all text-sm tracking-widest uppercase">
              Rescue Me
            </button>
          </div>

          {/* Express */}
          <div className="bg-indigo-600 rounded-[40px] p-10 transform md:scale-105 shadow-[0_20px_60px_rgba(79,70,229,0.3)] flex flex-col relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Emergency Exit</h3>
                <p className="text-indigo-200 text-sm font-medium">Ultra-fast 6h delivery</p>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mb-10 relative z-10">
              <span className="text-6xl font-black text-white tracking-tighter">$29.99</span>
              <span className="text-indigo-200 font-bold ml-2">URGENT</span>
            </div>
            <ul className="space-y-5 mb-10 flex-grow relative z-10">
              {['6-hour warp speed', 'Premium visual design', 'Complex charts & graphs', 'Custom icons & animations', 'Priority human touch', 'Direct designer access'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white text-sm font-bold">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all text-sm tracking-widest uppercase relative z-10 shadow-xl">
              I'M PANICKING - FIX IT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
