import React, { useState } from 'react';
import { CupSoda, Scale, Sliders, CheckCircle2, Sparkles, Thermometer, Clock, ChevronRight, ChevronLeft, Volume2, VolumeX, Lightbulb, Gauge, RotateCcw, Leaf } from 'lucide-react';
import TeaSteepingProTipModal from './TeaSteepingProTipModal';

export default function PrecisionCalculator({
  methods,
  activeMethod,
  setActiveMethod,
  cupCount,
  setCupCount,
  cupMl,
  setCupMl,
  customRatio,
  setCustomRatio,
  customWaterMl,
  setCustomWaterMl,
  unitSystem,
  setUnitSystem,
  isMuted,
  setIsMuted,
  onPrevStep,
  onNextStep
}) {
  const isMetric = unitSystem === 'metric';
  const [isProTipOpen, setIsProTipOpen] = useState(false);

  // Math Calculations for Tea Steeping
  const totalWaterMl = customWaterMl !== null ? customWaterMl : (cupCount * cupMl);
  const currentRatio = customRatio || activeMethod?.ratio || 50;
  const dryDoseGrams = totalWaterMl / currentRatio;

  // Conversion helpers for Imperial
  const totalWaterOz = (totalWaterMl / 29.5735).toFixed(1);
  const dryDoseOz = (dryDoseGrams / 28.3495).toFixed(2);

  const waterDisplay = isMetric ? `${totalWaterMl} mL` : `${totalWaterOz} fl oz`;
  const doseDisplay = isMetric ? `${dryDoseGrams.toFixed(1)} g` : `${dryDoseOz} oz (${dryDoseGrams.toFixed(1)}g)`;

  const CUP_VOLUMES = [
    { label: isMetric ? 'Small Cup (150 mL)' : 'Small Cup (5.1 fl oz)', ml: 150 },
    { label: isMetric ? 'Standard Cup (200 mL)' : 'Standard Cup (6.8 fl oz)', ml: 200 },
    { label: isMetric ? 'Tea Mug (250 mL)' : 'Tea Mug (8.5 fl oz)', ml: 250 },
    { label: isMetric ? 'Large Teapot (500 mL)' : 'Large Teapot (16.9 fl oz)', ml: 500 }
  ];

  const handleCupCountChange = (count) => {
    setCupCount(count);
    if (customWaterMl !== null) setCustomWaterMl(null);
  };

  const handleCupMlChange = (ml) => {
    setCupMl(ml);
    if (customWaterMl !== null) setCustomWaterMl(null);
  };

  const handleAdjustWater = (deltaMl) => {
    const current = customWaterMl !== null ? customWaterMl : (cupCount * cupMl);
    const updated = Math.max(50, Math.min(3000, current + deltaMl));
    setCustomWaterMl(updated);
  };

  const handleWaterInputChange = (valStr) => {
    const num = parseFloat(valStr);
    if (!isNaN(num) && num > 0) {
      if (isMetric) {
        setCustomWaterMl(Math.round(num));
      } else {
        setCustomWaterMl(Math.round(num * 29.5735));
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Card with Embedded Unit (oz/g) & Audio Preferences */}
      <div className="p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl border transition-all duration-500 glass-panel-tea border-sage-500/40">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono font-extrabold uppercase tracking-[0.2em] text-sage-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Step 02 of 04 • Precision Leaf Scaler & Ratio Matrix</span>
          </div>

          {/* Embedded Preferences Control Bar */}
          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <button
              onClick={() => setIsProTipOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl btn-tactile-tea text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
              title="Open Tea Steeping Masterclass Tips"
            >
              <Lightbulb className="w-3.5 h-3.5 fill-current text-white" />
              <span>Steeping Tips 💡</span>
            </button>

            {setUnitSystem && (
              <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/15 text-xs font-mono font-bold shadow-md">
                <button
                  onClick={() => setUnitSystem('imperial')}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all active:scale-95 ${
                    unitSystem === 'imperial'
                      ? 'btn-tactile-tea text-white font-extrabold shadow-sm scale-102'
                      : 'text-stone-400 hover:text-cream-light'
                  }`}
                  title="Switch to Imperial Units (oz/°F)"
                >
                  <Scale className="w-3 h-3 text-current" />
                  <span>Imperial (oz/°F)</span>
                </button>

                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all active:scale-95 ${
                    unitSystem === 'metric'
                      ? 'btn-tactile-tea text-white font-extrabold shadow-sm scale-102'
                      : 'text-stone-400 hover:text-cream-light'
                  }`}
                  title="Switch to Metric Units (g/°C)"
                >
                  <Scale className="w-3 h-3 text-current" />
                  <span>Metric (g/°C)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-light drop-shadow-md">
          Calibrate Leaf Weight & Water Volume for {activeMethod?.name}
        </h3>
        <p className="text-xs md:text-sm text-cream-soft/70 mt-1 max-w-2xl leading-relaxed">
          Scale dry whole tea leaves with gram accuracy, set custom leaf-to-water ratios, and calculate exact water volume.
        </p>
      </div>

      {/* 2. Cup Scaler & Target Volume Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cups Selector */}
        <div className="p-6 md:p-7 rounded-3xl glass-panel border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-sage-300">
              Serving Count:
            </label>
            <span className="text-xs font-mono font-bold text-cream-light">
              {cupCount} {cupCount === 1 ? 'Cup / Serving' : 'Cups / Servings'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => handleCupCountChange(count)}
                className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                  cupCount === count
                    ? 'btn-tactile-tea text-white shadow-md'
                    : 'bg-black/40 text-stone-400 border-white/10 hover:text-cream-light hover:bg-white/10'
                }`}
              >
                {count} {count === 1 ? 'Cup' : 'Cups'}
              </button>
            ))}
          </div>

          {/* Cup Volume Options */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
              Cup / Vessel Size:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CUP_VOLUMES.map((cv) => (
                <button
                  key={cv.ml}
                  type="button"
                  onClick={() => handleCupMlChange(cv.ml)}
                  className={`py-2 px-3 rounded-xl text-left text-[11px] font-mono transition-all border truncate ${
                    cupMl === cv.ml
                      ? 'bg-sage-500/20 text-sage-200 border-sage-500/50 font-bold shadow-inner'
                      : 'bg-black/30 text-stone-400 border-white/5 hover:text-cream-light hover:bg-white/5'
                  }`}
                >
                  {cv.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Leaf Dose Card */}
        <div className="p-7 md:p-8 rounded-3xl bg-[#0B150F]/90 border border-sage-500/40 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.15em] font-mono mb-2.5 text-sage-300">
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Dry Tea Leaf Weight</span>
              </span>
              <span className="text-[10px] font-mono opacity-80">Precision Scale</span>
            </div>

            <div className="text-4xl lg:text-5xl font-extrabold font-mono text-cream-light drop-shadow-md my-2">
              {doseDisplay}
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Place your tea scoop on a digital gram scale, tare to zero, and weigh out dry leaves.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.08] text-xs font-mono text-stone-300 flex items-center justify-between">
            <span className="text-stone-400">Leaf Cut:</span>
            <span className="font-bold text-sage-300">{activeMethod?.leafGrade || 'Whole Leaf'}</span>
          </div>
        </div>

      </div>

      {/* 3. Ratio Matrix & Water Volume Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Ratio Slider Card */}
        <div className="p-7 md:p-8 rounded-3xl glass-panel border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-sage-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Leaf-to-Water Ratio:</span>
            </label>
            <span className="text-base font-mono font-extrabold text-cream-light">
              1g / {currentRatio}mL
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="15"
              max="70"
              step="1"
              value={currentRatio}
              onChange={(e) => setCustomRatio(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Quick Ratio Presets */}
          <div className="flex items-center space-x-2 pt-1 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold mr-1 flex-shrink-0">Presets:</span>
            <button
              type="button"
              onClick={() => setCustomRatio(20)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold border transition-all flex-shrink-0 ${
                currentRatio === 20 ? 'bg-sage-300 text-slate-950 border-sage-300' : 'bg-black/40 text-stone-400 border-white/10 hover:text-cream-light'
              }`}
            >
              1:20 (Gongfu/Pu-erh)
            </button>
            <button
              type="button"
              onClick={() => setCustomRatio(25)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold border transition-all flex-shrink-0 ${
                currentRatio === 25 ? 'bg-sage-300 text-slate-950 border-sage-300' : 'bg-black/40 text-stone-400 border-white/10 hover:text-cream-light'
              }`}
            >
              1:25 (Chai Simmer)
            </button>
            <button
              type="button"
              onClick={() => setCustomRatio(35)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold border transition-all flex-shrink-0 ${
                currentRatio === 35 ? 'bg-sage-300 text-slate-950 border-sage-300' : 'bg-black/40 text-stone-400 border-white/10 hover:text-cream-light'
              }`}
            >
              1:35 (Matcha)
            </button>
            <button
              type="button"
              onClick={() => setCustomRatio(50)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold border transition-all flex-shrink-0 ${
                currentRatio === 50 ? 'bg-sage-300 text-slate-950 border-sage-300' : 'bg-black/40 text-stone-400 border-white/10 hover:text-cream-light'
              }`}
            >
              1:50 (Standard ⭐)
            </button>
            <button
              type="button"
              onClick={() => setCustomRatio(60)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold border transition-all flex-shrink-0 ${
                currentRatio === 60 ? 'bg-sage-300 text-slate-950 border-sage-300' : 'bg-black/40 text-stone-400 border-white/10 hover:text-cream-light'
              }`}
            >
              1:60 (Delicate)
            </button>
          </div>
        </div>

        {/* Water Volume Output Card */}
        <div className="p-7 md:p-8 rounded-3xl bg-[#0B150F]/90 border border-sage-500/40 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.15em] font-mono mb-2.5 text-sage-300">
              <span className="flex items-center gap-2">
                <CupSoda className="w-4 h-4" />
                <span>Total Hot Water</span>
              </span>
              <div className="flex items-center gap-2">
                {customWaterMl !== null && (
                  <button
                    type="button"
                    onClick={() => setCustomWaterMl(null)}
                    className="flex items-center gap-1 text-[10px] font-mono text-sage-400 hover:text-sage-300 transition-colors"
                    title="Reset to cup calculations"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <span className="text-[10px] font-mono opacity-80">Target Liquid</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-3 my-2">
              <div className="text-4xl lg:text-5xl font-extrabold font-mono text-cream-light drop-shadow-md">
                {waterDisplay}
              </div>
              {customWaterMl !== null && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-sage-500/20 text-sage-300 border-sage-500/30">
                  Custom Volume
                </span>
              )}
            </div>
          </div>

          {/* Water Fine-Tuning Controls */}
          <div className="mt-5 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center justify-between text-[11px] text-stone-300 font-medium mb-2.5">
              <span className="flex items-center gap-1.5 font-bold">
                <Sliders className="w-3.5 h-3.5 text-sage-300" />
                <span>Fine-Tune Volume:</span>
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                {isMetric ? '±10 / ±50 mL' : '±0.5 / ±2 fl oz'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => handleAdjustWater(isMetric ? -50 : -59)}
                className="py-1 px-2 rounded-lg bg-black/50 hover:bg-white/10 text-stone-300 border border-white/10 text-[10px] font-mono font-bold transition-all active:scale-95"
                title={isMetric ? "Decrease 50 mL" : "Decrease ~2 fl oz"}
              >
                {isMetric ? '-50' : '-2oz'}
              </button>
              <button
                type="button"
                onClick={() => handleAdjustWater(isMetric ? -10 : -15)}
                className="py-1 px-2 rounded-lg bg-black/50 hover:bg-white/10 text-stone-300 border border-white/10 text-[10px] font-mono font-bold transition-all active:scale-95"
                title={isMetric ? "Decrease 10 mL" : "Decrease ~0.5 fl oz"}
              >
                {isMetric ? '-10' : '-0.5oz'}
              </button>

              <div className="flex-1 flex items-center bg-black/70 border border-white/15 rounded-lg px-2 py-1 focus-within:border-sage-400">
                <input
                  type="number"
                  min="50"
                  max="3000"
                  step={isMetric ? "5" : "0.5"}
                  value={isMetric ? totalWaterMl : totalWaterOz}
                  onChange={(e) => handleWaterInputChange(e.target.value)}
                  className="w-full bg-transparent text-cream-light font-mono font-bold text-xs text-center focus:outline-none"
                  title="Directly enter target water volume"
                />
                <span className="text-[10px] font-mono text-stone-400 ml-1">
                  {isMetric ? 'mL' : 'oz'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleAdjustWater(isMetric ? 10 : 15)}
                className="py-1 px-2 rounded-lg bg-black/50 hover:bg-white/10 text-stone-300 border border-white/10 text-[10px] font-mono font-bold transition-all active:scale-95"
                title={isMetric ? "Increase 10 mL" : "Increase ~0.5 fl oz"}
              >
                {isMetric ? '+10' : '+0.5oz'}
              </button>
              <button
                type="button"
                onClick={() => handleAdjustWater(isMetric ? 50 : 59)}
                className="py-1 px-2 rounded-lg bg-black/50 hover:bg-white/10 text-stone-300 border border-white/10 text-[10px] font-mono font-bold transition-all active:scale-95"
                title={isMetric ? "Increase 50 mL" : "Increase ~2 fl oz"}
              >
                {isMetric ? '+50' : '+2oz'}
              </button>
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-stone-300 flex items-center justify-between">
              <span className="font-bold text-sage-300">
                Recommended Water Temp: 
              </span>
              <span> {isMetric ? `${activeMethod?.tempC || 88}°C` : `${activeMethod?.tempF || 190}°F`}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Step Navigation Controls */}
      {onPrevStep && onNextStep && (
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/[0.08]">
          <button
            onClick={onPrevStep}
            className="py-4 px-8 rounded-2xl bg-white/[0.08] text-cream-light font-extrabold text-xs uppercase tracking-wider flex items-center gap-2.5 hover:bg-white/[0.15] transition-all border border-white/[0.12]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Step 01: Choose Variety</span>
          </button>

          <button
            onClick={onNextStep}
            className="py-4 px-9 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all btn-tactile-tea text-white"
          >
            <span>Step 03: Leaf Grade & Specs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tea Steeping Pro Tip Modal */}
      <TeaSteepingProTipModal
        isOpen={isProTipOpen}
        onClose={() => setIsProTipOpen(false)}
      />

    </div>
  );
}
