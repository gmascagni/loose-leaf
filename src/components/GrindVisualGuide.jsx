import React, { useState, useEffect } from 'react';
import { Gauge, Sparkles, Eye, X, Leaf } from 'lucide-react';
import { GRIND_VISUAL_GUIDE } from '../data/brewData';

export default function GrindVisualGuide({ activeMethod }) {
  const [selectedGrindId, setSelectedGrindId] = useState('whole_leaf');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Automatically sync preselected leaf grade when activeMethod changes
  useEffect(() => {
    if (!activeMethod) return;
    const methodId = activeMethod.id;
    if (methodId === 'matcha_tea') setSelectedGrindId('matcha_powder');
    else if (methodId === 'chai_masala') setSelectedGrindId('ctc_granular');
    else if (methodId === 'english_breakfast' || methodId === 'ceylon_tea' || methodId === 'earl_grey') setSelectedGrindId('broken_leaf');
    else if (methodId === 'oolong_tea') setSelectedGrindId('rolled_pearl');
    else if (methodId === 'darjeeling_tea' || methodId === 'white_tea' || methodId === 'green_tea') setSelectedGrindId('whole_leaf');
    else if (methodId === 'turmeric_tea') setSelectedGrindId('fannings_dust');
  }, [activeMethod]);

  const activeGrind = GRIND_VISUAL_GUIDE.find((g) => g.id === selectedGrindId) || GRIND_VISUAL_GUIDE[0];

  const handleOpenPhotoBubble = (grindItem, e) => {
    e.stopPropagation();
    setSelectedGrindId(grindItem.id);
    setIsModalOpen(true);
  };

  return (
    <section className="mt-10 p-7 md:p-9 rounded-3xl glass-panel shadow-2xl transition-all duration-500 relative border border-sage-500/30">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest text-sage-300 mb-1.5">
            <Gauge className="w-4 h-4 animate-pulse" />
            <span>Tea Leaf Grade & Cut Visual Reference Guide</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-light drop-shadow-md">
            Orthodox Leaf Grades & Botanical Textures
          </h3>
          <p className="text-xs md:text-sm text-cream-soft/70 mt-1">
            Preselected for {activeMethod?.name || 'Your Variety'} • Click any leaf grade to inspect high-definition macro textures
          </p>
        </div>

        <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-sage-500/20 text-sage-300 border border-sage-500/40 shadow-inner">
          Auto-Matched: {activeGrind.name}
        </span>
      </div>

      {/* Leaf Grade Settings Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {GRIND_VISUAL_GUIDE.map((item) => {
          const isSelected = item.id === activeGrind.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedGrindId(item.id)}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 shadow-xl cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'btn-tactile-tea text-white scale-105 font-extrabold ring-2 ring-sage-400'
                  : 'bg-[#0E1A11]/80 border-white/10 text-cream-soft hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="text-xs font-extrabold tracking-wide drop-shadow mb-1">{item.name}</div>
                <div className="text-[11px] font-mono font-bold text-sage-300 mb-1">{item.micron}</div>
                <div className={`text-[10px] truncate mb-3 ${isSelected ? 'opacity-90 font-semibold' : 'text-cream-soft/60'}`}>
                  {item.textureComparison.split('/')[0]}
                </div>
              </div>

              <button
                onClick={(e) => handleOpenPhotoBubble(item, e)}
                className={`mt-2 py-1.5 px-2 rounded-xl text-[10px] font-extrabold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                  isSelected
                    ? 'bg-black/40 text-white hover:bg-black/60'
                    : 'bg-sage-500/20 text-sage-300 hover:bg-sage-500 hover:text-white border border-sage-500/30'
                }`}
                title={`Inspect photo for ${item.name}`}
              >
                <Eye className="w-3 h-3" />
                <span>Inspect</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Preselected Leaf Details Card */}
      <div className="p-6 rounded-3xl bg-[#09150D]/90 border border-white/15 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-3">
            <h4 className="font-serif text-xl font-bold text-cream-light">
              {activeGrind.name} ({activeGrind.micron})
            </h4>
            <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-sage-500/20 text-sage-300 border border-sage-500/30">
              {activeGrind.textureComparison}
            </span>
          </div>
          <p className="text-xs text-cream-soft/90 font-medium leading-relaxed">
            {activeGrind.burrSettingTip}
          </p>
          <div className="text-xs text-stone-400 font-medium">
            <strong className="text-sage-300">Infusion Dynamics:</strong> {activeGrind.sensoryImpact}
          </div>
        </div>

        <button
          onClick={(e) => handleOpenPhotoBubble(activeGrind, e)}
          className="py-3 px-6 rounded-2xl btn-tactile-tea text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap flex-shrink-0"
        >
          <Eye className="w-4 h-4" />
          <span>View Macro Texture</span>
        </button>
      </div>

      {/* High-Res Photo Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full rounded-3xl bg-[#0B150F] border border-sage-500/50 p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-cream-light hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-sage-300">Macro Botanical Inspection</span>
              <h4 className="font-serif text-2xl font-bold text-cream-light mt-1">{activeGrind.name}</h4>
              <p className="text-xs text-stone-400">{activeGrind.visualDensity} • {activeGrind.micron}</p>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-inner">
              <img
                src={activeGrind.image || '/tea_ceremony.jpg'}
                alt={activeGrind.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              {activeGrind.burrSettingTip}
            </p>

            <div className="text-xs p-3 rounded-xl bg-black/40 border border-white/10 text-sage-200">
              <strong>Sensory Profile:</strong> {activeGrind.sensoryImpact}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
