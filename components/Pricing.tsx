
import React, { useState } from 'react';
import { 
  Check, Rocket, Flame, Loader2, PartyPopper, X, 
  CreditCard, Link as LinkIcon, Mail, Info, 
  ShieldCheck, Lock, Globe, Apple, Wallet
} from 'lucide-react';

type CheckoutStep = 'pricing' | 'details' | 'payment' | 'success';

const Pricing: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>('pricing');
  const [checkoutPlan, setCheckoutPlan] = useState<{name: string, price: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (name: string, price: string) => {
    setCheckoutPlan({ name, price });
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);
    // Simulate real gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 3000);
  };

  const closeCheckout = () => {
    setStep('pricing');
    setCheckoutPlan(null);
    setIsProcessing(false);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {step === 'pricing' && (
          <div className="animate-in fade-in duration-500">
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
                <button 
                  onClick={() => handleSelectPlan('The Chill Saver', '$9.99')}
                  className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-white hover:text-black transition-all text-sm tracking-widest uppercase shadow-lg active:scale-95"
                >
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
                <button 
                  onClick={() => handleSelectPlan('The Emergency Exit', '$29.99')}
                  className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all text-sm tracking-widest uppercase relative z-10 shadow-xl active:scale-95"
                >
                  I'M PANICKING - FIX IT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal Overlay */}
        {step !== 'pricing' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
            <div className="glass w-full max-w-2xl rounded-[40px] border-white/10 shadow-2xl relative my-auto animate-in zoom-in slide-in-from-bottom-8 duration-500 overflow-hidden">
              
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter">Secure Checkout</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{checkoutPlan?.name} • {checkoutPlan?.price}</p>
                  </div>
                </div>
                <button onClick={closeCheckout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-8 md:p-12">
                {step === 'details' && (
                  <form onSubmit={handleDetailsSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <h4 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-3">
                        <Info className="w-5 h-5 text-indigo-500" />
                        1. Project Briefing
                      </h4>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Presentation Link (Google Slides/Dropbox/Drive)</label>
                          <div className="relative">
                            <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input required type="url" placeholder="https://docs.google.com/presentation/d/..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all outline-none" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Your Academic Email</label>
                          <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input required type="email" placeholder="student@university.edu" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all outline-none" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Specific Instructions for the Designer</label>
                          <textarea placeholder="e.g. Focus on making the charts pop, keep it minimal, my teacher loves purple..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all outline-none min-h-[100px]"></textarea>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3">
                      Proceed to Payment
                      <Rocket className="w-5 h-5" />
                    </button>
                  </form>
                )}

                {step === 'payment' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex flex-col gap-4">
                      <h4 className="text-xl font-black text-white uppercase flex items-center gap-3">
                        <Lock className="w-5 h-5 text-indigo-500" />
                        2. Secure Payment
                      </h4>
                      <p className="text-slate-400 text-sm">All payments are encrypted and processed securely via Stripe.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">
                        <Apple className="w-6 h-6 text-white" />
                        <span className="font-bold text-white">Apple Pay</span>
                      </button>
                      <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">
                        <Wallet className="w-6 h-6 text-white" />
                        <span className="font-bold text-white">Google Pay</span>
                      </button>
                    </div>

                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                      <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-slate-600"><span className="bg-black px-4">Or use card</span></div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Card Information</label>
                        <div className="relative">
                          <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input type="text" placeholder="Card Number" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM / YY" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input type="text" placeholder="CVC" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>

                    <button 
                      onClick={handleFinalPayment}
                      disabled={isProcessing}
                      className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Transaction...
                        </>
                      ) : (
                        <>Complete Payment of {checkoutPlan?.price}</>
                      )}
                    </button>
                    
                    <div className="flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                      <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secure</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Global Delivery</span>
                      <span className="flex items-center gap-1 text-indigo-400">Powered by Stripe</span>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center py-10 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-bounce">
                      <PartyPopper className="w-12 h-12 text-black" />
                    </div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none">THE RESCUE<br />HAS BEGUN!</h3>
                    <p className="text-slate-300 text-lg font-medium mb-12 leading-relaxed max-w-sm mx-auto">
                      Payment confirmed. Our design squad has received your mess and is already working their magic.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 text-left">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Project ID: RESCUE-9921-X</span>
                      </div>
                      <p className="text-slate-400 text-sm italic font-medium">"Check your email for real-time progress. We'll send the final deck as soon as it's ready!"</p>
                    </div>
                    <button 
                      onClick={closeCheckout}
                      className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative side orbs */}
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
