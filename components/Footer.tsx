
import React from 'react';
import { Zap, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">
                Preso<span className="text-indigo-400">Rescue</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Supporting students globally since 2024. Transforming academic panic into polished presentations through the power of AI and professional design.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">About Us</a></li>
              <li><a href="#how" className="hover:text-indigo-400 transition-colors duration-200">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 text-[10px] sm:text-xs flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-medium">© 2024 Student Presentation Rescue. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-300 font-semibold">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300 font-semibold">Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300 font-semibold">Student Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
