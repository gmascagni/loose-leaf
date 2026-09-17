/**
 * LooseLeaf — Centralized Application Workflow Orchestrator
 * 
 * Provides a unified action bus and state coordinator to eliminate feature silos.
 * Enables seamless cross-feature orchestration (e.g. Scanner -> Studio -> Timer -> Cellar).
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { createTeaProfile } from '../models/teaProfile';
import { 
  downloadCompleteStickerPng, 
  downloadVectorQrSvg, 
  downloadHighResQrPng 
} from '../services/packagingAssetPipeline';

const AppOrchestratorContext = createContext(null);

export function AppOrchestratorProvider({ 
  children,
  onApplyRecipeToTimer,
  onSaveRecipeToJournal,
  onOpenScanner,
  onOpenPackagingStudio,
  onOpenWaterLab,
  onOpenRoasterInfo,
  onOpenJournal,
  navigate
}) {
  // Modal visibility states
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isRoasterPortalOpen, setIsRoasterPortalOpen] = useState(false);
  const [isRoasterInfoOpen, setIsRoasterInfoOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isWaterLabOpen, setIsWaterLabOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isRecipeBuilderOpen, setIsRecipeBuilderOpen] = useState(false);
  const [isVideoAcademyOpen, setIsVideoAcademyOpen] = useState(false);

  // Active cross-feature entities
  const [activeTea, setActiveTea] = useState(null);
  const [roasterPrefillBarcode, setRoasterPrefillBarcode] = useState('');
  const [roasterPrefillBean, setRoasterPrefillBean] = useState(null);

  // Notifications / Feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg, duration = 3000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  }, []);

  /**
   * Universal Action 1: Steep & Dial In
   * Loads extraction parameters (ratio, water temp, leaf grade) into the active timer
   */
  const steep = useCallback((rawTea) => {
    if (!rawTea) return;
    const tea = createTeaProfile(rawTea);
    setActiveTea(tea);

    if (onApplyRecipeToTimer) {
      onApplyRecipeToTimer(tea);
    }

    // Close any open inspection modals
    setIsScannerOpen(false);
    setIsRoasterPortalOpen(false);
    setIsRoasterInfoOpen(false);

    showToast(`Dialed in: ${tea.roaster || tea.purveyor} ${tea.teaName || tea.beanName} (1:${tea.extraction.ratio}, ${tea.extraction.tempF}°F)`);
  }, [onApplyRecipeToTimer, showToast]);

  /**
   * Universal Action 2: Package & Generate Smart Tin Sticker
   * Opens the Packaging Studio with full parameters prefilled, ready to download/print
   */
  const packageTea = useCallback((rawTea) => {
    if (!rawTea) return;
    const tea = createTeaProfile(rawTea);
    setActiveTea(tea);
    setRoasterPrefillBean(tea);
    setRoasterPrefillBarcode(tea.packaging.upc);

    // Close other modals and open Studio
    setIsScannerOpen(false);
    setIsRoasterInfoOpen(false);
    setIsRoasterPortalOpen(true);

    if (onOpenPackagingStudio) {
      onOpenPackagingStudio(tea);
    }
  }, [onOpenPackagingStudio]);

  /**
   * Universal Action 3: Log to Tea Cellar
   */
  const cellar = useCallback((rawTea) => {
    if (!rawTea) return;
    const tea = createTeaProfile(rawTea);

    if (onSaveRecipeToJournal) {
      onSaveRecipeToJournal(tea);
    }

    if (onOpenJournal) {
      onOpenJournal();
    } else {
      setIsJournalOpen(true);
    }

    showToast(`Logged ${tea.teaName || tea.beanName} to your Tea Cellar`);
  }, [onSaveRecipeToJournal, onOpenJournal, showToast]);

  /**
   * Universal Action 4: Water Lab Terroir Pairing
   */
  const water = useCallback((rawTea) => {
    if (rawTea) {
      const tea = createTeaProfile(rawTea);
      setActiveTea(tea);
    }
    setIsWaterLabOpen(true);
    if (onOpenWaterLab) {
      onOpenWaterLab(rawTea);
    }
  }, [onOpenWaterLab]);

  /**
   * Universal Action 5: Open Camera Scanner
   */
  const scan = useCallback(() => {
    setIsScannerOpen(true);
    if (onOpenScanner) {
      onOpenScanner();
    }
  }, [onOpenScanner]);

  /**
   * Universal Action 6: Open Purveyor Info / Register Garden
   */
  const openRoasterInfo = useCallback(() => {
    setIsRoasterInfoOpen(true);
    if (onOpenRoasterInfo) {
      onOpenRoasterInfo();
    }
  }, [onOpenRoasterInfo]);

  /**
   * Direct Asset Download Helpers
   */
  const downloadSticker = useCallback(async (rawTea) => {
    try {
      showToast('Rendering 300-DPI packaging sticker...');
      await downloadCompleteStickerPng(rawTea);
      showToast('Downloaded packaging sticker to Downloads!');
    } catch (err) {
      console.warn('Error downloading sticker:', err);
      showToast('Could not render sticker. Please try again.');
    }
  }, [showToast]);

  const downloadVector = useCallback(async (rawTea) => {
    try {
      await downloadVectorQrSvg(rawTea);
      showToast('Downloaded vector QR (SVG) to Downloads!');
    } catch (err) {
      console.warn('Error downloading vector:', err);
    }
  }, [showToast]);

  const downloadQr = useCallback(async (rawTea, width = 1200) => {
    try {
      await downloadHighResQrPng(rawTea, width);
      showToast(`Downloaded standalone QR (${width}px) to Downloads!`);
    } catch (err) {
      console.warn('Error downloading QR:', err);
    }
  }, [showToast]);

  const value = {
    // Modal states
    isScannerOpen,
    setIsScannerOpen,
    isRoasterPortalOpen,
    setIsRoasterPortalOpen,
    isRoasterInfoOpen,
    setIsRoasterInfoOpen,
    isJournalOpen,
    setIsJournalOpen,
    isWaterLabOpen,
    setIsWaterLabOpen,
    isSearchOpen,
    setIsSearchOpen,
    isCommunityOpen,
    setIsCommunityOpen,
    isRecipeBuilderOpen,
    setIsRecipeBuilderOpen,
    isVideoAcademyOpen,
    setIsVideoAcademyOpen,

    // Active entities
    activeTea,
    setActiveTea,
    roasterPrefillBarcode,
    setRoasterPrefillBarcode,
    roasterPrefillBean,
    setRoasterPrefillBean,

    // Feedback
    toastMessage,
    showToast,

    // Universal Action Matrix
    brew: steep,
    steep,
    package: packageTea,
    cellar,
    water,
    scan,
    openRoasterInfo,

    // Direct Packaging Downloads
    downloadSticker,
    downloadVector,
    downloadQr
  };

  return (
    <AppOrchestratorContext.Provider value={value}>
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-2xl bg-black/90 text-cream-light font-mono text-xs border border-sage-500/40 shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sage-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </AppOrchestratorContext.Provider>
  );
}

export function useAppOrchestrator() {
  const context = useContext(AppOrchestratorContext);
  if (!context) {
    throw new Error('useAppOrchestrator must be used within an AppOrchestratorProvider');
  }
  return context;
}
