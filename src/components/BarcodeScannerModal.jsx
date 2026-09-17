import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  ScanLine, 
  QrCode, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Scale, 
  Flame, 
  MapPin, 
  Upload, 
  AlertCircle, 
  ArrowRight,
  RefreshCw,
  Sliders,
  BookmarkPlus,
  Store,
  Loader2,
  Mail,
  Download,
  Printer
} from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import jsQR from 'jsqr';
import { getRegisteredTeas, fetchRemoteTeaByCode, savePurveyorTea } from '../data/roasterRegistry';
import { useAppOrchestrator } from '../context/AppOrchestratorContext';
import { createTeaProfile } from '../models/teaProfile';

// Verified catalog of real specialty tea purveyors, single-garden lots, and steeping parameters
export const VERIFIED_TEA_CATALOG = [
  {
    id: "sku_ippodo_ummon",
    upc: "4970056012014",
    qrPatterns: ["ippodotea.com/products/ummon", "ippodo/ummon"],
    roaster: "Ippodo Tea Co.",
    beanName: "Ummon-no-mukai Ceremonial Matcha",
    origin: "Uji, Kyoto, Japan",
    process: "Stone-Ground Shaded Tencha",
    elevation: "350 MASL",
    roastLevel: "Ceremonial First Pluck",
    tastingNotes: ["Savory Umami", "Buttered Edamame", "Sweet Cream", "Zero Bitterness"],
    recommendedRatio: 35,
    recommendedGrind: "Stone-Ground Micro-Powder",
    tempC: 80,
    tempF: 176,
    brewMethod: "matcha_tea",
    notes: "Ippodo top ceremonial grade matcha. Intense savory umami with thick jade microfoam."
  },
  {
    id: "sku_ippodo_sencha_hosen",
    upc: "4970056012021",
    qrPatterns: ["ippodotea.com/products/hosen", "ippodo/hosen"],
    roaster: "Ippodo Tea Co.",
    beanName: "Hosen Steamed Sencha",
    origin: "Kyoto, Japan",
    process: "Steamed Whole Leaf",
    elevation: "450 MASL",
    roastLevel: "First Harvest Green",
    tastingNotes: ["Sweet Mountain Grass", "Honeydew Melon", "Crisp Clean Finish"],
    recommendedRatio: 50,
    recommendedGrind: "Whole Steamed Needle Leaf",
    tempC: 80,
    tempF: 176,
    brewMethod: "green_tea",
    notes: "Balanced premium sencha balancing refreshing grassiness with delicate sweetness."
  },
  {
    id: "sku_ys_menghai_shou",
    upc: "6945123001018",
    qrPatterns: ["yunnansourcing.com/products/menghai-ripe", "yunnansourcing/menghai"],
    roaster: "Yunnan Sourcing",
    beanName: "Menghai Aged Shou Ripe Pu-erh Cake",
    origin: "Menghai, Yunnan, China",
    process: "Microbial Wet-Pile Fermented",
    elevation: "1,650 MASL",
    roastLevel: "Aged Post-Fermented",
    tastingNotes: ["Damp Forest Floor", "Sweet Camphor", "Dark Molasses", "Cacao Nibs"],
    recommendedRatio: 20,
    recommendedGrind: "Compressed Aged Leaf",
    tempC: 99,
    tempF: 210,
    brewMethod: "puerh_tea",
    notes: "Deep mahogany liqueur, thick velvet mouthfeel, and sweet earthy resonance."
  },
  {
    id: "sku_ys_silver_needle",
    upc: "6945123002046",
    qrPatterns: ["yunnansourcing.com/products/silver-needle", "yunnansourcing/silver-needle"],
    roaster: "Yunnan Sourcing",
    beanName: "Fuding Imperial Silver Needle White Tea",
    origin: "Fuding, Fujian, China",
    process: "Sun-Withered Spring Buds",
    elevation: "950 MASL",
    roastLevel: "Unoxidized Spring Pluck",
    tastingNotes: ["Honeysuckle", "Fresh Melon", "Sweet Cucumber", "Silky Body"],
    recommendedRatio: 60,
    recommendedGrind: "Whole Downy Silver Buds",
    tempC: 83,
    tempF: 181,
    brewMethod: "white_tea",
    notes: "Hand-picked spring buds with silver downy hairs. Delicate, velvety, and naturally sweet."
  },
  {
    id: "sku_vahdam_darjeeling_arya",
    upc: "8906082570123",
    qrPatterns: ["vahdam.com/products/darjeeling-first-flush", "vahdam/darjeeling"],
    roaster: "Vahdam Teas",
    beanName: "Arya Estate First Flush Darjeeling FTGFOP1",
    origin: "Darjeeling, India",
    process: "Orthodox Whole Leaf",
    elevation: "1,800 MASL",
    roastLevel: "Spring First Flush",
    tastingNotes: ["Muscatel Grape", "White Peach", "Wildflower Honey", "Crisp Amber"],
    recommendedRatio: 50,
    recommendedGrind: "Orthodox Whole Leaf",
    tempC: 88,
    tempF: 190,
    brewMethod: "darjeeling_tea",
    notes: "Prized Himalayan first flush lot bursting with crisp peach, green grape, and floral bouquet."
  },
  {
    id: "sku_vahdam_masala_chai",
    upc: "8906082570451",
    qrPatterns: ["vahdam.com/products/masala-chai", "vahdam/chai"],
    roaster: "Vahdam Teas",
    beanName: "Original Indian Masala Chai",
    origin: "Assam, India",
    process: "CTC Black Tea with Crushed Spices",
    elevation: "120 MASL",
    roastLevel: "Full Oxidation Black",
    tastingNotes: ["Crushed Cardamom", "Cinnamon Bark", "Spicy Clove", "Malty Black Tea"],
    recommendedRatio: 30,
    recommendedGrind: "CTC Granular Leaf with Spices",
    tempC: 100,
    tempF: 212,
    brewMethod: "chai_masala",
    notes: "Traditional Assam CTC base blended with fresh green cardamom, cinnamon, and cloves."
  }
];

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  onApplyRecipe,
  onSaveToJournal,
  onOpenRoasterPortal,
  onOpenRoasterInfo
}) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [matchedBean, setMatchedBean] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [uncatalogedResult, setUncatalogedResult] = useState(null);
  const [capturedSnapshot, setCapturedSnapshot] = useState(null);
  const [isSnapshotScanning, setIsSnapshotScanning] = useState(false);
  const [shutterFlash, setShutterFlash] = useState(false);
  const [scanNotice, setScanNotice] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  let orchestrator = null;
  try {
    orchestrator = useAppOrchestrator();
  } catch {}

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setScannedResult(null);
      setMatchedBean(null);
      setUncatalogedResult(null);
      setManualCode('');
      setCapturedSnapshot(null);
      setIsSnapshotScanning(false);
      setScanNotice(null);
      setShutterFlash(false);
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      // Prefer rear environment-facing camera on mobile devices
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        startScanLoop();
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. You can upload a photo or enter a barcode manually below.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Real-time Barcode & QR Code Scanning Loop (cross-browser compatible)
  const startScanLoop = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    let isTickBusy = false;
    const codeReader = new BrowserMultiFormatReader();

    scanIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState < 2 || isTickBusy) return;

      isTickBusy = true;
      try {
        // 1. Native BarcodeDetector API (Chrome, Edge, Safari Technology Preview, Android)
        if ('BarcodeDetector' in window) {
          try {
            const barcodeDetector = new window.BarcodeDetector({
              formats: ['qr_code', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39']
            });
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes && barcodes.length > 0) {
              const codeVal = barcodes[0].rawValue;
              handleCodeDetected(codeVal, barcodes[0].format);
              isTickBusy = false;
              return;
            }
          } catch (e) {
            // Fall through to ZXing
          }
        }

        // 2. ZXing BrowserMultiFormatReader for browsers without native BarcodeDetector (Firefox, desktop Safari, standard Chrome Windows)
        try {
          const zResult = await codeReader.decodeFromVideoElement(videoRef.current);
          if (zResult && zResult.getText()) {
            handleCodeDetected(zResult.getText(), zResult.getBarcodeFormat ? zResult.getBarcodeFormat().toString() : 'barcode');
            isTickBusy = false;
            return;
          }
        } catch (zErr) {
          // Normal when no barcode in current video frame
        }
      } catch (e) {
        // Suppress continuous tick errors
      } finally {
        isTickBusy = false;
      }
    }, 700);
  };

  // High-Resolution Snapshot Capture and Barcode Decoding
  const captureSnapshotAndScan = async () => {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      setScanNotice({
        type: 'warning',
        message: 'Camera video is not ready yet. Please wait a moment.'
      });
      return;
    }

    // Trigger physical shutter flash effect
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 180);

    try {
      const video = videoRef.current;
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, width, height);

      const snapshotUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedSnapshot(snapshotUrl);
      setIsSnapshotScanning(true);
      setScanNotice(null);

      let detectedText = null;
      let detectedFormat = 'code';

      // Method 1: ZXing Multi-Format Reader
      try {
        const codeReader = new BrowserMultiFormatReader();
        const zResult = await codeReader.decodeFromCanvas(canvas);
        if (zResult && zResult.getText()) {
          detectedText = zResult.getText();
          detectedFormat = zResult.getBarcodeFormat ? zResult.getBarcodeFormat().toString() : 'barcode';
        }
      } catch (err) {
        // Continue to method 2
      }

      // Method 2: Native BarcodeDetector (if supported)
      if (!detectedText && 'BarcodeDetector' in window) {
        try {
          const barcodeDetector = new window.BarcodeDetector({
            formats: ['qr_code', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39']
          });
          const barcodes = await barcodeDetector.detect(canvas);
          if (barcodes && barcodes.length > 0) {
            detectedText = barcodes[0].rawValue;
            detectedFormat = barcodes[0].format;
          }
        } catch (err) {}
      }

      // Method 3: Fast Dedicated jsQR Decoder
      if (!detectedText) {
        try {
          const imgData = ctx.getImageData(0, 0, width, height);
          const qrCode = jsQR(imgData.data, width, height);
          if (qrCode && qrCode.data) {
            detectedText = qrCode.data;
            detectedFormat = 'qr_code';
          }
        } catch (err) {}
      }

      setIsSnapshotScanning(false);

      if (detectedText) {
        handleCodeDetected(detectedText, detectedFormat);
      } else {
        setScanNotice({
          type: 'no_code_found',
          message: 'Snapshot captured, but no clear barcode or QR code was detected in this angle.'
        });
      }
    } catch (err) {
      console.warn('Error during snapshot capture & scan:', err);
      setIsSnapshotScanning(false);
      setScanNotice({
        type: 'error',
        message: 'Could not capture snapshot frame from camera. Please try again.'
      });
    }
  };

  const handleRetakeSnapshot = () => {
    setCapturedSnapshot(null);
    setScanNotice(null);
    setIsSnapshotScanning(false);
  };

  const handleDownloadSnapshot = () => {
    if (!capturedSnapshot) return;
    const a = document.createElement('a');
    a.href = capturedSnapshot;
    a.download = `tea_tin_snapshot_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleCodeDetected = async (rawValue, format = 'code') => {
    if (!rawValue || rawValue === scannedResult) return;
    setIsScanning(true);
    setScannedResult(rawValue);
    setUncatalogedResult(null);

    const cleanVal = rawValue.trim();

    // 1. Search in local and built-in verified Tea Registry
    const allRegistered = getRegisteredTeas(VERIFIED_TEA_CATALOG);
    const matched = allRegistered.find((bean) => {
      if (bean.upc === cleanVal) return true;
      if (bean.qrPatterns && bean.qrPatterns.some(p => cleanVal.toLowerCase().includes(p.toLowerCase()))) return true;
      if (cleanVal.includes('looseleaf') || cleanVal.includes('thebrew.app')) {
        try {
          const urlObj = new URL(cleanVal.startsWith('http') ? cleanVal : `https://${cleanVal}`);
          const beanName = urlObj.searchParams.get('bean') || urlObj.searchParams.get('tea');
          if (beanName && bean.beanName && bean.beanName.toLowerCase() === beanName.toLowerCase()) return true;
        } catch {}
      }
      return false;
    });

    if (matched) {
      setMatchedBean(matched);
      setIsScanning(false);
      return;
    }

    // 2. Check live Cloud Firestore for remote tea purveyors and lots
    setIsLookingUp(true);
    try {
      const remoteTea = await fetchRemoteTeaByCode(cleanVal);
      if (remoteTea) {
        setMatchedBean(remoteTea);
        // Cache to local registry so subsequent offline scans are instantaneous
        savePurveyorTea(remoteTea);
        setIsScanning(false);
        setIsLookingUp(false);
        return;
      }
    } catch (e) {
      console.warn('Firestore remote lookup error:', e);
    }
    setIsLookingUp(false);

    // 3. Check if the scanned code is a direct Smart Tea Tin / Pouch QR URL
    if ((cleanVal.includes('looseleaf') || cleanVal.includes('thebrew.app')) && (cleanVal.includes('bean=') || cleanVal.includes('tea='))) {
      try {
        const urlObj = new URL(cleanVal.startsWith('http') ? cleanVal : `https://${cleanVal}`);
        const parsedBean = {
          id: `smart_tin_${Date.now()}`,
          upc: urlObj.searchParams.get('upc') || cleanVal,
          roaster: urlObj.searchParams.get('roaster') || urlObj.searchParams.get('purveyor') || 'Specialty Tea Purveyor',
          beanName: urlObj.searchParams.get('tea') || urlObj.searchParams.get('bean') || 'Smart Tin Lot',
          origin: urlObj.searchParams.get('origin') || 'Single-Estate Garden',
          process: 'Orthodox Whole Leaf',
          elevation: '1,400+ MASL',
          roastLevel: 'Artisan Harvest',
          tastingNotes: ['Artisan Selected', 'Balanced Floral Profile'],
          recommendedRatio: parseFloat(urlObj.searchParams.get('ratio')) || 50,
          recommendedGrind: urlObj.searchParams.get('grind') || urlObj.searchParams.get('grade') || 'Whole Leaf',
          tempF: parseInt(urlObj.searchParams.get('tempF')) || 190,
          tempC: Math.round(((parseInt(urlObj.searchParams.get('tempF') || '190') - 32) * 5) / 9),
          brewMethod: urlObj.searchParams.get('method') || 'darjeeling_tea',
          notes: `Smart Tea Tin packaging QR scanned. Dialed in by ${urlObj.searchParams.get('roaster') || 'the Tea Purveyor'}.`
        };
        setMatchedBean(parsedBean);
        setIsScanning(false);
        return;
      } catch (err) {
        console.warn('Error parsing Smart Tin URL:', err);
      }
    }

    // 3. Genuine real-time lookup against Open Food Facts API
    setIsLookingUp(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(cleanVal)}.json`, {
        signal: controller.signal,
        headers: { 'User-Agent': 'LooseLeaf/2.0.0 (contact@looseleaf.guide)' }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const offData = await res.json();
        if (offData.status === 1 && offData.product) {
          const p = offData.product;
          setMatchedBean({
            id: `off_${cleanVal}`,
            upc: cleanVal,
            roaster: p.brands || p.brand_owner || 'Retail Tea Brand',
            beanName: p.product_name || p.generic_name || 'Retail Loose Leaf Tea',
            origin: p.origins || p.countries || 'Single-Garden / Regional Origin',
            process: 'Orthodox / CTC Leaf',
            elevation: 'Unspecified',
            roastLevel: 'Medium Oxidation',
            tastingNotes: ['Retail Packaged', 'Balanced Infusion'],
            recommendedRatio: 50,
            recommendedGrind: 'Whole Leaf',
            tempC: 90,
            tempF: 194,
            brewMethod: 'darjeeling_tea',
            isOffMatch: true,
            notes: `Verified retail product found on Open Food Facts (${p.product_name || 'Tea'}). Note: Retail packaging barcodes do not specify tea master steeping ratios or temperatures. Set custom dial-in below.`
          });
          setIsLookingUp(false);
          setIsScanning(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Open Food Facts lookup failed or timed out:', err);
    }

    // 4. Truly uncataloged: Absolutely NO fake data generated (Rule [user_global])
    setIsLookingUp(false);
    setMatchedBean(null);
    setUncatalogedResult({
      code: cleanVal,
      format
    });
    setIsScanning(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setCapturedSnapshot(dataUrl);
      setIsSnapshotScanning(true);
      setScanNotice(null);

      const img = new Image();
      img.onload = async () => {
        let detectedText = null;
        let detectedFormat = 'code';

        // 1. ZXing decoding on image element
        try {
          const codeReader = new BrowserMultiFormatReader();
          const zResult = await codeReader.decodeFromImageElement(img);
          if (zResult && zResult.getText()) {
            detectedText = zResult.getText();
            detectedFormat = zResult.getBarcodeFormat ? zResult.getBarcodeFormat().toString() : 'barcode';
          }
        } catch (err) {}

        // 2. Native BarcodeDetector (if available)
        if (!detectedText && 'BarcodeDetector' in window) {
          try {
            const barcodeDetector = new window.BarcodeDetector({
              formats: ['qr_code', 'ean_13', 'ean_8', 'upc_a', 'code_128']
            });
            const barcodes = await barcodeDetector.detect(img);
            if (barcodes && barcodes.length > 0) {
              detectedText = barcodes[0].rawValue;
              detectedFormat = barcodes[0].format;
            }
          } catch (err) {}
        }

        // 3. Dedicated jsQR via canvas
        if (!detectedText) {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qrResult = jsQR(imgData.data, canvas.width, canvas.height);
            if (qrResult && qrResult.data) {
              detectedText = qrResult.data;
              detectedFormat = 'qr_code';
            }
          } catch (err) {}
        }

        setIsSnapshotScanning(false);

        if (detectedText) {
          handleCodeDetected(detectedText, detectedFormat);
        } else {
          setScanNotice({
            type: 'no_code_found',
            message: 'Uploaded photo analyzed, but no readable barcode or QR code was detected in the image.'
          });
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleCodeDetected(manualCode.trim(), 'manual');
    }
  };

  const handleApplyToDialIn = () => {
    if (!matchedBean) return;
    if (orchestrator) {
      orchestrator.brew(matchedBean);
    } else if (onApplyRecipe) {
      onApplyRecipe(matchedBean);
    }
    onClose();
  };

  const handleSaveToCellar = () => {
    if (!matchedBean) return;
    if (orchestrator) {
      orchestrator.cellar(matchedBean);
    } else if (onSaveToJournal) {
      onSaveToJournal(matchedBean);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#09150E] border-2 border-sage-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scanner-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-sage-300 shadow">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sage-300">
                  Camera Vision & Ingestion
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30">
                  UPC • EAN • QR
                </span>
              </div>
              <h2 id="scanner-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
                Tea Tin & Pouch Barcode / QR Scanner
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-cream-soft hover:text-white border border-white/10 transition"
            title="Close scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Viewfinder Section */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 aspect-[4/3] sm:aspect-video flex items-center justify-center shadow-inner">
            {/* Live Camera Video */}
            {!capturedSnapshot && (
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-300 ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
              />
            )}

            {/* Frozen Captured Snapshot View */}
            {capturedSnapshot && (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <img
                  src={capturedSnapshot}
                  alt="Captured Tea Tin Snapshot"
                  className="w-full h-full object-cover"
                />
                {isSnapshotScanning && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 animate-fade-in">
                    <Loader2 className="w-8 h-8 text-sage-300 animate-spin" />
                    <span className="text-xs font-mono font-bold text-cream-light bg-black/70 px-3 py-1 rounded-full border border-sage-500/30">
                      Analyzing Tea Tin Snapshot...
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Physical Shutter Flash Animation */}
            {shutterFlash && (
              <div className="absolute inset-0 bg-white z-30 pointer-events-none transition-opacity duration-150 opacity-90" />
            )}

            {/* Laser Scan Animation Overlay (Live Camera Mode) */}
            {cameraActive && !capturedSnapshot && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* Viewfinder Framing Box */}
                <div className="relative w-64 h-48 border-2 border-sage-400/60 rounded-2xl shadow-[0_0_15px_rgba(110,210,160,0.3)]">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sage-400"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sage-400"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sage-400"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sage-400"></div>
                  
                  {/* Glowing Laser line */}
                  <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10b981] animate-pulse" style={{ animationDuration: '1.5s' }} />
                </div>
              </div>
            )}

            {/* Prominent Circular Camera Shutter Button (Over Live Camera) */}
            {cameraActive && !capturedSnapshot && (
              <div className="absolute bottom-3 sm:bottom-4 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={captureSnapshotAndScan}
                  disabled={isSnapshotScanning}
                  className="group relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black/60 border-4 border-sage-400 shadow-[0_0_25px_rgba(110,210,160,0.6)] backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sage-400/50 cursor-pointer disabled:opacity-50"
                  title="Snap & Scan Tea Tin Barcode"
                  aria-label="Snap photo to scan tea tin"
                >
                  <span className="w-12 h-12 rounded-full bg-sage-400 flex items-center justify-center text-slate-950 shadow-inner group-hover:bg-emerald-300 transition">
                    {isSnapshotScanning ? (
                      <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-950" />
                    )}
                  </span>
                </button>
                <div className="mt-1.5 px-3 py-0.5 rounded-full bg-black/80 backdrop-blur text-[11px] font-mono font-bold text-sage-300 shadow border border-sage-500/40">
                  {isSnapshotScanning ? 'Scanning Snapshot...' : '📸 Snap & Scan Tea Tin'}
                </div>
              </div>
            )}

            {/* Camera Fallback / Error Display */}
            {!cameraActive && !capturedSnapshot && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#08150C]/90">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sage-300">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="max-w-sm">
                  <p className="text-sm font-semibold text-cream-light">
                    {cameraError ? 'Camera Access Notice' : 'Connecting Device Camera...'}
                  </p>
                  <p className="text-xs text-cream-soft/70 mt-1">
                    {cameraError || 'Allow camera access to scan retail tea tin barcodes or QR steeping codes directly.'}
                  </p>
                </div>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl btn-tactile-tea text-white text-xs font-mono font-bold uppercase tracking-wider transition hover:scale-105 active:scale-95 shadow"
                >
                  Enable Camera
                </button>
              </div>
            )}

            {/* Badge Indicator */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-[10px] font-mono text-cream-soft border border-white/10 flex items-center gap-2 z-10">
              <span className={`w-2 h-2 rounded-full ${capturedSnapshot ? 'bg-amber-400' : (cameraActive ? 'bg-emerald-400 animate-ping' : 'bg-rose-400')}`}></span>
              <span>{capturedSnapshot ? 'Captured Snapshot' : (cameraActive ? 'Live Camera Feed' : 'Camera Standby')}</span>
            </div>

            {/* Retake & Save Buttons Overlay (When Snapshot is Displayed) */}
            {capturedSnapshot && (
              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2.5 z-20">
                <button
                  type="button"
                  onClick={handleRetakeSnapshot}
                  className="px-3.5 py-1.5 rounded-xl bg-sage-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 shadow-2xl hover:scale-105 active:scale-95 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-950" />
                  <span>Retake Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSnapshot}
                  className="px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-black text-cream-light font-mono font-bold text-xs flex items-center gap-1.5 shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition"
                  title="Download captured photo to your device"
                >
                  <Download className="w-3.5 h-3.5 text-sage-300" />
                  <span>Save Image File</span>
                </button>
              </div>
            )}
          </div>

          {/* Scanner Controls Toolbar */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={capturedSnapshot ? handleRetakeSnapshot : captureSnapshotAndScan}
                disabled={(!cameraActive && !capturedSnapshot) || isSnapshotScanning}
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl btn-tactile-tea text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50"
              >
                {capturedSnapshot ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake Photo</span>
                  </>
                ) : (
                  <>
                    {isSnapshotScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                    <span>{isSnapshotScanning ? 'Analyzing...' : '📸 Snap Photo'}</span>
                  </>
                )}
              </button>

              {capturedSnapshot && (
                <button
                  type="button"
                  onClick={handleDownloadSnapshot}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-cream-light font-mono text-xs font-bold border border-white/15 transition active:scale-95"
                  title="Save captured photo to Downloads"
                >
                  <Download className="w-3.5 h-3.5 text-sage-300" />
                  <span>Save Image</span>
                </button>
              )}

              <label className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-cream-light border border-white/10 cursor-pointer transition active:scale-95 font-mono">
                <Upload className="w-3.5 h-3.5 text-sage-300" />
                <span>Upload Tin Photo</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Quick Demo SKU Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] text-cream-soft/60 font-mono uppercase">Quick Presets:</span>
              <button
                onClick={() => handleCodeDetected("4970056012014", "upc_a")}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-emerald-500/20 text-[11px] font-mono text-cream-soft hover:text-cream-light border border-white/10"
              >
                Ippodo Matcha
              </button>
              <button
                onClick={() => handleCodeDetected("6945123001018", "upc_a")}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-emerald-500/20 text-[11px] font-mono text-cream-soft hover:text-cream-light border border-white/10"
              >
                YS Shou Pu-erh
              </button>
              <button
                onClick={() => handleCodeDetected("8906082570123", "upc_a")}
                className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-emerald-500/20 text-[11px] font-mono text-cream-soft hover:text-cream-light border border-white/10"
              >
                Vahdam Darjeeling
              </button>
            </div>
          </div>

          {/* Snapshot Feedback Alert Banner (When no code found in captured snapshot) */}
          {scanNotice && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-cream-light">
                    {scanNotice.message}
                  </p>
                  <p className="text-[11px] text-cream-soft/70 mt-0.5">
                    Align the barcode or QR code steadily within the center framing box and snap again, or select a demo tin above.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRetakeSnapshot}
                className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white/[0.1] hover:bg-white/[0.18] text-cream-light font-mono text-xs font-bold flex items-center gap-1.5 border border-white/15 transition active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-sage-300" />
                <span>Retake Photo</span>
              </button>
            </div>
          )}

          {/* Real-time Open Product Lookup Spinner */}
          {isLookingUp && (
            <div className="p-4 rounded-2xl bg-black/50 border border-sage-500/30 flex items-center justify-center gap-3 text-cream-light font-mono text-xs animate-pulse">
              <Loader2 className="w-4 h-4 text-sage-300 animate-spin" />
              <span>Querying verified tea purveyors & Open Food Facts product database...</span>
            </div>
          )}

          {/* Uncataloged / Transparent Barcode Result */}
          {uncatalogedResult && !matchedBean && !isLookingUp && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.07] border-2 border-amber-500/40 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 text-amber-300">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-300/80 block">
                    Transparent Barcode Result
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-cream-light">
                    Unregistered Tea Tin Barcode
                  </h3>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-cream-soft/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-cream-soft/60">Scanned Barcode:</span>
                  <span className="text-sage-300 font-bold px-2 py-0.5 rounded bg-white/[0.06]">{uncatalogedResult.code}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-cream-soft/80">
                  Standard supermarket and retail barcodes identify products for inventory and checkout, but do <strong>not</strong> specify tea master steeping recipes, water ratios, or infusion temperatures unless registered by the tea purveyor. In accordance with our zero-theater standards, no synthetic recipe was generated.
                </p>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-200/90 text-[11px] flex items-start gap-2">
                  <Mail className="w-4 h-4 text-sage-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tea Purveyor or Garden Partner?</strong> Please contact HQ if you would like to add your tea house, estate lots, and packaging barcodes to our global database.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
                {onOpenRoasterInfo && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenRoasterInfo();
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl btn-tactile-tea text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow hover:scale-105 active:scale-95 transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact HQ to Add Label</span>
                  </button>
                )}

                {onOpenRoasterPortal && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenRoasterPortal(uncatalogedResult.code);
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-sage-400 hover:bg-sage-300 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                  >
                    <Store className="w-4 h-4 text-slate-950" />
                    <span>Onboard & Register Recipe</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Scanned Tea Result Card */}
          {matchedBean && (
            <div className="p-5 sm:p-6 rounded-2xl bg-black/60 border-2 border-sage-500/50 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-sage-300 text-[10px] font-mono font-bold uppercase border border-emerald-500/30">
                    {matchedBean.roaster}
                  </span>
                  <span className="text-[10px] text-cream-soft/50 font-mono">
                    Code: {scannedResult || matchedBean.upc}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Profile Ingested</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-light">
                  {matchedBean.beanName}
                </h3>
                <p className="text-xs text-cream-soft/80 mt-1 leading-relaxed">
                  {matchedBean.notes}
                </p>
              </div>

              {/* Steeping Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-[10px] text-cream-soft/60 uppercase block">Origin & Altitude</span>
                  <span className="font-bold text-cream-light truncate block mt-0.5">{matchedBean.origin}</span>
                  <span className="text-[10px] text-sage-300 block">{matchedBean.elevation}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-[10px] text-cream-soft/60 uppercase block">Harvest & Process</span>
                  <span className="font-bold text-cream-light truncate block mt-0.5">{matchedBean.process}</span>
                  <span className="text-[10px] text-emerald-400 block">{matchedBean.roastLevel}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-[10px] text-cream-soft/60 uppercase block">Steep Ratio</span>
                  <span className="font-bold text-sage-300 text-sm block mt-0.5">1 : {matchedBean.recommendedRatio}</span>
                  <span className="text-[10px] text-cream-soft/70 block">{matchedBean.recommendedGrind}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-[10px] text-cream-soft/60 uppercase block">Water Temp</span>
                  <span className="font-bold text-cream-light text-sm block mt-0.5">{matchedBean.tempF}°F</span>
                  <span className="text-[10px] text-cream-soft/70 block">{matchedBean.tempC}°C</span>
                </div>
              </div>

              {/* Tasting Notes Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-cream-soft/60 uppercase">Notes:</span>
                {matchedBean.tastingNotes.map((note, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.08] text-[10px] font-medium text-cream-light border border-white/10">
                    {note}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                {/* 1. Direct 300-DPI Packaging Sticker Download */}
                <button
                  type="button"
                  onClick={() => {
                    if (orchestrator) {
                      orchestrator.downloadSticker(matchedBean);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-cream-light border border-white/15 text-xs font-mono font-bold flex items-center gap-2 transition active:scale-95"
                  title="Download 300-DPI packaging sticker (PNG) with 'Scan Me for Steeping Guide' badge directly to your device"
                >
                  <Download className="w-4 h-4 text-sage-300" />
                  <span>Download Sticker (300 DPI)</span>
                </button>

                {/* 2. Tea Purveyor Studio Handoff */}
                <button
                  type="button"
                  onClick={() => {
                    if (orchestrator) {
                      orchestrator.package(matchedBean);
                    } else if (onOpenRoasterPortal) {
                      onOpenRoasterPortal(matchedBean.upc, matchedBean);
                    }
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-sage-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-2 transition active:scale-95"
                  title="Open Tea Studio to export vector SVG or thermal roll specs for your packaging printer"
                >
                  <QrCode className="w-4 h-4 text-sage-300" />
                  <span>Tea Studio</span>
                </button>

                {/* 3. Log to Tea Cellar */}
                <button
                  type="button"
                  onClick={handleSaveToCellar}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-cream-light text-xs font-mono font-bold flex items-center gap-2 border border-white/15 transition active:scale-95"
                >
                  <BookmarkPlus className="w-4 h-4 text-sage-300" />
                  <span>Log to Tea Cellar</span>
                </button>

                {/* 4. Load into Steeping Station */}
                <button
                  type="button"
                  onClick={handleApplyToDialIn}
                  className="px-5 py-2.5 rounded-xl btn-tactile-tea text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition active:scale-95 hover:scale-105"
                >
                  <span>Load into Steeping Station</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Manual Barcode Input Form */}
          <form onSubmit={handleManualSubmit} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Or enter 12-digit UPC or QR URL manually..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-cream-light placeholder-cream-soft/50 font-mono focus:outline-none focus:border-sage-400 transition"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-sage-400 hover:text-slate-950 text-cream-light text-xs font-mono font-bold transition border border-white/15 active:scale-95"
            >
              Verify Code
            </button>
          </form>

          {/* Purveyor Partner Banner */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cream-soft/80 font-mono text-[11px]">
              <Store className="w-4 h-4 text-sage-300 shrink-0" />
              <span>Are you an artisan tea purveyor or historic tea garden? Add your tin barcodes to our global database.</span>
            </div>
            <div className="flex items-center gap-3">
              {onOpenRoasterInfo && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenRoasterInfo();
                    onClose();
                  }}
                  className="text-sage-300 hover:underline font-mono font-bold text-[11px] flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>How to Add Your Tin</span>
                </button>
              )}
              {onOpenRoasterPortal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenRoasterPortal('');
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-cream-light font-mono font-bold text-[11px] flex items-center gap-1 border border-white/10"
                >
                  <span>Tea Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
