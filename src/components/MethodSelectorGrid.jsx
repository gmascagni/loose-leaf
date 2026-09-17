import React from 'react';
import { Thermometer, Clock, CheckCircle2, ChevronRight, Sparkles, Leaf, Gauge } from 'lucide-react';

export default function MethodSelectorGrid({ methods, activeMethod, setActiveMethod, onNextStep, unitSystem }) {
  const isMetric = unitSystem === 'metric';

  // Helper to format total duration of a method's phases
  const getTotalDurationString = (phases) => {
    if (!phases || phases.length === 0) return '3m 00s';
    const totalSec = phases.reduce((acc, p) => acc + (p.durationSec || 0), 0);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}m ${s > 0 ? `${s}s` : ''}`;
  };

  return (
    <div className="space-y-10 md:space-y-12 animate-fade-in">
      {/* Step Header with Extraction Method Background Image */}
      <div className="p-8 md:p-10 lg:p-12 rounded-3xl relative overflow-hidden shadow-2xl border glass-panel-tea border-sage-500/40">
        {/* Background Extraction Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
          <img
            key={activeMethod?.heroImage || 'tea_bg'}
            src={(activeMethod?.heroImage && activeMethod.heroImage !== '/') ? activeMethod.heroImage : '/tea_ceremony.jpg'}
            alt="Steeping Background"
            className="w-full h-full object-cover object-center transform scale-105 filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B130E] via-[#0B130E]/85 to-[#0B130E]/50" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] mb-3 text-sage-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Step 01 of 04 • Variety Selection</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-cream-light mb-3 leading-tight drop-shadow-lg">
            Master the Art of Fine Tea Steeping
          </h2>
          
          <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed font-normal drop-shadow">
            Precision loose-leaf water ratio calculator, multi-infusion steeping timers, and leaf grade guide. Select your tea variety below:
          </p>
        </div>
      </div>

      {/* Grid of Teas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {methods.map((method) => {
          const isSelected = activeMethod?.id === method.id;
          const totalDurationStr = getTotalDurationString(method.phases);
          const tempStr = isMetric ? `${method.tempC}°C` : `${method.tempF}°F`;

          return (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method)}
              className={`p-8 md:p-9 rounded-3xl border text-left transition-all duration-300 relative flex flex-col justify-between group shadow-xl hover:-translate-y-1.5 ${
                isSelected
                  ? 'bg-emerald-500/20 border-sage-400/70 text-cream-light ring-1 ring-sage-400/40 shadow-[0_15px_40px_-10px_rgba(81,158,100,0.35)] backdrop-blur-xl'
                  : 'bg-[#0E1A11]/80 border-white/[0.08] text-stone-300 hover:bg-[#15271A] hover:border-sage-500/30'
              }`}
            >
              {/* Method Card Header */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3.5 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-sage-300 text-slate-950 shadow-[0_0_15px_rgba(81,158,100,0.5)] font-bold'
                      : 'bg-white/[0.06] text-sage-300 border border-white/[0.08]'
                  }`}>
                    <Leaf className="w-6 h-6" />
                  </div>

                  {isSelected && (
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-[0.15em] font-extrabold uppercase border flex items-center gap-1.5 shadow-inner bg-sage-500/20 text-sage-300 border-sage-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-bold mb-2.5 leading-snug drop-shadow text-cream-light">
                  {method.name}
                </h3>
                
                <p className="text-xs text-stone-400 leading-relaxed mb-6 font-normal">
                  {method.description}
                </p>
              </div>

              {/* Specs Pills Row */}
              <div className={`pt-5 border-t ${isSelected ? 'border-white/15' : 'border-white/[0.08]'} space-y-2.5 text-xs font-mono font-medium`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-stone-400">
                    Ratio Target:
                  </span>
                  <span className="font-bold text-cream-light">
                    1g / {method.ratio}mL
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-stone-400">
                    Water Temp:
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-sage-300">
                    <Thermometer className="w-3.5 h-3.5 opacity-80" />
                    {tempStr}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-stone-400">
                    Steep Duration:
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-cream-light">
                    <Clock className="w-3.5 h-3.5 opacity-80" />
                    {totalDurationStr}
                  </span>
                </div>

                {method.leafGrade && (
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-sage-400">Leaf Grade:</span>
                    <span className="flex items-center gap-1.5 font-bold text-sage-300">
                      <Gauge className="w-3.5 h-3.5 opacity-80" />
                      {method.leafGrade}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Navigation Action Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-white/[0.08]">
        <div className="text-xs text-stone-400 font-medium">
          Active Variety: <strong className="text-cream-light font-serif font-bold text-sm ml-1">{activeMethod?.name}</strong>
        </div>

        <button
          onClick={onNextStep}
          className="py-4 px-9 rounded-2xl font-extrabold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all btn-tactile-tea text-white"
        >
          <span>Step 02: Ratio & Scaler</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
