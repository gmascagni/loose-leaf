import React, { useState } from 'react';
import { Thermometer, Gauge, Sparkles, Droplets, Lightbulb } from 'lucide-react';
import TeaSteepingProTipModal from './TeaSteepingProTipModal';

export default function HeroBanner({ activeMethod, unitSystem }) {
  const [isProTipOpen, setIsProTipOpen] = useState(false);

  const heroImage = (activeMethod?.heroImage && activeMethod.heroImage !== '/') 
    ? activeMethod.heroImage 
    : '/tea_ceremony.jpg';

  const isMetric = unitSystem === 'metric';
  const tempDisplay = isMetric 
    ? `${activeMethod?.tempC || 88}°C` 
    : `${activeMethod?.tempF || 190}°F`;

  return (
    <section className="relative overflow-hidden rounded-3xl mb-10 transition-all duration-700 shadow-2xl border glass-panel-tea border-sage-500/35 group">
      {/* Dynamic Background Image inside Hero Container */}
      <div className="absolute inset-0 z-0">
        <img
          key={heroImage}
          src={heroImage}
          alt={activeMethod?.name || 'Tea Steeping Variety'}
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.7] contrast-110 group-hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B130E] via-[#0B130E]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-90" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 p-8 md:p-12 lg:p-14 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl text-xs uppercase tracking-widest font-extrabold text-cream-light border border-white/20 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-sage-300" />
            <span>Variety Specifications & Preferred Leaves</span>
          </div>

          {/* Steeping Pro Tip Button */}
          <button
            onClick={() => setIsProTipOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full btn-tactile-tea text-white font-extrabold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
            title="Open Steeping Pro Tip Technique & Temperature Guide"
          >
            <Lightbulb className="w-3.5 h-3.5 fill-current text-white" />
            <span>Steeping Tips 💡</span>
          </button>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold text-cream-light tracking-wide mb-4 leading-tight drop-shadow-lg flex items-center justify-between">
          <span>{activeMethod?.name || 'Specialty Tea Steeping'}</span>
        </h2>

        <p className="text-sm md:text-base text-cream-soft/90 leading-relaxed mb-6 max-w-xl font-medium drop-shadow-md">
          {activeMethod?.description || 'Precision extraction guide and scaling parameters.'}
        </p>

        {/* Quick Specs Raised Glass Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          
          <div className="glass-panel p-4 rounded-2xl flex items-center space-x-3.5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 rounded-xl shadow-inner bg-sage-500/25 text-sage-300 border border-sage-500/30">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-cream-soft/60 uppercase font-bold tracking-wider">Target Temp</div>
              <div className="text-base font-extrabold text-cream-light font-mono">{tempDisplay}</div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center space-x-3.5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 rounded-xl shadow-inner bg-sage-500/25 text-sage-300 border border-sage-500/30">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-cream-soft/60 uppercase font-bold tracking-wider">Leaf Style</div>
              <div className="text-sm font-bold text-cream-light">{activeMethod?.leafGrade || 'Whole Leaf'}</div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center space-x-3.5 hover:-translate-y-1 transition-all duration-300 col-span-2 sm:col-span-1">
            <div className="p-3 rounded-xl shadow-inner bg-sage-500/25 text-sage-300 border border-sage-500/30">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-cream-soft/60 uppercase font-bold tracking-wider">Steep Ratio</div>
              <div className="text-sm font-extrabold text-cream-light font-mono">1 : {activeMethod?.ratio || 50}</div>
            </div>
          </div>

        </div>

        {/* Preferred Garden Terroir Notes */}
        {activeMethod?.preferredTeaTypes && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-cream-soft/90 max-w-xl">
            <span className="font-bold text-sage-300 uppercase tracking-wider block mb-1">Recommended Harvests & Estates:</span>
            <span>{activeMethod?.preferredTeaTypes}</span>
          </div>
        )}

      </div>

      <TeaSteepingProTipModal isOpen={isProTipOpen} onClose={() => setIsProTipOpen(false)} />
    </section>
  );
}
