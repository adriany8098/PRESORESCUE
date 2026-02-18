
import React, { useState, useEffect } from 'react';
import { 
  Check, Rocket, Flame, Loader2, PartyPopper, X, 
  CreditCard, ShieldCheck, Copy, Lock, RefreshCw,
  ExternalLink, Shield, ArrowRight
} from 'lucide-react';

type CheckoutStep = 'pricing' | 'details' | 'payment' | 'success';

interface PricingProps {
  onPaymentSuccess?: (email: string, planType: 'chill' | 'emergency') => void;
}

const Pricing: React.FC<PricingProps> = ({ onPaymentSuccess }) => {
  const [step, setStep] = useState<CheckoutStep>('pricing');
  const [userEmail, setUserEmail] = useState('');
  const [checkoutPlan, setCheckoutPlan] = useState<{id: 'chill' | 'emergency', name: string, price: string, time: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    if (step === 'payment') {
      const code = 'PR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setReferenceCode(code);
    }
  }, [step]);

  const handleSelectPlan = (id: 'chill' | 'emergency', name: string, price: string, time: string) => {
    setCheckoutPlan({ id, name, price, time });
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleStripeCheckout = () => {
    if (!userEmail || !checkoutPlan) return;
    setIsRedirecting(true);
    
    // Simulate instant redirecting to Stripe
    setTimeout(() => {
      setIsRedirecting(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
        if (onPaymentSuccess) onPaymentSuccess(userEmail, checkoutPlan.id);
      }, 1000);
    }, 1500);
  };

  const closeCheckout = () => {
    setStep('pricing');
    setCheckoutPlan(null);
    setIsProcessing(false);
    setIsRedirecting(false);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {step === 'pricing' && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-black uppercase tracking-widest mb-4">
                Global Academic Deployment Ready
              </div>
              <h2 className="text-5xl font-black tracking-tight mb-4 uppercase">Student-Friendly Damage</h2>
              <p className="text-slate-500 text-lg">Instant generation. No delays. No stress.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* Chill Saver */}
              <div className="glass rounded-[40px] p-10 border-indigo-500/30 bg-indigo-500/[0.02] transition-all flex flex-col group relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Chill Saver</h3>
                    <p className="text-slate-500 text-sm font-medium">Instant AI Generation</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-indigo-500/10 transition-colors">
                    <Rocket className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                  </div>
                </div>
                <div className="mb-10 flex items-end gap-3">
                  <span className="text-6xl font-black text-white tracking-tighter">$4.99</span>
                  <div className="flex flex-col mb-1">
                    <span className="text-indigo-400 font-black text-[10px] uppercase">Standard Plan</span>
                  </div>
                </div>
                <ul className="space-y-5 mb-10 flex-grow">
                  {['Instant AI Generation', 'Professional formatting', 'AI content polishing', 'Up to 10 slides', 'Standard Layouts'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleSelectPlan('chill', 'The Chill Saver', '$4.99', 'Instant')}
                  className="w-full py-5 bg-indigo-600 text-white border border-indigo-400/20 rounded-2xl font-black hover:bg-indigo-500 transition-all text-sm tracking-widest uppercase shadow-lg active:scale-95"
                >
                  Rescue Me for $4.99
                </button>
              </div>

              {/* Emergency Exit */}
              <div className="bg-indigo-600 rounded-[40px] p-10 transform md:scale-105 shadow-[0_20px_60px_rgba(79,70,229,0.3)] flex flex-col relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Emergency Exit</h3>
                    <p className="text-indigo-200 text-sm font-medium">Instant AI Generation</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mb-10 relative z-10">
                  <span className="text-6xl font-black text-white tracking-tighter">$10.99</span>
                  <span className="text-indigo-100 font-bold ml-2 italic">PRO</span>
                </div>
                <ul className="space-y-5 mb-10 flex-grow relative z-10">
                  {['Instant PRO Generation', 'Full Speaker Scripts in Notes', 'AI Images for EVERY Slide', 'Custom Tactical Briefing', 'Premium Design Logic', 'Priority Processing'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white text-sm font-bold">
                      <Check className="w-5 h-5 text-white shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleSelectPlan('emergency', 'The Emergency Exit', '$10.99', 'Instant')}
                  className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all text-sm tracking-widest uppercase relative z-10 shadow-xl active:scale-95"
                >
                  UPGRADE TO PRO $10.99
                </button>
              </div>
            </div>
          </div>
        )}

        {step !== 'pricing' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
            
            {isRedirecting && (
              <div className="absolute inset-0 z-[110] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                <div className="relative mb-12">
                  <div className="w-32 h-32 border-4 border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-12 h-12 text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4 max-w-sm">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Securing Handoff</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Redirecting to secure payment...
                  </p>
                </div>
              </div>
            )}

            <div className="glass w-full max-w-2xl rounded-[40px] border-white/10 shadow-2xl relative my-auto animate-in zoom-in slide-in-from-bottom-8 duration-500">
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5 rounded-t-[40px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter">Mission briefing</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{checkoutPlan?.name} • {checkoutPlan?.price}</p>
                  </div>
                </div>
                <button onClick={closeCheckout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 md:p-12 max-h-[75vh] overflow-y-auto custom-scrollbar">
                {step === 'details' && (
                  <form onSubmit={handleDetailsSubmit} className="space-y-10">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Deployment Email</label>
                        <div className="relative">
                          <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input required type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="you@email.com" className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                      Confirm & Proceed
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}

                {step === 'payment' && (
                  <div className="space-y-10 animate-in fade-in duration-300">
                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[32px] text-center space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Ready for Rescue</h3>
                        <p className="text-slate-400 text-sm font-medium">Safe checkout via Stripe.</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleStripeCheckout} 
                      disabled={isRedirecting} 
                      className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95 disabled:opacity-50"
                    >
                      Checkout with Stripe
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center py-6 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-bounce">
                      <PartyPopper className="w-12 h-12 text-black" />
                    </div>
                    <h3 className="text-4xl font-black text-white uppercase mb-4 tracking-tighter">Mission Accepted</h3>
                    <p className="text-slate-400 text-sm mb-8">Payment verified. Tactical line unlocked.</p>
                    <button onClick={closeCheckout} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">Back to HQ</button>
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
