// Tea Purveyor Registry & Smart Tin Packaging QR Generator
// Manages verified partner tea purveyors, custom tea profiles, and packaging QR generation.

import QRCode from 'qrcode';
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { deduplicateTeas, normalizeRoasterKey } from './roasterShowcaseData.js';

const STORAGE_KEY = 'looseleaf_purveyor_registry_v1';
const ROASTER_PROFILES_KEY = 'looseleaf_custom_purveyors_v1';

/**
 * Retrieve all registered teas (built-in verified catalog + user/purveyor registered)
 */
export function getRegisteredTeas(builtinCatalog = []) {
  try {
    const raw = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) || localStorage.getItem('thebrewapp_roaster_registry_v1')) : null;
    const customList = raw ? JSON.parse(raw) : [];
    return deduplicateTeas([...customList, ...builtinCatalog]);
  } catch (err) {
    console.warn('Error reading purveyor registry from localStorage:', err);
    return deduplicateTeas([...builtinCatalog]);
  }
}
/**
 * Get only custom teas registered via the Purveyor Portal
 */
export function getCustomPurveyorTeas() {
  try {
    const raw = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) || localStorage.getItem('thebrewapp_roaster_registry_v1')) : null;
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading custom purveyor teas:', err);
    return [];
  }
}
/**
 * Save or update a tea in the Purveyor Registry
 */
