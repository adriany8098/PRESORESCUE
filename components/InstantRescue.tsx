
import React, { useState } from 'react';
import { Sparkles, Loader2, Terminal, AlertCircle, RefreshCcw } from 'lucide-react';
import { getRescueAdvice } from '../services/geminiService';
import { RescueAdvice } from '../types';

const InstantRescue: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [advice, setAdvice] = useState<RescueAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRescue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !audience) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getRescueAdvice(topic, audience);
      setAdvice(data);
    } catch (err) {
      console.error(err);
      setError("The AI is currently swamped with rescues. Please try again in a second.");
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
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight uppercase leading-none">Need a cheat sheet right now?</h2>
          <p className="text-slate-500">Input your topic, get an instant structure plan.</p>
        </div>

        <div className="glass rounded-[40px] p-8 md:p-12 border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Terminal className="w-48 h-48 text-indigo-500" />
          </div>

          {!advice ? (
            <form onSubmit={handleRescue} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-2">The Topic</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Quantum Physics or 1920s Jazz"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-700"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-2">Who is the Audience?</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. My classmates or a board of directors"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-700"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              <button 
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-black py-6 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 text-lg shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    DESIGNING YOUR PLAN...
                  </>
                ) : (
                  <>AI RESCUE PREVIEW</>
                )}
              </button>
            </form>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 rounded-[32px] mb-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white/60">The Unbeatable Hook</h3>
                <p className="text-2xl md:text-4xl font-black leading-[1.1] italic text-white tracking-tighter">"{advice.hook}"</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                  <h4 className="flex items-center gap-3 text-xs font-black text-white uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    The Slide Flow
                  </h4>
                  <ul className="space-y-6">
                    {advice.structure.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-slate-400 text-sm font-medium items-start">
                        <span className="font-black text-indigo-400 tabular-nums bg-indigo-400/10 px-2 py-1 rounded text-[10px]">0{idx + 1}</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                  <h4 className="flex items-center gap-3 text-xs font-black text-white uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    Visual Flex
                  </h4>
                  <ul className="space-y-6">
                    {advice.designTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-4 text-slate-400 text-sm font-medium items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
                <button 
                  onClick={() => setAdvice(null)}
                  className="text-slate-500 font-bold flex items-center gap-2 hover:text-white transition-colors text-xs uppercase tracking-widest"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Try a different vibe
                </button>
                <div className="text-[10px] font-black uppercase text-indigo-500/50">Generated in 1.2s by Gemini-3</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstantRescue;
