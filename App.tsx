
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Steps from './components/Steps';
import InstantRescue from './components/InstantRescue';
import MissionCanvas from './components/MissionCanvas';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { generateBenefitImage, generateSlideImage } from './services/imageService';
import { generateMissionBriefing, MissionBriefing, FileData } from './services/gemini';
import { downloadPresentation, generatePresentationBase64 } from './services/pptxService';
import { sendRescueEmail } from './services/emailService';
import { 
  Zap, Loader2, Terminal, ShieldCheck, AlertCircle, Lock, 
  GraduationCap, Layout, Paperclip, X, FileCheck, PartyPopper,
  RefreshCw, Palette, Key, ShieldAlert, ExternalLink
} from 'lucide-react';

// Removed redundant AIStudio global declaration as it conflicts with pre-configured ambient types

const AIGeneratedBenefitCard = ({ 
  title, 
  desc, 
  prompt, 
  icon: Icon, 
  accentColor,
  index = 0,
  hasKey = false
}: { 
  title: string, 
  desc: string, 
  prompt: string, 
  icon: any, 
  accentColor: string,
  index?: number,
  hasKey?: boolean
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasKey) {
      setLoading(false);
      return;
    }

    const fetchImage = async () => {
      setLoading(true);
      const staggerDelay = index * 1000;
      await new Promise(r => setTimeout(r, staggerDelay));
      
      try {
        const url = await generateBenefitImage(prompt);
        setImageUrl(url);
      } catch (e) {
        console.error("Benefit image error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [prompt, index, hasKey]);

  return (
    <div className={`relative group rounded-[40px] overflow-hidden border border-white/5 hover:border-${accentColor}-500/30 transition-all md:min-h-[500px] flex flex-col justify-end p-10 bg-zinc-900 shadow-2xl`}>
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 gap-4">
          <div className={`w-12 h-12 border-4 border-white/5 border-t-${accentColor}-500 rounded-full animate-spin`} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 animate-pulse">AI Visualizing...</span>
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 group-hover:opacity-60 grayscale-[0.2] group-hover:grayscale-0"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br from-zinc-800 to-${accentColor}-900/20 opacity-40`} />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-${accentColor}-600/30 rounded-2xl flex items-center justify-center text-${accentColor}-400 mb-6 group-hover:bg-${accentColor}-600/50 group-hover:-translate-y-1 transition-all duration-500 border border-${accentColor}-500/20 shadow-lg`}>
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-white drop-shadow-md">{title}</h3>
        <p className="text-white/80 font-medium leading-relaxed drop-shadow-sm group-hover:text-white transition-colors">{desc}</p>
      </div>
    </div>
  );
};

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [missionBriefing, setMissionBriefing] = useState<MissionBriefing | null>(null);
  
  // Three distinct input states as requested
  const [goal, setGoal] = useState('');
  const [notes, setNotes] = useState('');
  const [tone, setTone] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTheme, setSelectedTheme] = useState('Midnight Tech');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  
  const [isPaid, setIsPaid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const themes = [
    { name: 'Midnight Tech', desc: 'Dark/Neon', class: 'bg-indigo-600' },
    { name: 'Minimalist Pro', desc: 'White/Clean', class: 'bg-white text-black' },
    { name: 'Venture Capital', desc: 'Navy/Gold', class: 'bg-[#001F3F] text-[#D4AF37]' }
  ];

  useEffect(() => {
    const checkKey = async () => {
      try {
        // Assume window.aistudio is pre-configured and valid
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      } catch (e) {
        console.warn("AI Studio key check failed", e);
      }
    };
    checkKey();
  }, []);

  const handleConnectHQ = async () => {
    // Assume window.aistudio is pre-configured and valid
    await (window as any).aistudio.openSelectKey();
    setHasApiKey(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() && !notes.trim() && !uploadedFile) return;

    // Assume window.aistudio is pre-configured and valid
    const keySelected = await (window as any).aistudio.hasSelectedApiKey();
    if (!keySelected) {
      setError("AI engine requires a connection. Please click 'Connect to AI HQ' above.");
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      let fileData: FileData | undefined;
      if (uploadedFile) {
        const base64 = await fileToBase64(uploadedFile);
        fileData = { base64, mimeType: uploadedFile.type };
      }

      // Preview generation with triple input fields
      const briefing = await generateMissionBriefing(goal, notes, tone, selectedTheme, fileData, 'chill');
      
      const imagePromises = briefing.slides.slice(0, 2).map(slide => generateSlideImage(slide.imagePrompt));
      const images = await Promise.all(imagePromises);
      
      const completeBriefing = { 
        ...briefing, 
        generatedImages: images.map(img => img || '') 
      };

      setMissionBriefing(completeBriefing);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Rescue failed. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onReset = () => {
    setMissionBriefing(null);
    setGoal('');
    setNotes('');
    setTone('');
    setUploadedFile(null);
    setError(null);
    setShowSuccessScreen(false);
  };

  const handlePaymentSuccess = async (email: string, planType: 'chill' | 'emergency') => {
    setIsPaid(true);
    setUserEmail(email);
    setError(null);
    setIsGenerating(true);
    
    try {
      let fileData: FileData | undefined;
      if (uploadedFile) {
        const base64 = await fileToBase64(uploadedFile);
        fileData = { base64, mimeType: uploadedFile.type };
      }

      // RE-GENERATE with FULL PLAN SPECS (Instant)
      const finalBriefing = await generateMissionBriefing(goal, notes, tone, selectedTheme, fileData, planType);
      
      const imageCount = planType === 'emergency' ? finalBriefing.slides.length : 2;
      const imagePromises = finalBriefing.slides.slice(0, imageCount).map(slide => generateSlideImage(slide.imagePrompt));
      const images = await Promise.all(imagePromises);
      
      const completeBriefing = { 
        ...finalBriefing, 
        generatedImages: images.map(img => img || '') 
      };

      setMissionBriefing(completeBriefing);

      const base64Pptx = await generatePresentationBase64(completeBriefing);
      await downloadPresentation(completeBriefing);
      await sendRescueEmail(email, completeBriefing.operationName, base64Pptx);
      
      setShowSuccessScreen(true);
    } catch (err) {
      console.error("Post-payment dispatch failed:", err);
      setError("Payment confirmed, but delivery failed. Contact HQ support.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (showSuccessScreen && missionBriefing) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl space-y-8 animate-in zoom-in duration-700">
          <div className="w-32 h-32 bg-indigo-600 rounded-[40px] flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(99,102,241,0.5)] animate-bounce">
            <PartyPopper className="w-16 h-16 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">Rescue Complete!</h1>
            <p className="text-slate-400 text-xl font-medium leading-relaxed">
              Your slides for <strong>{missionBriefing.operationName}</strong> were downloaded instantly and sent to <strong>{userEmail}</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
             <button 
              onClick={() => setShowSuccessScreen(false)}
              className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl flex items-center gap-3 justify-center"
            >
              <Layout className="w-5 h-5" />
              Review Canvas
            </button>
            <button 
              onClick={onReset}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-3 justify-center"
            >
              <RefreshCw className="w-5 h-5" />
              New Rescue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (missionBriefing) {
    return (
      <MissionCanvas 
        briefing={missionBriefing} 
        onReset={onReset} 
        isPaid={isPaid} 
        onDownload={() => downloadPresentation(missionBriefing)} 
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <Hero />
      
      {!hasApiKey && (
        <section className="bg-indigo-600/10 border-y border-indigo-500/20 py-4 overflow-hidden relative group">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-indigo-400 animate-pulse" />
              <p className="text-sm font-bold text-slate-300">
                Visual Intelligence Engine requires an API connection. 
                <span className="hidden md:inline text-slate-500 text-xs ml-2 font-medium">Connect a paid project key for 2K high-res generation.</span>
              </p>
            </div>
            <button 
              onClick={handleConnectHQ}
              className="px-6 py-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 transition-all shadow-lg flex items-center gap-2 shrink-0"
            >
              Connect to AI HQ
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms]" />
        </section>
      )}

      <section id="upload" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase mb-4 border border-indigo-500/20">
              <Terminal className="w-4 h-4" />
              Command Center
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Start Your Rescue
            </h2>
            <p className="text-slate-500 text-lg">
              Instant AI Generation. No waiting rooms. No delays.
            </p>
          </div>

          <div className="mb-10 max-w-2xl mx-auto">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 mb-3 block">1. Style Selection</label>
            <div className="grid grid-cols-3 gap-4">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTheme(t.name)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
                    selectedTheme === t.name 
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <Palette className={`w-5 h-5 ${selectedTheme === t.name ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <div className="text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest">{t.name}</div>
                    <div className="text-[8px] opacity-40 font-bold">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={`glass p-8 md:p-12 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden transition-all duration-700`}>
            {isGenerating && (
               <div className="absolute inset-0 bg-black/80 animate-in fade-in flex flex-col items-center justify-center z-50 backdrop-blur-md">
                 <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
                 <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Deploying Extraction Teams</h4>
                 <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Rendering 2K Visual Intelligence...</p>
               </div>
            )}
            
            <form onSubmit={handleAction} className="space-y-8 relative z-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 block">2. The Goal</label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Pitching a new project to my boss Adrian"
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium transition-all placeholder:text-slate-700 ${isGenerating ? 'opacity-30 pointer-events-none' : ''}`}
                  />
                </div>

                <div className="space-y-2 relative group/field">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 block">3. Key Data/Notes</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Paste your 'messy notes' here..."
                    className={`w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-8 text-white focus:ring-2 focus:ring-indigo-500 outline-none min-h-[180px] text-lg font-medium leading-relaxed transition-all placeholder:text-slate-700 ${isGenerating ? 'opacity-30 pointer-events-none' : ''}`}
                  />
                  
                  {uploadedFile && (
                    <div className="absolute top-14 right-4 animate-in fade-in zoom-in duration-300">
                      <div className="flex items-center gap-3 bg-indigo-600 px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                        <FileCheck className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white max-w-[120px] truncate">{uploadedFile.name}</span>
                        <button type="button" onClick={removeFile} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-6 right-8">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept=".pdf,.docx,.txt"
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all ${uploadedFile ? 'text-indigo-400 border-indigo-500/30' : ''}`}
                      title="Attach File (PDF, DOCX, TXT)"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 block">4. Tone</label>
                  <input
                    type="text"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    placeholder="e.g., Professional, Aggressive, or Friendly"
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium transition-all placeholder:text-slate-700 ${isGenerating ? 'opacity-30 pointer-events-none' : ''}`}
                  />
                </div>
              </div>

              {error && (
                <div className={`flex flex-col gap-3 p-6 rounded-3xl text-sm border bg-red-500/10 border-red-500/20 text-red-400 animate-in shake duration-500`}>
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 shrink-0" />
                    <span className="font-bold">{error}</span>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={isGenerating || (!goal.trim() && !notes.trim() && !uploadedFile)}
                className={`w-full py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    EXTRACTING INTEL...
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6" />
                    DEPLOY MISSION
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AIGeneratedBenefitCard 
              title="Academic Edge"
              desc="We structure your content to follow high-level academic narratives that teachers love."
              prompt="Ultra-detailed cinematic shot of a dark scholarly university archive, dark mahogany shelves, glowing translucent sapphire blue holographic data streams forming a structured narrative path, ethereal lighting, profound atmosphere, 8k resolution."
              icon={GraduationCap}
              accentColor="indigo"
              index={0}
              hasKey={hasApiKey}
            />
            <AIGeneratedBenefitCard 
              title="Design Flex"
              desc="Your slides won't just look good; they'll look like they were made by a pro agency."
              prompt="Minimalist visual design studio at night, black obsidian surfaces, vibrant neon purple rays reflecting off floating 3D minimalist layout grids, sleek professional agency vibe, sharp focus, octane render style."
              icon={Layout}
              accentColor="purple"
              index={1}
              hasKey={hasApiKey}
            />
            <AIGeneratedBenefitCard 
              title="Panic Over"
              desc="From rough notes to ready-to-present in hours. Reclaim your sleep."
              prompt="Serene high-end bedroom workspace at 3 AM, deep emerald green ambient glow from a sleek laptop screen, single holographic pillow floating above a clean desk, cinematic moody lighting, peaceful aesthetic."
              icon={ShieldCheck}
              accentColor="emerald"
              index={2}
              hasKey={hasApiKey}
            />
          </div>
        </div>
      </section>

      <Steps />
      <InstantRescue />
      <Pricing onPaymentSuccess={handlePaymentSuccess} />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
