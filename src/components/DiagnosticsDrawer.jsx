import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import TroubleshootingHub from './TroubleshootingHub';

export default function DiagnosticsDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-14 border-t border-white/[0.08] pt-10">
      {/* Diagnostics Drawer Toggle Bar */}
      <div className="p-7 md:p-9 rounded-3xl border shadow-2xl backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-5 transition-colors duration-500 bg-[#0B150F]/90 border-sage-500/30">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-2xl bg-sage-500/20 text-sage-300 border border-sage-500/30">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-cream-light flex items-center gap-3">
              <span>Tea Steeping Diagnostics</span>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] px-3 py-1 rounded-full border font-extrabold bg-sage-500/20 text-sage-300 border-sage-500/30">
                Troubleshooting & Chemistry
              </span>
            </h3>
            <p className="text-xs md:text-sm text-stone-300 mt-1 font-normal">
              Diagnose tea flavor defects (tannin bitterness, flat steep, over-steeping) and calibrate water temperature, leaf ratio & steeping timings.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-7 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2.5 shadow-2xl transition-all active:scale-95 whitespace-nowrap ${
            isOpen
              ? 'btn-tactile-tea text-white'
              : 'bg-white/[0.08] text-cream-light hover:bg-white/[0.15] border border-white/[0.12]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isOpen ? 'Close Diagnostics Lab' : 'Expand Diagnostics Lab'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div className="animate-fade-in">
          <TroubleshootingHub />
        </div>
      )}
    </div>
  );
}
