import React from 'react';
import { Leaf, BookOpen, Search, User, MapPin, Newspaper, ScanLine, FlaskConical, Volume2, VolumeX, Store, Tv } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Header({ 
  onOpenJournal, 
  onOpenSearch, 
  onOpenProfile, 
  onOpenCommunity, 
  onOpenLocalTea, 
  onOpenAuth, 
  onOpenScanner, 
  onOpenWaterLab, 
  onOpenRoasterShowcase,
  isRoasterShowcaseView = false,
  onOpenVideoAcademy,
  onOpenNews,
  isMuted = false,
  onToggleMute,
  currentUser 
}) {
  return (
    <div className="px-4 lg:px-8 py-2.5 transition-colors duration-500 bg-[#07130B]/90 border-b border-sage-500/25">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand Title */}
        <div className="flex items-center space-x-3">
          <div className="p-1 rounded-2xl transition-all duration-500 flex items-center justify-center bg-emerald-500/15 border border-emerald-400/35 shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:border-emerald-400/60">
            <BrandLogo size={38} />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wider flex items-center gap-2">
              <span className="text-emerald-300 drop-shadow-[0_2px_12px_rgba(52,211,153,0.35)] font-extrabold tracking-wide">loose-leaf</span>
              <span className="whitespace-nowrap text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-200 border-emerald-400/40 font-bold shadow-sm">
                Master
              </span>
            </h1>
            <p className="text-[10px] text-emerald-300/80 font-mono tracking-wide">The Fine Loose-Leaf & Steeping Guide</p>
          </div>
        </div>

        {/* Center Tagline Badge */}
        <div className="hidden lg:flex items-center px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-medium text-emerald-200 gap-2 shadow-inner">
          <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="tracking-wide">Specialty Loose-Leaf Teas • Single-Origin Terroirs • Gongfu Steeping</span>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2 text-xs">

          {/* Find Local Tearooms Button */}
          {onOpenLocalTea && (
            <button
              onClick={onOpenLocalTea}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all btn-tactile-tea text-white"
              title="Find Local Tearooms & Specialty Tea Houses"
            >
              <Leaf className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Local Tearooms</span>
              <span className="text-[10px] bg-black/40 text-current px-1.5 py-0.5 rounded-full font-mono font-bold">📍</span>
            </button>
          )}

          {/* Global Audible / Mute Sound Toggle Button */}
          {onToggleMute && (
            <button
              type="button"
              onClick={onToggleMute}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl font-mono font-bold transition-all active:scale-95 shadow-md cursor-pointer border ${
                isMuted
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30'
                  : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
              }`}
              title={isMuted ? "Audible Sound: MUTED (Click to Turn Sound ON)" : "Audible Sound: ON (Click to Mute)"}
              aria-label="Toggle Audible Sound"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  <span className="font-mono text-xs">Audible: OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 animate-pulse" />
                  <span className="font-mono text-xs">Audible: ON</span>
                </>
              )}
            </button>
          )}

          {/* Global Multi-Index Search Overlay Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-white/[0.08] border transition-all active:scale-95 shadow-md text-stone-200 hover:text-sage-300 hover:border-sage-500/50 border-white/[0.12]"
              title="Open Global Search (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Master Tea Recipe Vault Trigger */}
          {onOpenCommunity && (
            <button
              onClick={onOpenCommunity}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono font-bold transition-all active:scale-95 shadow-md bg-emerald-950/50 border-sage-500/40 text-sage-300 hover:bg-emerald-900/60"
              title="Open Master Steeping Vault & Custom Studio"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Steeping Vault</span>
            </button>
          )}

          {/* Native Camera Barcode & QR Scanner Trigger */}
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono font-bold transition-all active:scale-95 shadow-md bg-emerald-950/50 border-sage-500/40 text-sage-300 hover:bg-emerald-900/60"
              title="Scan Tea Tin Barcode or QR Code with Device Camera"
            >
              <ScanLine className="w-4 h-4 text-amber-gold" />
              <span className="hidden lg:inline">Scan Tin</span>
            </button>
          )}

          {/* Tea Water Chemistry Lab Trigger */}
          {onOpenWaterLab && (
            <button
              onClick={onOpenWaterLab}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono font-bold transition-all active:scale-95 shadow-md bg-emerald-950/50 border-cyan-500/40 text-cyan-300 hover:bg-emerald-900/60"
              title="Open Tea Water Chemistry Lab & Mineral Recipes"
            >
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span className="hidden lg:inline">Water Lab</span>
            </button>
          )}

          {/* Tea Academy & Video Hub Trigger */}
          {onOpenVideoAcademy && (
            <button
              onClick={onOpenVideoAcademy}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono font-bold transition-all active:scale-95 shadow-md bg-emerald-950/50 border-red-500/40 text-red-300 hover:bg-emerald-900/60"
              title="Open Tea Academy & Video Masterclasses"
            >
              <Tv className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Academy</span>
            </button>
          )}

          {/* Specialty Tea Purveyors Showcase Trigger */}
          {onOpenRoasterShowcase && (
            <button
              onClick={onOpenRoasterShowcase}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono font-bold transition-all active:scale-95 shadow-md ${
                isRoasterShowcaseView
                  ? 'bg-amber-gold text-espresso-950 border-amber-gold shadow-amber-500/30 ring-2 ring-amber-gold/50'
                  : 'bg-emerald-950/50 border-sage-500/40 text-sage-300 hover:bg-emerald-900/60'
              }`}
              title={isRoasterShowcaseView ? "Viewing Tea Purveyors Showcase" : "View Specialty Tea Purveyors & Historic Tea Houses"}
            >
              <Store className={`w-4 h-4 ${isRoasterShowcaseView ? 'text-espresso-950' : 'text-amber-gold'}`} />
              <span className="hidden sm:inline">Tea Houses</span>
              {isRoasterShowcaseView && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
              )}
            </button>
          )}

          {/* Tea News Dispatch Trigger */}
          <button
            onClick={onOpenNews || (() => {
              window.dispatchEvent(new CustomEvent('open-world-news'));
              setTimeout(() => {
                const el = document.getElementById('world-news');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }, 60);
            })}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border font-mono font-bold transition-all active:scale-95 shadow-md bg-emerald-950/50 border-sage-500/40 text-sage-300 hover:bg-emerald-900/60"
            title="Jump to Tea News"
          >
            <Newspaper className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Tea News</span>
          </button>

          {/* Tasting Journal Trigger */}
          {onOpenJournal && (
            <button
              onClick={onOpenJournal}
              className="p-2.5 rounded-xl bg-white/[0.08] border transition-all active:scale-95 shadow-md text-stone-200 hover:text-sage-300 hover:border-sage-500/50 border-white/[0.12]"
              title="Open Steep Cellar & Tasting Journal"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}

          {/* User Profile Avatar / Sign In Trigger */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-white/[0.08] border border-white/[0.12] hover:border-sage-400/50 transition-all shadow-md group"
              title="Open Tea Master Profile Dashboard"
            >
              {currentUser.avatar && currentUser.avatar !== '/' ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-6 h-6 rounded-full object-cover border border-sage-400"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-sage-500/20 border border-sage-400 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-sage-300" />
                </div>
              )}
              <span className="font-mono text-[11px] font-bold text-cream-light group-hover:text-sage-300 transition-colors hidden lg:inline max-w-[90px] truncate">
                {currentUser.displayName}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-2 rounded-xl font-bold font-mono text-[11px] uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md active:scale-95 btn-tactile-tea text-white"
              title="Tea Master Profile & Backup"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
