import React, { useState } from 'react';
import { Leaf, Gauge, AlertCircle, ChevronRight, CheckCircle2, Droplets, Sparkles } from 'lucide-react';
import { TROUBLESHOOTING_GUIDE } from '../data/brewData';

export default function TroubleshootingHub() {
  const guides = TROUBLESHOOTING_GUIDE.tea || (Array.isArray(TROUBLESHOOTING_GUIDE) ? TROUBLESHOOTING_GUIDE : []);
  const [selectedSymptomId, setSelectedSymptomId] = useState(guides[0]?.id || 'bitter');

  const selectedGuide = guides.find((g) => g.id === selectedSymptomId) || guides[0];

  const TEA_LEAF_MATRIX = [
    { level: 'Himalayan Darjeeling', temp: '88°C (190°F)', idealFor: 'Darjeeling First & Second Flush', visual: 'FTGFOP1 Whole Leaf Muscatel' },
    { level: 'Masala Chai Spices', temp: '98°C (208°F)', idealFor: 'Assam CTC & Whole Spices', visual: 'Cracked Spices & Black Leaf' },
    { level: 'Imperial English Breakfast', temp: '96°C (205°F)', idealFor: 'Assam, Ceylon & Kenyan Blend', visual: 'Orthodox Broken Orange Pekoe' },
    { level: 'Shizuoka Sencha Green Tea', temp: '78°C (172°F)', idealFor: 'Japanese Sencha & Longjing', visual: 'Steamed / Pan-Fired Green Leaf' },
    { level: 'Ceremonial Stone-Ground Matcha', temp: '75°C (167°F)', idealFor: 'Uji Stone-Ground Usucha', visual: 'Micro-Milled Tencha Jade Powder' },
    { level: 'Anxi Tieguanyin Oolong', temp: '93°C (200°F)', idealFor: 'Tieguanyin & Da Hong Pao Oolong', visual: 'Tightly Rolled Tea Pearls' },
    { level: 'Nuwara Eliya Ceylon', temp: '94°C (202°F)', idealFor: 'High-Grown Nuwara Eliya & Dimbula', visual: 'Wire Leaf Orange Pekoe' },
    { level: 'Fuding Silver Needle White Tea', temp: '83°C (182°F)', idealFor: 'Silver Needle & White Peony', visual: 'Unoxidized Downy Silver Buds' },
    { level: 'Turmeric Ginger Tonic', temp: '100°C (212°F)', idealFor: 'Golden Root & Ginger Infusion', visual: 'Crushed Golden Rhizome Botanicals' },
    { level: 'Aged Menghai Shou Pu-erh', temp: '100°C (212°F)', idealFor: 'Ripe & Raw Fermented Pu-erh Cakes', visual: 'Fermented Compressed Whole Leaf' }
  ];

  return (
    <section className="mt-12 p-7 md:p-9 rounded-3xl glass-panel-tea border-sage-500/40 shadow-2xl transition-all duration-500 relative">
      
      {/* Section Header */}
      <div className="mb-8 pb-4 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest mb-1.5 text-sage-300">
          <Leaf className="w-4 h-4" />
          <span>Tea Steeping Diagnostics</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-light drop-shadow-md">
          Fine Tea Steeping Diagnostics & Leaf Variable Control
        </h3>
        <p className="text-xs md:text-sm text-cream-soft/70 mt-1">
          Identify tea steeping defects (astringency, scalded leaves, weak infusion) and calibrate leaf grade, water temperature, and steep duration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Interactive Symptom Resolver */}
        <div>
          <h4 className="text-sm uppercase tracking-wider font-extrabold text-cream-light mb-4 flex items-center gap-2 drop-shadow">
            <AlertCircle className="w-4 h-4 text-sage-300" />
            <span>Interactive Tea Taste Diagnostics:</span>
          </h4>

          {/* Symptom Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {guides.map((guide) => {
              const isSelected = guide.id === selectedSymptomId;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedSymptomId(guide.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'btn-tactile-tea text-white font-extrabold scale-105'
                      : 'bg-white/5 border-white/10 text-cream-soft/80 hover:bg-white/10 hover:text-cream-light'
                  }`}
                >
                  {guide.symptom}
                </button>
              );
            })}
          </div>

          {/* Detailed Diagnosis Card */}
          {selectedGuide && (
            <div className="p-6 rounded-2xl bg-black/40 border border-sage-500/40 space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-sage-300 font-bold block mb-1">
                  Root Extraction Cause:
                </span>
                <p className="text-sm font-bold text-cream-light">
                  {selectedGuide.cause}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cream-soft/60 font-bold block mb-3">
                  Dial-In Remedies (Apply Sequentially):
                </span>
                <ul className="space-y-2.5">
                  {selectedGuide.remedies.map((remedy, idx) => (
                    <li key={idx} className="text-xs text-cream-soft/90 flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Reference Matrix */}
        <div>
          <h4 className="text-sm uppercase tracking-wider font-extrabold text-cream-light mb-4 flex items-center gap-2 drop-shadow">
            <Gauge className="w-4 h-4 text-sage-300" />
            <span>Fine Tea Leaf Grade & Water Temp Matrix</span>
          </h4>

          <div className="space-y-3">
            {TEA_LEAF_MATRIX.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-sage-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-serif font-extrabold text-cream-light">{item.level}</span>
                    <span className="text-[10px] font-mono font-bold text-sage-300 bg-sage-500/20 px-2 py-0.5 rounded-md border border-sage-500/30">
                      {item.temp}
                    </span>
                  </div>
                  <div className="text-[11px] text-cream-soft/70 mt-1 font-medium">
                    Ideal For: <strong className="text-cream-light">{item.idealFor}</strong> • {item.visual}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