export function savePurveyorTea(tea) {
  const teaName = tea?.teaName || tea?.beanName || tea?.name;
  if (!tea || !teaName) {
    throw new Error('Tea lot name is required to register a profile.');
  }

  const existing = getCustomPurveyorTeas();
  const id = tea.id || `tea_${Date.now()}`;
  const record = {
    ...tea,
    id,
    teaName,
    beanName: teaName,
    updatedAt: new Date().toISOString(),
    isCustom: true
  };

  const filtered = existing.filter((c) => c.id !== id);
  const updated = [record, ...filtered];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Storage quota exceeded in savePurveyorTea; saving lightweight record:', err);
    try {
      const lightweight = updated.map((c) => ({
        ...c,
        logoImage: c.logoImage && c.logoImage.length > 50000 ? '' : c.logoImage
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
    } catch (fallbackErr) {
      console.error('Failed to save tea to localStorage:', fallbackErr);
    }
  }

  // Asynchronous Cloud Firestore Persistence
  try {
    if (db) {
      const cloudRecord = { ...record };
      if (cloudRecord.logoImage && cloudRecord.logoImage.length > 50000) delete cloudRecord.logoImage;
      setDoc(doc(db, 'teas', id), cloudRecord, { merge: true }).catch(e => {
        console.warn('Firestore tea sync error:', e);
      });
      if (record.upc) {
        setDoc(doc(db, 'teas', `upc_${record.upc}`), cloudRecord, { merge: true }).catch(() => {});
      }
    }
  } catch (syncErr) {
    console.warn('Firestore sync failed:', syncErr);
  }

  return record;
}
/**
 * Delete a custom tea from the Purveyor Registry
 */
export function deletePurveyorTea(id) {
  const existing = getCustomPurveyorTeas();
  const filtered = existing.filter((c) => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete tea from localStorage:', err);
  }

  try {
    if (db) {
      deleteDoc(doc(db, 'teas', id)).catch(() => {});
    }
  } catch (e) {}

  return filtered;
}
/**
 * Get custom purveyors registered via the Purveyor Portal
 */
export function getCustomPurveyors() {
  try {
    const raw = typeof window !== 'undefined' ? (localStorage.getItem(ROASTER_PROFILES_KEY) || localStorage.getItem('thebrewapp_custom_roasters_v1')) : null;
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading custom purveyors from localStorage:', err);
    return [];
  }
}
export const getCustomRoasters = getCustomPurveyors;

/**
 * Save or update a custom purveyor profile
 */
export function saveCustomPurveyorProfile(profile) {
  if (!profile || !profile.name) return null;
  const existing = getCustomPurveyors();
  const slug = (profile.slug || profile.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const record = {
    ...profile,
    id: slug,
    slug,
    updatedAt: new Date().toISOString()
  };
  const filtered = existing.filter((r) => r.id !== slug && r.slug !== slug);
  const updated = [record, ...filtered];
  try {
    localStorage.setItem(ROASTER_PROFILES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Storage quota exceeded in saveCustomPurveyorProfile; saving lightweight record:', err);
    try {
      const lightweight = updated.map((r) => ({
        ...r,
        logoImage: r.logoImage && r.logoImage.length > 50000 ? '' : r.logoImage,
        backgroundImage: r.backgroundImage && r.backgroundImage.length > 50000 ? '' : r.backgroundImage
      }));
      localStorage.setItem(ROASTER_PROFILES_KEY, JSON.stringify(lightweight));
    } catch (fallbackErr) {
      console.error('Failed to save purveyor profile to localStorage:', fallbackErr);
    }
  }

  // Asynchronous Cloud Firestore Persistence
  try {
    if (db) {
      const cloudProfile = { ...record };
      if (cloudProfile.logoImage && cloudProfile.logoImage.length > 50000) delete cloudProfile.logoImage;
      if (cloudProfile.backgroundImage && cloudProfile.backgroundImage.length > 50000) delete cloudProfile.backgroundImage;
      setDoc(doc(db, 'purveyors', slug), cloudProfile, { merge: true }).catch(e => {
        console.warn('Firestore purveyor profile sync error:', e);
      });
    }
  } catch (syncErr) {
    console.warn('Firestore purveyor sync failed:', syncErr);
  }

  return record;
}
export const saveCustomRoasterProfile = saveCustomPurveyorProfile;

/**
 * Asynchronously query Cloud Firestore for a tea by UPC barcode or tea ID
 */
export async function fetchRemoteTeaByCode(code) {
  if (!code || !db) return null;
  const cleanCode = String(code).trim();
  try {
    // 1. Direct O(1) alias check (upc_...)
    const aliasRef = doc(db, 'teas', `upc_${cleanCode}`);
    const aliasSnap = await getDoc(aliasRef);
    if (aliasSnap.exists()) return aliasSnap.data();

    // 2. Direct ID check
    const directRef = doc(db, 'teas', cleanCode);
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) return directSnap.data();

    // 3. Query by upc field
    const q = query(collection(db, 'teas'), where('upc', '==', cleanCode));
    const qSnap = await getDocs(q);
    if (!qSnap.empty) {
      return qSnap.docs[0].data();
    }
  } catch (err) {
    console.warn('Error fetching tea from Firestore:', err);
  }
  return null;
}
/**
 * Purge stale duplicate purveyors and duplicate teas from local storage
 */
export function cleanupLocalRegistry() {
  if (typeof window === 'undefined') return;
  try {
    const rawPurveyors = localStorage.getItem(ROASTER_PROFILES_KEY);
    if (rawPurveyors) {
      const purveyors = JSON.parse(rawPurveyors);
      const seen = new Set(['ippodo', 'yunnan-sourcing', 'vahdam']);
      const cleaned = [];
      for (const r of purveyors) {
        if (!r) continue;
        const k = normalizeRoasterKey(r.id || r.slug || r.name);
        if (k && !seen.has(k)) {
          seen.add(k);
          cleaned.push(r);
        }
      }
      localStorage.setItem(ROASTER_PROFILES_KEY, JSON.stringify(cleaned));
    }

    const rawTeas = localStorage.getItem(STORAGE_KEY);
    if (rawTeas) {
      const teas = JSON.parse(rawTeas);
      const cleanedTeas = deduplicateTeas(teas);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedTeas));
    }
  } catch (err) {
    console.warn('Error during local registry cleanup:', err);
  }
}

/**
 * Sync Cloud Firestore catalog with local cache
 */
export async function syncCloudCatalog() {
  if (!db || typeof window === 'undefined') return;
  cleanupLocalRegistry();
  try {
    const purveyorSnap = await getDocs(collection(db, 'purveyors'));
    if (!purveyorSnap.empty) {
      const remotePurveyors = purveyorSnap.docs.map(d => d.data());
      const localPurveyors = getCustomPurveyors();
      const seenBuiltins = new Set(['ippodo', 'yunnan-sourcing', 'vahdam']);
      const purveyorMap = new Map();

      [...remotePurveyors, ...localPurveyors].forEach(r => {
        if (!r) return;
        const k = normalizeRoasterKey(r.id || r.slug || r.name);
        if (k && !seenBuiltins.has(k) && !purveyorMap.has(k)) {
          purveyorMap.set(k, r);
        }
      });
      localStorage.setItem(ROASTER_PROFILES_KEY, JSON.stringify(Array.from(purveyorMap.values())));
    }

    const teaSnap = await getDocs(collection(db, 'teas'));
    if (!teaSnap.empty) {
      const remoteTeas = teaSnap.docs
        .filter(d => !d.id.startsWith('upc_'))
        .map(d => d.data());
      const localTeas = getCustomPurveyorTeas();
      const merged = deduplicateTeas([...remoteTeas, ...localTeas]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
  } catch (err) {
    console.warn('Background Cloud Firestore sync error:', err);
  }
}
export const syncCloudTeaCatalog = syncCloudCatalog;


/**
 * Generate a deep-link URL for a tea profile that opens the Purveyor's Portfolio page with dial-in parameters
 */
export function generateSmartTinUrl(tea, baseUrl) {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://looseleaf.app');
  if (!tea) return `${origin}/purveyors`;

  const purveyorSlug = (tea.purveyor || tea.roaster || 'purveyors')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const params = new URLSearchParams();
  const name = tea.teaName || tea.beanName;
  if (name) params.set('tea', name);
  if (tea.id) params.set('teaId', tea.id);
  if (tea.brewMethod) params.set('method', tea.brewMethod);
  if (tea.recommendedRatio) params.set('ratio', tea.recommendedRatio.toString());
  if (tea.tempF) params.set('tempF', tea.tempF.toString());
  if (tea.leafGrade || tea.recommendedGrind) params.set('grade', tea.leafGrade || tea.recommendedGrind);
  if (tea.upc) params.set('upc', tea.upc);

  return `${origin}/purveyors/${purveyorSlug}?${params.toString()}`;
}
export const generateSmartBagUrl = generateSmartTinUrl;

/**
 * Generate a high-resolution QR code Data URL for printing packaging stickers
 */
export async function generateQrCodeDataUrl(text, options = {}) {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: options.errorCorrectionLevel || 'H',
      margin: options.margin !== undefined ? options.margin : 2,
      width: options.width || 800,
      color: {
        dark: options.darkColor || '#000000',
        light: options.lightColor || '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR code data URL:', err);
    return null;
  }
}

/**
 * Generate a pure vector SVG QR code string for packaging printers
 */
export async function generateQrCodeSvg(text, options = {}) {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: options.errorCorrectionLevel || 'H',
      margin: options.margin !== undefined ? options.margin : 2,
      color: {
        dark: options.darkColor || '#000000',
        light: options.lightColor || '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR code SVG:', err);
    return null;
  }
}

/**
 * Export the purveyor's teas as a portable JSON file
 */
export function exportPurveyorCatalogJson() {
  const teas = getCustomPurveyorTeas();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(teas, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `looseleaf_purveyor_catalog_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
export const exportRoasterCatalogJson = exportPurveyorCatalogJson;
