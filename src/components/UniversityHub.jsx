import React, { useState } from 'react';
import { Globe, MapPin, Mountain, Sparkles, ExternalLink, Dna, Compass, Sun, Wind, Droplets, ShoppingBag } from 'lucide-react';
import { TERROIR_ATLAS, TEA_BELT_OVERVIEW, BOTANICAL_COMPARISON } from '../data/brewData';

export default function UniversityHub() {
  const origins = TERROIR_ATLAS.tea || (Array.isArray(TERROIR_ATLAS) ? TERROIR_ATLAS : []);
  const [activeOriginId, setActiveOriginId] = useState(origins[0]?.id || 'fujian_china');

  const activeOrigin = origins.find(o => o.id === activeOriginId) || origins[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      {/* 1. SECTION HEADER */}
      <div className="mb-8 p-6 md:p-8 rounded-3xl relative overflow-hidden backdrop-blur-md transition-all duration-500 glass-panel-tea border-sage-500/40">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-2 text-sage-300">
          <Compass className="w-4 h-4" />
          <span>LooseLeaf Academy • Specialty Tea Terroir & Botanical Atlas</span>
        </div>
        <h3 className="font-serif text-2xl md:text-4xl font-extrabold text-cream-light mb-3">
          The Global Tea Terroirs, Botany & Heritage Gardens
        </h3>
        <p className="text-sm md:text-base text-cream-soft/80 max-w-3xl leading-relaxed">
          An enthusiast guide to high-altitude tea terroirs, Camellia sinensis varieties (Sinensis vs. Assamica), volcanic mountain soils, and historic tea houses.
        </p>

        <span className="inline-block mt-4 text-xs font-mono px-3 py-1 rounded-full border bg-sage-500/20 text-sage-300 border-sage-500/40 shadow-sage-500/10">
          Famous Specialty Tea Terroirs
        </span>
      </div>

      {/* 2. THE TEA TERROIR OVERVIEW BANNER */}
      <div className="mb-8 p-6 rounded-3xl bg-emerald-950/40 border border-sage-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-sage-500/15 border border-sage-500/30 text-sage-300">
              <Globe className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-extrabold text-cream-light">
                {TEA_BELT_OVERVIEW.title}
              </h4>
              <p className="text-xs text-cream-soft/80 mt-0.5 max-w-2xl">
                {TEA_BELT_OVERVIEW.description}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono font-bold bg-sage-500/10 text-sage-300 border border-sage-500/30 px-3 py-1 rounded-xl">
            High Mountain Terroirs
          </span>
        </div>

        {/* Three Macro Geographic Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEA_BELT_OVERVIEW.macroRegions.map((region, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-sage-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-sage-300 uppercase tracking-wider">{region.name}</span>
                <Sun className="w-3.5 h-3.5 text-sage-400/70" />
              </div>
              <div className="text-[11px] font-bold text-cream-light mb-1.5">{region.leader}</div>
              <p className="text-[11px] text-cream-soft/70 leading-relaxed">{region.characteristics}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTANICAL COMPARISON: SINENSIS VS. ASSAMICA */}
      <div className="mb-8 p-6 rounded-3xl bg-black/50 border border-white/15 shadow-2xl">
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-white/10">
          <Dna className="w-5 h-5 text-sage-300" />
          <h4 className="font-serif text-lg font-extrabold text-cream-light">
            Botanical Varieties: Camellia sinensis (Sinensis vs. Assamica)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Var. Sinensis */}
          <div className="p-5 rounded-2xl bg-white/5 border border-sage-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-sage-300 uppercase tracking-wider">{BOTANICAL_COMPARISON.sinensis.name}</span>
              <span className="text-[10px] font-mono bg-sage-500/20 text-sage-300 px-2.5 py-0.5 rounded-full font-bold">Small-Leaf Variety</span>
            </div>
            <div className="space-y-1.5 text-xs text-cream-soft/90 mb-3">
              <div><strong className="text-cream-light">Native Region:</strong> {BOTANICAL_COMPARISON.sinensis.nativeRegion}</div>
              <div><strong className="text-cream-light">Leaf Morphology:</strong> {BOTANICAL_COMPARISON.sinensis.leafSize}</div>
              <div><strong className="text-cream-light">Cold Tolerance:</strong> {BOTANICAL_COMPARISON.sinensis.coldHardiness}</div>
              <div><strong className="text-cream-light">Chemical Profile:</strong> {BOTANICAL_COMPARISON.sinensis.chemicalProfile}</div>
            </div>
            <p className="text-[11px] text-cream-soft/80 bg-black/30 p-2.5 rounded-xl border border-white/5">
              <strong className="text-sage-300">Sensory Notes:</strong> {BOTANICAL_COMPARISON.sinensis.flavorSignature}
            </p>
          </div>

          {/* Var. Assamica */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-cream-light uppercase tracking-wider">{BOTANICAL_COMPARISON.assamica.name}</span>
              <span className="text-[10px] font-mono bg-white/10 text-cream-soft px-2.5 py-0.5 rounded-full font-bold">Broad-Leaf Variety</span>
            </div>
            <div className="space-y-1.5 text-xs text-cream-soft/90 mb-3">
              <div><strong className="text-cream-light">Native Region:</strong> {BOTANICAL_COMPARISON.assamica.nativeRegion}</div>
              <div><strong className="text-cream-light">Leaf Morphology:</strong> {BOTANICAL_COMPARISON.assamica.leafSize}</div>
              <div><strong className="text-cream-light">Cold Tolerance:</strong> {BOTANICAL_COMPARISON.assamica.coldHardiness}</div>
              <div><strong className="text-cream-light">Chemical Profile:</strong> {BOTANICAL_COMPARISON.assamica.chemicalProfile}</div>
            </div>
            <p className="text-[11px] text-cream-soft/80 bg-black/30 p-2.5 rounded-xl border border-white/5">
              <strong className="text-sage-300">Sensory Notes:</strong> {BOTANICAL_COMPARISON.assamica.flavorSignature}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Origin Terroir Selection Grid */}
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest font-extrabold text-cream-soft/70 mb-3.5 flex items-center justify-between">
          <span>Select Tea Terroir or Growing Region</span>
          <span className="text-xs font-normal lowercase">({origins.length} terroirs documented)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {origins.map((origin) => {
            const isSelected = origin.id === activeOriginId;
            return (
              <button
                key={origin.id}
                onClick={() => setActiveOriginId(origin.id)}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? 'bg-sage-500/20 border-sage-500 text-cream-light shadow-lg scale-[1.02]'
                    : 'bg-black/30 border-white/10 text-cream-soft/70 hover:border-white/20 hover:text-cream-light'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xl">{origin.flag}</span>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5">
                    {origin.macroRegion ? origin.macroRegion.split(' ')[0] : 'Tea'}
                  </span>
                </div>
                <div className="font-serif font-bold text-xs line-clamp-1">{origin.country}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ACTIVE ORIGIN DETAIL CARD */}
      {activeOrigin && (
        <div className="p-6 md:p-8 rounded-3xl bg-black/40 border border-white/10 shadow-xl space-y-6">
          {/* Header & Badges */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-3xl">{activeOrigin.flag}</span>
                <h4 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-light">
                  {activeOrigin.country}
                </h4>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border bg-sage-500/20 text-sage-300 border-sage-500/30">
                  {activeOrigin.macroRegion}
                </span>
              </div>
              <p className="text-xs text-cream-soft/80 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-sage-300" />
                <span>Primary Regions: {activeOrigin.regions}</span>
              </p>
            </div>

            {/* Micro-Stats Pill Group */}
            <div className="flex flex-wrap gap-2">
              <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-2 text-xs">
                <Mountain className="w-4 h-4 text-sage-300" />
                <div>
                  <div className="text-[10px] text-cream-soft/60 uppercase font-mono">Elevation</div>
                  <div className="font-bold text-cream-light">{activeOrigin.altitude}</div>
                </div>
              </div>
              <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-2 text-xs">
                <Wind className="w-4 h-4 text-sage-300" />
                <div>
                  <div className="text-[10px] text-cream-soft/60 uppercase font-mono">Climate</div>
                  <div className="font-bold text-cream-light truncate max-w-[140px]">{activeOrigin.climate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sourced Brands & Famous Gardens Row */}
          {activeOrigin.famousBrands && activeOrigin.famousBrands.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 mb-3 text-xs font-bold uppercase tracking-wider text-sage-300">
                <ShoppingBag className="w-3.5 h-3.5 text-sage-300" />
                <span>Renowned Tea Gardens & Purveyors</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeOrigin.famousBrands.map((brand, bIdx) => (
                  <div key={bIdx} className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                    <div className="text-xs font-bold mb-1 text-sage-300">
                      {brand.name}
                    </div>
                    <div className="text-xs text-cream-light font-medium mb-1">
                      {brand.offering}
                    </div>
                    <div className="text-[11px] text-cream-soft/70">
                      {brand.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sensory Profile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Flavor Signature */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center space-x-2 mb-2 text-xs font-mono uppercase tracking-wider text-sage-300">
                <Sparkles className="w-3.5 h-3.5 text-sage-300" />
                <span>Aromatic & Flavor Notes</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeOrigin.flavorNotes?.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-black/50 border border-white/10 text-cream-light font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-cream-soft/80 flex items-center justify-between">
                <span>Cultivars & Leaf Genetics:</span>
                <span className="font-bold text-cream-light truncate max-w-[200px]">{activeOrigin.genetics}</span>
              </div>
            </div>

            {/* Soil Science & Steeping Style */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2 text-xs font-mono uppercase tracking-wider text-sage-300">
                  <Droplets className="w-3.5 h-3.5 text-sage-300" />
                  <span>Soil Geology & Steeping Guidance</span>
                </div>
                <p className="text-xs text-cream-soft/90 leading-relaxed mb-3">
                  <strong className="text-sage-300">Soil Geology:</strong>{' '}
                  {activeOrigin.soilType}
                </p>
                <p className="text-xs text-cream-soft/90 leading-relaxed mb-3">
                  <strong className="text-sage-300">Leaf Processing:</strong>{' '}
                  {activeOrigin.processing}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-cream-soft/80 flex items-center justify-between">
                <span>Steep Pairing:</span>
                <span className="font-bold text-sage-300">{activeOrigin.steepStyle || 'Gongfu & Kyusu Multiple Infusions'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
