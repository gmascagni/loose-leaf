import React from 'react';
import { X, Sparkles, Droplets, Thermometer, Sliders, Clock, CheckCircle2 } from 'lucide-react';

export default function TeaSteepingProTipModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative max-w-2xl w-full rounded-3xl bg-[#0B150F] border-2 border-sage-500/60 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-cream-light">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-cream-light hover:text-sage-300 hover:bg-white/20 transition-all border border-white/15"
          title="Close Pro Tip Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-sage-300 mb-2">
          <Sparkles className="w-4 h-4 animate-pulse text-sage-300" />
          <span>Pro Tip Masterclass • Gongfu & Fine Steeping Technique</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-light mb-2">
          Mastering Loose Leaf Steeping
        </h3>
        <p className="text-xs text-stone-300 mb-6 font-normal">
          Ratio: <strong className="text-sage-300 font-mono">1g Leaf to 30–50mL Water</strong> (Gongfu vs. Western). Key Rule: <strong className="text-emerald-400 font-mono">Decant completely between infusions</strong> to preserve subsequent steeps.
        </p>

        {/* 1. Core Water Quality & Temperature Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs">
            <div className="font-bold text-sage-300 mb-2 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span>Water Chemistry & Heat</span>
            </div>
            <ul className="space-y-1.5 text-stone-300 text-[11px] list-disc list-inside">
              <li>Use soft, low-mineral spring water (30–60 ppm TDS)</li>
              <li>Never scald delicate green or white leaves with rolling boiling water</li>
              <li>Aim for <strong>75°C - 80°C</strong> for Japanese Sencha & Gyokuro</li>
              <li>Use near-boiling (95°C - 98°C) for Assam CTC, Masala Chai & Aged Pu-erh</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs">
            <div className="font-bold text-sage-300 mb-2 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Gongfu Ritual Protocol</span>
            </div>
            <ul className="space-y-1.5 text-stone-300 text-[11px] list-disc list-inside">
              <li>Preheat Gaiwan or ceramic teapot with warm water</li>
              <li>Flash rinse rolled oolongs and aged pu-erh for 10s to awaken leaves</li>
              <li>Tilt Gaiwan lid slightly to form a crescent moon opening</li>
              <li>Strain every drop into a fairness pitcher (Cha Hai)</li>
            </ul>
          </div>
        </div>

        {/* 2. Step-by-Step Multi-Steep Progression */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-xs mb-6">
          <div className="font-bold text-sage-300 mb-3 uppercase font-mono tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-gold" />
            <span>Infusion Progression Timeline</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="px-2 py-0.5 rounded bg-sage-500/20 text-sage-300 font-mono text-[10px] font-bold">1st Steep</span>
              <p className="text-[11px] text-stone-300">
                <strong>Aroma Peak (30–45s):</strong> Delicate top-notes of orchid, honeysuckle, and fresh melon unfold first.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="px-2 py-0.5 rounded bg-sage-500/20 text-sage-300 font-mono text-[10px] font-bold">2nd Steep</span>
              <p className="text-[11px] text-stone-300">
                <strong>Body & Sweetness (+15s):</strong> Leaves fully expand, releasing sweet L-theanine amino acids and velvety mouthfeel.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="px-2 py-0.5 rounded bg-sage-500/20 text-sage-300 font-mono text-[10px] font-bold">3rd+ Steep</span>
              <p className="text-[11px] text-stone-300">
                <strong>Mineral Resonance (+20s each):</strong> Deep rock terroir and sweet lingering finish (Hui Gan) emerge in the throat.
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl btn-tactile-tea text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-all"
        >
          Got It, Start Steeping 🍵
        </button>

      </div>
    </div>
  );
}
