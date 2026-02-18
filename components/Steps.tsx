import React, { useState } from 'react';
import { Upload, FileText, Send, CheckCircle2, Share2, X, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';

interface Step {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

const Steps: React.FC = () => {
  const [activeShareStep, setActiveShareStep] = useState<Step | null>(null);

  const steps: Step[] = [
    {
      title: "Dump the Panic",
      desc: "Upload your messy slides, rough notes, or just a topic. We take it all.",
      icon: <Upload className="w-6 h-6" />,
      color: "indigo"
    },
    {
      title: "AI Restructuring",
      desc: "Our AI analyzes content for narrative flow, clarity, and impactful messaging.",
      icon: <FileText className="w-6 h-6" />,
      color: "purple"
    },
    {
      title: "Human Design Touch",
      desc: "Expert designers polish visuals, charts, and animations for a pro look.",
      icon: <Send className="w-6 h-6" />,
      color: "blue"
    },
    {
      title: "Ace the Preso",
      desc: "Receive your final .pptx or .pdf within 6 to 24 hours. Stress-free.",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "emerald"
    },
  ];

  const handleShare = (step: Step) => {
    setActiveShareStep(step);
  };

  const closeShare = () => {
    setActiveShareStep(null);
  };

  return (
    <section id="how" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">How the Rescue Works</h2>
          <p className="mt-4 text-lg text-slate-500">Three easy steps to go from academic panic to legendary slides.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[48px] left-12 right-12 h-px bg-white/10 z-0"></div>
          
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="relative z-10 flex flex-col items-center text-center group p-6 rounded-[32px] transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-white/[0.02]"
            >
              <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-white shadow-xl mb-6 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] transition-all duration-500">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-indigo-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4 group-hover:text-slate-300 transition-colors duration-300 mb-6">
                {step.desc}
              </p>
              
              <button 
                onClick={() => handleShare(step)}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white px-4 py-2 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Step
              </button>
              
              {/* Subtle accent glow behind icon on hover */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-2xl transition-all duration-500 rounded-full -z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {activeShareStep && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass w-full max-w-md rounded-[40px] border-white/10 p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button 
              onClick={closeShare}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-4 border border-indigo-500/20">
                <Share2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Share Step: {activeShareStep.title}</h3>
              <p className="text-slate-400 text-sm font-medium">Spread the word about the academic rescue workflow.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all group">
                <Twitter className="w-5 h-5 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-white">X / Twitter</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-600/20 hover:border-blue-600/30 transition-all group">
                <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Facebook</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-500/20 hover:border-blue-500/30 transition-all group">
                <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-white">LinkedIn</span>
              </button>
              <button className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group">
                <LinkIcon className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Copy Link</span>
              </button>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 italic text-slate-500 text-xs leading-relaxed text-center">
              "Check out how PresoRescue handles {activeShareStep.title.toLowerCase()} - total life saver for student presentations!"
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Steps;