
import React, { useState } from 'react';
import { Sparkles, Loader2, Layout, Palette, Terminal } from 'lucide-react';
import { getRescueAdvice } from '../services/geminiService';
import { RescueAdvice } from '../types';

const InstantRescue: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [advice, setAdvice] = useState<RescueAdvice | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRescue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !audience) return;
    setLoading(true);
    try {
      const data = await getRescueAdvice(topic, audience);
      setAdvice(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-preview" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase mb-4 border border-indigo-500/20">
            <Sparkles className="w-4 h-4" />
            AI Vibe Check
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight uppercase">Need a cheat sheet right now?</h2>
          <p className="text-slate-500">Input your mess, get a glimpse of the greatness.</p>
        </div>

        <div className="glass rounded-[32px] p-8 md:p-12 border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Terminal className="w-32 h-32 text-indigo-500" />
          </div>

          {!advice ? (
            <form onSubmit={handleRescue} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">The Topic</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. History of Video Games"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Who are you presenting to?</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. My strict Chemistry teacher"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center gap-3 text-lg shadow-xl active:scale-[0.98]"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>AI RESCUE PREVIEW</>}
              </button>
            </form>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-3xl mb-12 shadow-2xl">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 opacity-70 text-white">The Unbeatable Hook</h3>
                <p className="text-2xl md:text-3xl font-extrabold leading-tight italic text-white">"{advice.hook}"</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-indigo-500 pl-4">
                    The Slide Flow
                  </h4>
                  <ul className="space-y-4">
                    {advice.structure.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-slate-400 text-sm">
                        <span className="font-black text-indigo-500 tabular-nums">{idx + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-purple-500 pl-4">
                    The Visual Flex
                  </h4>
                  <ul className="space-y-4">
                    {advice.designTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-4 text-slate-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button 
                onClick={() => setAdvice(null)}
                className="mt-12 text-indigo-400 font-bold flex items-center gap-2 hover:text-white transition-colors"
              >
                Try a different vibe
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstantRescue;
