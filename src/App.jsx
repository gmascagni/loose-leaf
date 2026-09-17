import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import MethodSelectorGrid from './components/MethodSelectorGrid';
import PrecisionCalculator from './components/PrecisionCalculator';
import HeroBanner from './components/HeroBanner';
import GrindVisualGuide from './components/GrindVisualGuide';
import MasterclassHub from './components/MasterclassHub';
import MultiPhaseTimer from './components/MultiPhaseTimer';
import KnowledgeBaseDrawer from './components/KnowledgeBaseDrawer';
import DiagnosticsDrawer from './components/DiagnosticsDrawer';
import BrewJournal from './components/BrewJournal';
import RecipeBuilderModal from './components/RecipeBuilderModal';
import UserProfileDashboard from './components/UserProfileDashboard';
import GlobalSearchModal from './components/GlobalSearchModal';
import AuthModal from './components/AuthModal';
import CommunityHubModal from './components/CommunityHubModal';
import LocalTeaFinderModal from './components/LocalTeaFinderModal';
import ShopDrawer from './components/ShopDrawer';
import WorldNewsSection from './components/WorldNewsSection';
import BarcodeScannerModal from './components/BarcodeScannerModal';
import WaterChemistryModal from './components/WaterChemistryModal';
import RoasterPortalModal from './components/RoasterPortalModal';
import RoasterInfoPage from './components/RoasterInfoPage';
import RoasterProfilePage from './components/RoasterProfilePage';
import TeaVideoAcademyModal from './components/TeaVideoAcademyModal';
import Footer from './components/Footer';
import { AppOrchestratorProvider } from './context/AppOrchestratorContext';
import { BREW_METHODS, TEA_METHODS } from './data/brewData';
import { initGA, trackEvent } from './utils/analytics';
import { getMethodJsonLd, updatePageSeo } from './utils/seo';
import { syncCloudTeaCatalog } from './data/roasterRegistry';
import { ChevronRight, ChevronLeft, Sparkles, Leaf } from 'lucide-react';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Pure Tea Application State
  const trackMode = 'tea';
  const [unitSystem, setUnitSystem] = useState('imperial'); // 'imperial' | 'metric'
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 | 2 | 3 | 4

  // User Accounts State (Persisted in localStorage)
  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem('looseleaf_local_users') || localStorage.getItem('the_brew_app_local_users');
      const list = saved ? JSON.parse(saved) : [];
      return list.filter((u) => u && u.username !== '@barista_pro' && u.email !== 'alex@specialtybrew.org');
    } catch {
      return [];
    }
  });

  // Currently Active Logged In User (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('looseleaf_active_user') || localStorage.getItem('the_brew_app_active_user');
      const user = saved ? JSON.parse(saved) : null;
      if (user && (user.username === '@barista_pro' || user.email === 'alex@specialtybrew.org')) {
        localStorage.removeItem('looseleaf_active_user');
        localStorage.removeItem('the_brew_app_active_user');
        return null;
      }
      return user;
    } catch {
      return null;
    }
  });

  // Sync usersList and currentUser to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('looseleaf_local_users', JSON.stringify(usersList));
    } catch (err) {
      console.warn('Unable to persist usersList to localStorage:', err);
    }
  }, [usersList]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('looseleaf_active_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('looseleaf_active_user');
      }
    } catch (err) {
      console.warn('Unable to persist currentUser to localStorage:', err);
    }
  }, [currentUser]);

  // Synchronize Cloud Firestore purveyor & tea registry in background
  useEffect(() => {
    syncCloudTeaCatalog().catch(() => {});
  }, []);

  // Platform Modal States
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isRecipeBuilderOpen, setIsRecipeBuilderOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocalTeaOpen, setIsLocalTeaOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isWaterLabOpen, setIsWaterLabOpen] = useState(false);
  const [isRoasterPortalOpen, setIsRoasterPortalOpen] = useState(false);
  const [isRoasterInfoOpen, setIsRoasterInfoOpen] = useState(false);
  const [roasterPrefillBarcode, setRoasterPrefillBarcode] = useState('');
  const [roasterPrefillBean, setRoasterPrefillBean] = useState(null);
  const [isRoasterShowcaseView, setIsRoasterShowcaseView] = useState(false);
  const [selectedRoasterSlug, setSelectedRoasterSlug] = useState('ippodo');
  const [isVideoAcademyOpen, setIsVideoAcademyOpen] = useState(false);
  const [selectedAcademyVideoId, setSelectedAcademyVideoId] = useState(null);
  const [dialedInTea, setDialedInTea] = useState(null);

  // Active Method & Scaling State
  const methods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
  const [activeMethod, setActiveMethod] = useState(methods[0]);
  const [cupCount, setCupCount] = useState(2);
  const [cupMl, setCupMl] = useState(240);
  const [customRatio, setCustomRatio] = useState(null);
  const [customWaterMl, setCustomWaterMl] = useState(null);

  // Masterclass & Split Screen State
  const [activeVideo, setActiveVideo] = useState(null);

  // Initialize Analytics on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initGA(window.GA_MEASUREMENT_ID || 'G-VT2YZ4KHHB');
    }
  }, []);

  // Handler for Steeping Along With Video Action
  const handleBrewWithVideo = (video) => {
    if (!video || !video.recipeSync) return;
    const { methodId, ratio } = video.recipeSync;
    const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
    const targetMethod = allMethods.find(m => m.id === methodId) || allMethods[0];
    setActiveMethod(targetMethod);
    if (ratio) {
      setCustomRatio(ratio);
    }
    setIsVideoAcademyOpen(false);
    setCurrentStep(4); // Advance straight to the active guided timer
    navigate(`/methods/${targetMethod.id}`);
    setTimeout(() => {
      const timerEl = document.getElementById('step-4') || document.querySelector('main');
      if (timerEl) timerEl.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    trackEvent('steep_with_video_applied', { video_id: video.id, method_id: targetMethod.id, ratio });
  };

  // Handler for Tea News navigation
  const handleOpenTeaNews = () => {
    if (isRoasterShowcaseView) {
      setIsRoasterShowcaseView(false);
      navigate('/');
    }
    window.dispatchEvent(new CustomEvent('open-world-news'));
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById('world-news');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 60);
      }
    };
    setTimeout(() => tryScroll(0), 60);
  };

  // Handler for Specialty Tea Purveyors Showcase Navigation
  const handleOpenRoasterShowcase = () => {
    if (isRoasterShowcaseView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsRoasterShowcaseView(true);
      navigate('/purveyors');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handlers for Scanned / Purveyor Dial-In Actions
  const handleApplyScannedRecipe = (scannedTea) => {
    if (!scannedTea) return;

    setIsRoasterShowcaseView(false);
    setIsScannerOpen(false);

    const ratio = Number(scannedTea.recommendedRatio || scannedTea.extraction?.ratio || 50);
    setCustomRatio(ratio);

    const waterAmount = Number(scannedTea.waterGrams || (scannedTea.dryDoseGrams ? Math.round(scannedTea.dryDoseGrams * ratio) : 240));
    setCustomWaterMl(waterAmount);
    setCupCount(1);
    setCupMl(waterAmount);

    const targetMethodId = scannedTea.brewMethod || scannedTea.extraction?.method || 'darjeeling_tea';
    const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
    const targetMethod = allMethods.find(m => m.id === targetMethodId || m.id.includes(targetMethodId) || targetMethodId.includes(m.id)) || allMethods[0];

    setActiveMethod(targetMethod);
    setDialedInTea(scannedTea);

    setCurrentStep(4);
    navigate(`/methods/${targetMethod.id}`);

    setTimeout(() => {
      const timerEl = document.getElementById('step-4') || document.querySelector('main');
      if (timerEl) timerEl.scrollIntoView({ behavior: 'smooth' });
    }, 150);

    trackEvent('dial_in_tea_applied', {
      purveyor: scannedTea.purveyor || scannedTea.roaster,
      tea: scannedTea.teaName || scannedTea.beanName,
      method: targetMethod.id,
      ratio
    });
  };

  const handleSaveScannedToJournal = (scannedTea) => {
    if (!scannedTea) return;
    try {
      const existing = JSON.parse(localStorage.getItem('the_brew_app_journal_v1') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        trackMode: 'tea',
        methodName: scannedTea.brewMethod ? scannedTea.brewMethod.replace(/_/g, ' ') : 'Specialty Tea',
        beanName: scannedTea.teaName || scannedTea.beanName,
        roaster: scannedTea.purveyor || scannedTea.roaster,
        doseStr: '4.5 g',
        waterStr: `${Math.round(4.5 * (scannedTea.recommendedRatio || 50))} mL`,
        ratioStr: `1 : ${scannedTea.recommendedRatio || 50}`,
        grindStr: scannedTea.recommendedGrind || 'Whole Leaf',
        tempStr: `${scannedTea.tempF || 190}°F`,
        rating: 5,
        isFavorite: true,
        tastingNotes: scannedTea.tastingNotes || [],
        notes: `${scannedTea.notes || ''} (Origin: ${scannedTea.origin || 'Single Garden'}, Elevation: ${scannedTea.elevation || 'High Mountain'})`
      };
      localStorage.setItem('the_brew_app_journal_v1', JSON.stringify([newEntry, ...existing]));
      setIsJournalOpen(true);
    } catch (err) {
      console.error('Error saving scanned tea to journal', err);
    }
  };

  // Synchronize React Router URL with Active Method and Steps
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/methods/') || path.startsWith('/tea/')) {
      setIsRoasterShowcaseView(false);
      const methodId = path.replace('/methods/', '').replace('/tea/', '').replace(/\/$/, '');
      const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
      const found = allMethods.find(m => m.id === methodId);

      if (found) {
        setActiveMethod(found);
        if (currentStep === 1) {
          setCurrentStep(2);
        }

        updatePageSeo(
          `How to Steep ${found.name} | loose-leaf`,
          found.description,
          `https://loose-leaf.thebrew.app/methods/${found.id}`
        );

        const jsonLdData = getMethodJsonLd(found);
        if (jsonLdData) {
          let script = document.getElementById('json-ld-structured-data');
          if (!script) {
            script = document.createElement('script');
            script.id = 'json-ld-structured-data';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
          }
          script.textContent = JSON.stringify(jsonLdData);
        }
      }
    } else if (path.startsWith('/guides/tea-water-chemistry') || path.startsWith('/guides/water-chemistry-gh-kh')) {
      setIsRoasterShowcaseView(false);
      setIsWaterLabOpen(true);
      updatePageSeo(
        'Tea Water Chemistry & Mineral Formulation Guide | loose-leaf',
        'Master specialty tea water chemistry: optimal GH/KH mineral balance for delicate greens, high mountain oolongs, and brisk black teas.',
        'https://loose-leaf.thebrew.app/guides/tea-water-chemistry'
      );
    } else if (path.startsWith('/purveyors') || path.startsWith('/roasters') || path.startsWith('/roaster')) {
      if (path.includes('partner') || path.includes('info')) {
        setIsRoasterInfoOpen(true);
      } else {
        setIsRoasterShowcaseView(true);
        const parts = path.split('/').filter(Boolean);
        if (parts.length > 1 && parts[1] !== 'showcase' && parts[1] !== 'partner' && parts[1] !== 'info') {
          setSelectedRoasterSlug(parts[1]);
        }
      }
      updatePageSeo(
        'Specialty Tea Purveyors & Historic Tea Houses | loose-leaf',
        'Explore verified specialty tea purveyors, historic gardens, and certified steeping parameters.',
        'https://loose-leaf.thebrew.app/purveyors'
      );
    } else if (path.startsWith('/academy') || path.startsWith('/videos')) {
      setIsVideoAcademyOpen(true);
      updatePageSeo(
        'Tea Academy & Video Masterclasses | loose-leaf',
        'Watch curated 4K specialty tea masterclasses, Gongfu Cha demonstrations, matcha whisking, and water chemistry with synchronized timers.',
        'https://loose-leaf.thebrew.app/academy'
      );
    } else if (path.includes('smart-tin-scanner') || path.includes('smart-bag-scanner') || path.startsWith('/demo') || path.startsWith('/scanner') || path.startsWith('/scan')) {
      setIsRoasterShowcaseView(false);
      setIsScannerOpen(true);
      updatePageSeo(
        'Smart Tea Tin Barcode & QR Scanner | loose-leaf',
        'Scan any specialty tea tin barcode or Smart Tin QR code to automatically dial in leaf-to-water ratio, temperature, and steeping countdown in seconds.',
        'https://loose-leaf.thebrew.app/demo/smart-tin-scanner'
      );
    } else if (path === '/' || path === '') {
      setIsRoasterShowcaseView(false);
      const searchParams = new URLSearchParams(location.search);
      const videoParam = searchParams.get('video');
      if (videoParam) {
        setSelectedAcademyVideoId(videoParam);
        setIsVideoAcademyOpen(true);
      }
      const purveyorParam = searchParams.get('purveyor') || searchParams.get('roaster');
      const teaParam = searchParams.get('tea') || searchParams.get('bean');
      const stepParam = searchParams.get('step');
      if (stepParam) {
        setCurrentStep(parseInt(stepParam));
      } else if (purveyorParam || teaParam) {
        const methodParam = searchParams.get('method');
        const ratioParam = parseFloat(searchParams.get('ratio'));
        const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
        const found = allMethods.find(m => m.id === methodParam) || allMethods[0];
        setActiveMethod(found);
        if (ratioParam) setCustomRatio(ratioParam);
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
      updatePageSeo(
        'loose-leaf — The Fine Tea & Steeping Guide',
        'Precision specialty loose leaf tea ratio scaler, multi-phase countdown timer, orthodox leaf grade visual guide, and botanical terroir compendium.',
        'https://loose-leaf.thebrew.app/'
      );

      const existingScript = document.getElementById('json-ld-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    }
  }, [location.pathname, location.search]);

  const handleSelectMethodFromGrid = (method) => {
    setActiveMethod(method);
    setCustomRatio(null);
    setCustomWaterMl(null);
    if (setActiveVideo) setActiveVideo(null);
    setCurrentStep(2);
    navigate(`/methods/${method.id}`);
    trackEvent('select_method', { method_id: method.id, method_name: method.name });
  };

  // Sync body theme class
  useEffect(() => {
    document.body.className = 'theme-tea';
  }, []);

  // Scroll to top smoothly when changing steps
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);
  
  // Guarantee active method belongs to current catalog
  const currentActiveMethod = (activeMethod && methods.some(m => m.id === activeMethod.id))
    ? activeMethod
    : (methods.length > 0 ? methods[0] : null);

  // Calculated Water Volume & Dose
  const effectiveRatio = customRatio !== null ? customRatio : (currentActiveMethod?.ratio || 50);
  const calculatedTotalWaterMl = customWaterMl !== null ? customWaterMl : (cupCount * cupMl);
  const dryDoseGrams = calculatedTotalWaterMl > 0 ? Math.round((calculatedTotalWaterMl / effectiveRatio) * 10) / 10 : 0;

  return (
    <AppOrchestratorProvider
      onApplyRecipeToTimer={handleApplyScannedRecipe}
      onSaveRecipeToJournal={handleSaveScannedToJournal}
      onOpenScanner={() => setIsScannerOpen(true)}
      onOpenPackagingStudio={(tea) => {
        if (tea?.packaging?.upc) setRoasterPrefillBarcode(tea.packaging.upc);
        if (tea) setRoasterPrefillBean(tea);
        setIsRoasterPortalOpen(true);
      }}
      onOpenWaterLab={() => setIsWaterLabOpen(true)}
      onOpenRoasterInfo={() => setIsRoasterInfoOpen(true)}
      onOpenJournal={() => setIsJournalOpen(true)}
      navigate={navigate}
    >
      <div className="min-h-screen font-sans flex flex-col transition-colors duration-700 relative bg-[#08110B] text-[#EBF7EE] selection:bg-sage-400 selection:text-[#07130B]">

      {/* High-Definition Steeping Method Background Image Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 md:opacity-40 transition-all duration-1000">
        <img
          key={currentActiveMethod?.heroImage || 'tea_background'}
          src={currentActiveMethod?.heroImage || '/tea_ceremony.jpg'}
          alt={currentActiveMethod?.name || 'Steeping Background'}
          className="w-full h-full object-cover object-center filter blur-[2px] scale-105 transform transition-transform duration-1000 brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08110B]/80 via-[#08110B]/55 to-[#08110B]/90" />
      </div>
      
      {/* Sticky Top Header Container */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl transition-all duration-700 border-b shadow-2xl bg-[#0B1710]/95 border-sage-500/40 shadow-[0_10px_30px_rgba(94,150,106,0.15)]">
        <Header
          trackMode={trackMode}
          onOpenJournal={() => setIsJournalOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenCommunity={() => setIsCommunityOpen(true)}
          onOpenLocalTea={() => setIsLocalTeaOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenWaterLab={() => setIsWaterLabOpen(true)}
          onOpenRoasterPortal={() => { setRoasterPrefillBarcode(''); setRoasterPrefillBean(null); setIsRoasterPortalOpen(true); }}
          onOpenRoasterInfo={() => setIsRoasterInfoOpen(true)}
          onOpenRoasterShowcase={handleOpenRoasterShowcase}
          isRoasterShowcaseView={isRoasterShowcaseView}
          onOpenVideoAcademy={() => setIsVideoAcademyOpen(true)}
          onOpenNews={handleOpenTeaNews}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          currentUser={currentUser}
        />
        
        {/* Step Progress Bar Pinned Inside Sticky Top Bar (hidden in Purveyors Showcase) */}
        {!isRoasterShowcaseView && (
          <StepIndicator
            currentStep={currentStep}
            setCurrentStep={(stepNum) => {
              setCurrentStep(stepNum);
              if (stepNum === 1) {
                navigate('/');
              } else if (currentActiveMethod) {
                navigate(`/methods/${currentActiveMethod.id}`);
              }
            }}
            trackMode={trackMode}
          />
        )}
      </header>

      {/* Main Workspace Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">

        <main className="mt-4 space-y-10">

          {isRoasterShowcaseView ? (
            <RoasterProfilePage
              initialRoasterId={selectedRoasterSlug}
              onBackToApp={() => {
                setIsRoasterShowcaseView(false);
                navigate('/');
              }}
              onBrewTea={(tea) => {
                setIsRoasterShowcaseView(false);
                handleApplyScannedRecipe(tea);
              }}
              onBrew={(tea) => {
                setIsRoasterShowcaseView(false);
                handleApplyScannedRecipe(tea);
              }}
              onOpenWaterLabWithProfile={() => {
                setIsWaterLabOpen(true);
              }}
              onOpenRoasterPortalWithBean={(tea) => {
                setRoasterPrefillBean(tea);
                setIsRoasterPortalOpen(true);
              }}
              onOpenRoasterInfo={() => {
                setIsRoasterInfoOpen(true);
              }}
            />
          ) : (
            <>
              {/* STEP 01: METHOD SELECTOR */}
              {currentStep === 1 && (
            <MethodSelectorGrid
              trackMode={trackMode}
              methods={methods}
              activeMethod={currentActiveMethod}
              setActiveMethod={handleSelectMethodFromGrid}
              onNextStep={() => {
                setCurrentStep(2);
                if (currentActiveMethod) {
                  navigate(`/methods/${currentActiveMethod.id}`);
                }
              }}
              unitSystem={unitSystem}
            />
          )}

          {/* STEP 02: PRECISION RATIO CALCULATOR & SCALER */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-8">
              <PrecisionCalculator
                trackMode={trackMode}
                methods={methods}
                activeMethod={currentActiveMethod}
                setActiveMethod={(m) => {
                  setActiveMethod(m);
                  navigate(`/methods/${m.id}`);
                }}
                cupCount={cupCount}
                setCupCount={setCupCount}
                cupMl={cupMl}
                setCupMl={setCupMl}
                customRatio={customRatio}
                setCustomRatio={setCustomRatio}
                customWaterMl={customWaterMl}
                setCustomWaterMl={setCustomWaterMl}
                unitSystem={unitSystem}
                setUnitSystem={setUnitSystem}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                onNextStep={() => setCurrentStep(3)}
                onPrevStep={() => {
                  setCurrentStep(1);
                  navigate('/');
                }}
              />
            </div>
          )}

          {/* STEP 03: METHOD SPECIFICATIONS & HERO */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-8">
              <HeroBanner
                trackMode={trackMode}
                activeMethod={currentActiveMethod}
                unitSystem={unitSystem}
              />

              <GrindVisualGuide activeMethod={currentActiveMethod} />

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-6 rounded-2xl bg-white/10 text-cream-light font-extrabold text-xs flex items-center gap-2 hover:bg-white/20 transition-all border border-white/15"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Step 02: Ratio & Scaler</span>
                </button>

                <button
                  onClick={() => setCurrentStep(4)}
                  className="py-3.5 px-8 rounded-2xl font-extrabold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all btn-tactile-tea text-white"
                >
                  <span>Step 04: Guided Steeping Timer</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 04: GUIDED STEEPING TIMER */}
          {currentStep === 4 && (
            <div id="step-4" className="animate-fade-in space-y-6">
              {dialedInTea && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-sage-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-sage-300 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Purveyor Certified Dial-In Active</span>
                      </div>
                      <div className="text-sm sm:text-base font-serif font-bold text-cream-light">
                        {dialedInTea.purveyor || dialedInTea.roaster} • {dialedInTea.teaName || dialedInTea.beanName}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-cream-soft bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 self-start sm:self-auto">
                    <span>1:{effectiveRatio}</span>
                    <span>•</span>
                    <span>{dryDoseGrams}g : {calculatedTotalWaterMl}g</span>
                    {(dialedInTea.tempF || dialedInTea.extraction?.tempF) && (
                      <>
                        <span>•</span>
                        <span className="text-sage-300 font-bold">
                          {dialedInTea.tempF || dialedInTea.extraction?.tempF}°F
                        </span>
                      </>
                    )}
                    {(dialedInTea.recommendedGrind || dialedInTea.extraction?.grind) && (
                      <>
                        <span>•</span>
                        <span className="text-cream-light font-bold">
                          {dialedInTea.recommendedGrind || dialedInTea.extraction?.grind}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <MultiPhaseTimer
                trackMode={trackMode}
                activeMethod={currentActiveMethod}
                dryDoseGrams={dryDoseGrams}
                unitSystem={unitSystem}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                onPrevStep={() => setCurrentStep(3)}
                onOpenJournal={() => setIsJournalOpen(true)}
              />
            </div>
          )}

          {/* Collapsible Video Masterclasses Drawer */}
          <MasterclassHub
            trackMode={trackMode}
            activeMethod={currentActiveMethod}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />

          {/* Collapsible Diagnostics & Water Chemistry Drawer */}
          <DiagnosticsDrawer trackMode={trackMode} />

          {/* Collapsible Knowledge Base & Terroir Atlas Drawer */}
          <KnowledgeBaseDrawer trackMode={trackMode} />

          {/* Collapsible Equipment & Gear Store Drawer */}
          <ShopDrawer trackMode={trackMode} activeMethod={currentActiveMethod} />

          {/* Tea News Dispatch Section */}
          <WorldNewsSection trackMode={trackMode} />
        </>
      )}

          {/* Tasting Journal Modal */}
          <BrewJournal
            isOpen={isJournalOpen}
            onClose={() => setIsJournalOpen(false)}
            trackMode={trackMode}
            activeMethod={currentActiveMethod}
            cupCount={cupCount}
            cupMl={cupMl}
            customRatio={customRatio}
            unitSystem={unitSystem}
            onOpenScanner={() => setIsScannerOpen(true)}
          />

          {/* Multi-Index Global Search Modal */}
          <GlobalSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectMethod={(method) => {
              handleSelectMethodFromGrid(method);
            }}
            onSelectRecipe={(recipe) => {
              const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
              const match = allMethods.find(m => m.id === recipe.methodId);
              if (match) {
                handleSelectMethodFromGrid(match);
              }
              if (recipe.ratio) setCustomRatio(recipe.ratio);
              setCurrentStep(2);
              setIsSearchOpen(false);
            }}
            onSelectOrigin={() => {
              setCurrentStep(3);
              setIsSearchOpen(false);
              setTimeout(() => {
                const el = document.getElementById('step-3');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />

          {/* Community Hub Modal */}
          <CommunityHubModal
            isOpen={isCommunityOpen}
            onClose={() => setIsCommunityOpen(false)}
            trackMode={trackMode}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenRecipeBuilder={() => setIsRecipeBuilderOpen(true)}
            onSelectRecipe={(recipe) => {
              const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;
              const match = allMethods.find(m => m.id === recipe.methodId);
              if (match) {
                handleSelectMethodFromGrid(match);
              }
              if (recipe.ratio) setCustomRatio(recipe.ratio);
              setIsCommunityOpen(false);
            }}
          />

          {/* Steeper User Profile Modal */}
          <UserProfileDashboard
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            trackMode={trackMode}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={() => setCurrentUser(null)}
          />

          {/* Recipe Builder Modal */}
          <RecipeBuilderModal
            isOpen={isRecipeBuilderOpen}
            onClose={() => setIsRecipeBuilderOpen(false)}
            trackMode={trackMode}
          />

          {/* Sign In / Auth Modal */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            currentUser={currentUser}
            usersList={usersList}
            onSaveProfile={(updatedUser) => {
              setCurrentUser(updatedUser);
              setUsersList([updatedUser, ...usersList.filter((u) => u.username !== updatedUser.username)]);
            }}
            onLogout={() => setCurrentUser(null)}
          />

          {/* Specialty Tea Room Finder Modal */}
          <LocalTeaFinderModal
            isOpen={isLocalTeaOpen}
            onClose={() => setIsLocalTeaOpen(false)}
            trackMode={trackMode}
          />

          {/* Native Camera Barcode & QR Scanner Modal */}
          <BarcodeScannerModal
            isOpen={isScannerOpen}
            onClose={() => {
              setIsScannerOpen(false);
              if (location.pathname.includes('smart-tin-scanner') || location.pathname.includes('smart-bag-scanner') || location.pathname.startsWith('/demo') || location.pathname.startsWith('/scanner') || location.pathname.startsWith('/scan')) {
                navigate('/', { replace: true });
              }
            }}
            onApplyRecipe={handleApplyScannedRecipe}
            onSaveToJournal={handleSaveScannedToJournal}
            onOpenRoasterPortal={(code, bean) => {
              setRoasterPrefillBarcode(typeof code === 'string' ? code : '');
              setRoasterPrefillBean(bean || null);
              setIsRoasterPortalOpen(true);
            }}
            onOpenRoasterInfo={() => setIsRoasterInfoOpen(true)}
          />

          {/* Specialty Tea Purveyor Partner Information & Contact HQ Page */}
          <RoasterInfoPage
            isOpen={isRoasterInfoOpen}
            onClose={() => setIsRoasterInfoOpen(false)}
            onOpenStudio={() => {
              setIsRoasterInfoOpen(false);
              setIsRoasterPortalOpen(true);
            }}
          />

          {/* Specialty Tea Purveyor Portal & Smart Tin Packaging Studio Modal */}
          <RoasterPortalModal
            isOpen={isRoasterPortalOpen}
            onClose={() => {
              setIsRoasterPortalOpen(false);
              setRoasterPrefillBarcode('');
              setRoasterPrefillBean(null);
            }}
            prefilledBarcode={roasterPrefillBarcode}
            prefilledBean={roasterPrefillBean}
            onSelectBeanToBrew={handleApplyScannedRecipe}
          />

          {/* Tea Water Chemistry Lab Modal */}
          <WaterChemistryModal
            isOpen={isWaterLabOpen}
            onClose={() => setIsWaterLabOpen(false)}
          />

          {/* YouTube-Powered Tea Video Academy & Masterclass Hub */}
          <TeaVideoAcademyModal
            isOpen={isVideoAcademyOpen}
            onClose={() => {
              setIsVideoAcademyOpen(false);
              setSelectedAcademyVideoId(null);
            }}
            onBrewWithVideo={handleBrewWithVideo}
            initialVideoId={selectedAcademyVideoId}
          />

        </main>

        {/* Contact HQ Email & App Footer */}
        <Footer
          trackMode={trackMode}
          onOpenRoasterInfo={() => setIsRoasterInfoOpen(true)}
          onOpenRoasterShowcase={handleOpenRoasterShowcase}
          onOpenVideoAcademy={() => setIsVideoAcademyOpen(true)}
        />

      </div>
    </div>
    </AppOrchestratorProvider>
  );
}
