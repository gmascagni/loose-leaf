import React from 'react';
import { Leaf, Scale, Gauge, Timer, CheckCircle2 } from 'lucide-react';

export default function StepIndicator({ currentStep, setCurrentStep }) {
  const STEPS = [
    { id: 1, title: 'Choose Variety', subtitle: '11 Teas & Infusions', icon: Leaf },
    { id: 2, title: 'Ratio & Scaler', subtitle: 'Grams & Volume', icon: Scale },
    { id: 3, title: 'Leaf Grade', subtitle: 'Cut & Temperature', icon: Gauge },
    { id: 4, title: 'Guided Steep', subtitle: 'Multi-Infusion Timer', icon: Timer }
  ];

  return (
    <nav className="w-full py-2 px-2 sm:px-4 lg:px-8 transition-colors duration-500 border-t bg-[#07130B]/95 border-sage-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative gap-1 sm:gap-3">
        
        {/* Background Connecting Timeline Line */}
        <div className="absolute top-1/2 left-6 right-6 h-[1.5px] bg-white/10 -translate-y-1/2 z-0 hidden md:block" />

        {STEPS.map((step) => {
          const StepIcon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="relative z-10 flex-1 flex justify-center min-w-0">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`w-full group flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'btn-tactile-tea text-white font-extrabold shadow-[0_0_20px_rgba(81,158,100,0.5)] scale-[1.02] border-sage-300'
                    : isCompleted
                    ? 'bg-[#0E1A11]/90 border-sage-500/40 text-sage-300 hover:bg-[#142418]'
                    : 'bg-[#12100E]/80 border-white/15 text-stone-300 hover:text-cream-light hover:bg-white/[0.08] hover:border-white/25'
                }`}
              >
                {/* Node Icon Circle */}
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-black/30 text-current font-bold'
                    : isCompleted
                    ? 'bg-sage-500/20 text-sage-300 border border-sage-500/40'
                    : 'bg-white/10 text-stone-400 group-hover:text-cream-light'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <StepIcon className="w-3 h-3" />}
                </div>

                {/* Step Metadata & Title */}
                <div className="text-left min-w-0">
                  <div className={`text-[10px] sm:text-xs font-bold tracking-wide truncate ${
                    isActive ? 'text-white drop-shadow' : isCompleted ? 'text-sage-200' : 'text-stone-300'
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-[9px] font-mono hidden sm:block truncate ${
                    isActive ? 'text-white/80' : isCompleted ? 'text-sage-400' : 'text-stone-500'
                  }`}>
                    {step.subtitle}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
