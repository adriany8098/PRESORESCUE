
import React, { useState } from 'react';
import { 
  Check, Rocket, Flame, Loader2, PartyPopper, X, 
  CreditCard, Link as LinkIcon, Mail, Info, 
  ShieldCheck, Lock, Globe, Apple, Wallet, Clock, Send
} from 'lucide-react';

type CheckoutStep = 'pricing' | 'details' | 'payment' | 'success';

const Pricing: React.FC = () => {
  const [step, setStep] = useState<CheckoutStep>('pricing');
  const [userEmail, setUserEmail] = useState('');
  const [checkoutPlan, setCheckoutPlan] = useState<{name: string, price: string, time: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (name: string, price: string, time: string) => {
    setCheckoutPlan({ name, price, time });
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);
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
              <div className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest mb-4 animate-pulse">
                🔥 Mid-Semester Flash Sale 🔥
              </div>
              <h2 className="text-5xl font-black tracking-tight mb-4 uppercase text-white">Student-Friendly Pricing</h2>
              <p className="text-slate-500 text-lg">Cheaper than a lunch delivery, better for your GPA.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* Standard - SALE VERSION */}
              <div className="glass rounded-[40px] p-10 border-indigo-500/30 bg-indigo-500/[0.02] transition-all flex flex-col group relative overflow-hidden">
                <div className="absolute top-6 -right-12 bg-red-600 text-white text-[10px] font-black py-1 px-12 rotate-45 shadow-xl">
                  50% OFF
                </div>
                
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Chill Saver</h3>
                    <p className="text-slate-500 text-sm font-medium">Standard 24h delivery</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-indigo-500/10 transition-colors">
                    <Rocket className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                  </div>
                </div>
                <div className="mb-10 flex items-end gap-3">
                  <span className="text-6xl font-black text-white tracking-tighter">$4.99</span>
                  <div className="flex flex-col mb-1">
                    <span className="text-slate-500 font-bold line-through text-lg">$9.99</span>
                    <span className="text-indigo-400 font-black text-[10px] uppercase">Flash Price</span>
                  </div>
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
                  onClick={() => handleSelectPlan('The Chill Saver', '$4.99', '24 hours')}
                  className="w-full py-5 bg-indigo-600 text-white border border-indigo-400/20 rounded-2xl font-black hover:bg-indigo-500 transition-all text-sm tracking-widest uppercase shadow-lg active:scale-95"
                >
                  Rescue Me for $4.99
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
                  onClick={() => handleSelectPlan('The Emergency Exit', '$29.99', '6 hours')}
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
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Address (Personal or Academic)</label>
                          <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                              required 
                              type="email" 
                              placeholder="you@email.com" 
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all outline-none" 
                            />
                          </div>
                          <p className="text-[10px] text-indigo-400/60 ml-2 italic">We'll send your final deck link here.</p>
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
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center py-6 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-bounce">
                      <PartyPopper className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 leading-none">RESCUE IN PROGRESS!</h3>
                    
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Clock className="w-24 h-24 text-indigo-400" />
                      </div>
                      <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Rescue Status: In Progress</h4>
                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"><Check className="w-3 h-3 text-black" /></div>
                          <span className="text-sm font-bold text-white">Payment & Files Received</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full border-2 border-indigo-500 animate-pulse" />
                          <span className="text-sm font-bold text-white">AI Analysis & Human Design Kickoff</span>
                        </div>
                        <div className="flex items-center gap-4 opacity-40">
                          <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
                          <span className="text-sm font-bold text-slate-300">Email Link Sent (Goal: {checkoutPlan?.time})</span>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-black text-white uppercase tracking-wider mb-1">Check your inbox: {userEmail}</p>
                            <p className="text-[10px] text-slate-500 font-medium">We'll email you a secure download link for your .pptx and .pdf files the moment they're ready.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={closeCheckout}
                      className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Back to Dashboard
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
