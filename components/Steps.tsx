
import React from 'react';
import { Upload, FileText, Send, CheckCircle2 } from 'lucide-react';

const Steps: React.FC = () => {
  const steps = [
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
              <p className="text-slate-500 text-sm leading-relaxed px-4 group-hover:text-slate-300 transition-colors duration-300">
                {step.desc}
              </p>
              
              {/* Subtle accent glow behind icon on hover */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-indigo-500/0 group-hover:bg-indigo-500/10 blur-2xl transition-all duration-500 rounded-full -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
