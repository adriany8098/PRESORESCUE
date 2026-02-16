
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Steps from './components/Steps';
import InstantRescue from './components/InstantRescue';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Upload, Zap, Coffee, CheckCircle, ArrowRight, FileUp } from 'lucide-react';

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isUploading) {
      setProgress(0);
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const handleSimulateUpload = () => {
    if (uploadComplete || isUploading) return;
    
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 2200);
  };

  const resetUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadComplete(false);
    setProgress(0);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white bg-black">
      <Navbar />
      <main>
        <Hero />
        
        {/* Enhanced "Dump the Mess" Section */}
        <section id="upload" className="py-24 relative bg-indigo-600 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                DUMP THE <span className="underline decoration-indigo-300 italic">PANIC.</span>
              </h2>
              <p className="text-xl text-indigo-100 font-medium mb-8 leading-relaxed">
                Ugly PowerPoints, messy Word docs, or just a pile of bullet points. Whatever you have, we transform it into a professional masterpiece while you sleep.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="p-1 bg-white/10 rounded-full"><CheckCircle className="w-4 h-4 text-indigo-300" /></div>
                  <span className="font-bold text-sm uppercase tracking-wider">Any format accepted (PPTX, PDF, DOCX, TXT)</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="p-1 bg-white/10 rounded-full"><CheckCircle className="w-4 h-4 text-indigo-300" /></div>
                  <span className="font-bold text-sm uppercase tracking-wider">Confidential & Secure processing</span>
                </div>
              </div>
            </div>

            <div 
              onClick={handleSimulateUpload}
              className={`w-full md:w-2/5 aspect-[4/3] glass rounded-[48px] flex flex-col items-center justify-center border-white/20 shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden ${isUploading ? 'scale-95' : uploadComplete ? 'border-green-400/50' : 'hover:scale-[1.02] hover:bg-white/5'}`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center w-full px-12">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-white/10 border-t-indigo-300 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileUp className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4 border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between w-full text-xs font-black text-indigo-200 uppercase tracking-widest">
                    <span>Analyzing Mess...</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              ) : uploadComplete ? (
                <div className="flex flex-col items-center text-center px-8 animate-in fade-in zoom-in duration-500">
                  <div className="p-8 bg-green-400 text-black rounded-full mb-6 shadow-[0_0_50px_rgba(74,222,128,0.4)] animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tighter">Your mess is safe with us!</h3>
                  <p className="text-indigo-100 text-sm font-medium mb-8">We've identified 12 slides that need a rescue.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); scrollTo('pricing'); }}
                      className="flex-1 bg-white text-indigo-600 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all shadow-xl"
                    >
                      Choose Speed <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={resetUpload}
                      className="text-white/40 hover:text-white/60 text-xs font-bold uppercase transition-colors"
                    >
                      Upload another?
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-8 bg-white text-indigo-600 rounded-[32px] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-2xl relative z-10">
                    <Upload className="w-14 h-14" />
                  </div>
                  <div className="mt-8 text-center relative z-10">
                    <span className="text-2xl font-black text-white uppercase tracking-tighter block mb-2">Drop your mess here</span>
                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] opacity-60">or click to browse files</span>
                  </div>
                  
                  {/* Decorative elements inside the card */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                  <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
                </>
              )}
            </div>
          </div>
          
          {/* Section Background Decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[140px] -mr-64 -mt-64 opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] -ml-32 -mb-32 opacity-20 pointer-events-none" />
        </section>

        <div id="ai-preview">
          <InstantRescue />
        </div>
        
        <Steps />

        {/* High School Benefits */}
        <section className="py-24 px-6 bg-black relative">
           <div className="absolute inset-0 grid-bg opacity-30"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="glass p-10 rounded-[40px] border-white/5 hover:border-indigo-500/30 transition-all group overflow-hidden">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform"><Zap className="w-7 h-7" /></div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Academic Flex</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Walk into class looking like a professional. High-res visuals and layouts that make you the smartest person in the room.</p>
            </div>
            <div className="glass p-10 rounded-[40px] border-white/5 hover:border-purple-500/30 transition-all group overflow-hidden">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform"><Coffee className="w-7 h-7" /></div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Save Your Sleep</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Don't stay up until 3 AM fighting with text boxes. Let us do the heavy lifting while you actually get some real rest.</p>
            </div>
            <div className="glass p-10 rounded-[40px] border-white/5 hover:border-blue-500/30 transition-all group md:col-span-1 overflow-hidden">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform"><Zap className="w-7 h-7" /></div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Guaranteed "A" Look</h3>
              <p className="text-slate-400 font-medium leading-relaxed">We deliver exactly what teachers want: clean data visualization, great logical flow, and zero embarrassing typos.</p>
            </div>
          </div>
        </section>

        <Pricing />
        
        <FAQ />
        
        {/* Urgent High School CTA */}
        <section className="py-32 px-6 relative overflow-hidden bg-black text-center">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] -z-10" />
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none">
            LAST MINUTE?<br /><span className="text-indigo-500 italic">WE GOT YOU.</span>
          </h2>
          <button 
            onClick={() => scrollTo('upload')}
            className="px-16 py-8 bg-white text-black font-black text-3xl rounded-3xl hover:bg-indigo-400 hover:text-white transition-all transform hover:-translate-y-2 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
          >
            RESCUE ME NOW
          </button>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default App;
