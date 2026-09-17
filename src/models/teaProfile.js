/**
 * LooseLeaf — Canonical TeaProfile Domain Entity
 * 
 * Standardizes tea lot representation across all subsystems:
 * - Camera Barcode/QR Scanner
 * - B2B Tea Purveyor & Garden Studio
 * - Verified Specialty Tea Catalog
 * - Multi-Phase Steeping Timer
 * - Water Chemistry Lab
 * - Steep Cellar & Journal
 * - Community Hub
 */

export function createTeaProfile(input = {}) {
  const purveyor = (input.purveyor || input.roaster || input.brand || input.brand_owner || 'Specialty Tea Purveyor').trim();
  const teaName = (input.teaName || input.beanName || input.product_name || input.name || 'Single-Estate Lot').trim();
  const origin = (input.origin || input.origins || input.countries || 'High Mountain Terroir').trim();
  const elevation = (input.elevation || '1,400+ MASL').trim();
  const process = (input.process || 'Orthodox Whole Leaf').trim();
  const oxidationLevel = (input.oxidationLevel || input.roastLevel || 'Artisan Fired').trim();

  // Parse tasting notes to clean array
  let tastingNotes = [];
  if (Array.isArray(input.tastingNotes)) {
    tastingNotes = input.tastingNotes.map(n => String(n).trim()).filter(Boolean);
  } else if (typeof input.tastingNotes === 'string') {
    tastingNotes = input.tastingNotes.split(',').map(n => n.trim()).filter(Boolean);
  }
  if (tastingNotes.length === 0) {
    tastingNotes = ['Artisan Harvest', 'Balanced Body', 'Clean Floral Finish'];
  }

  // Extraction & steeping parameters
  const ratio = Number(input.recommendedRatio || input.ratio || 50);
  let tempF = Number(input.tempF || (input.tempC ? Math.round((input.tempC * 9) / 5 + 32) : 190));
  if (isNaN(tempF) || tempF < 140 || tempF > 212) tempF = 190;
  const tempC = Math.round(((tempF - 32) * 5) / 9);

  const leafGrade = (input.leafGrade || input.recommendedGrind || input.grind || 'Whole Leaf').trim();
  const method = (input.brewMethod || input.method || 'darjeeling_tea').trim();
  const brewTime = (input.brewTime || '3m 00s').trim();
  const bloomTime = (input.bloomTime || '15s').trim();

  // Identifiers & Packaging
  const upc = (input.upc || input.barcode || input.code || `LOT-${Date.now().toString().slice(-6)}`).trim();
  const customUrl = (input.customUrl || '').trim();
  const id = input.id || `tea_${slugify(purveyor + '_' + teaName + '_' + upc)}`;

  const notes = (input.notes || input.description || `Specialty tea harvest from ${purveyor}. Terroir: ${origin} (${process}).`).trim();

  return {
    id,
    purveyor,
    roaster: purveyor,
    location: (input.location || 'Artisan Mountain Garden').trim(),
    website: (input.website || '').trim(),
    teaName,
    beanName: teaName,
    origin,
    elevation,
    process,
    oxidationLevel,
    roastLevel: oxidationLevel,
    tastingNotes,
    extraction: {
      ratio,
      tempF,
      tempC,
      leafGrade,
      grind: leafGrade,
      method,
      brewTime,
      bloomTime,
      waterPpm: input.waterPpm || '30-60 ppm TDS (soft mountain spring water)'
    },
    packaging: {
      upc,
      customUrl,
      isCertified: Boolean(input.isCertified ?? true)
    },
    notes,
    meta: {
      source: input.meta?.source || (input.isOffMatch ? 'open_food_facts' : 'app_registry'),
      createdAt: input.meta?.createdAt || new Date().toISOString()
    },
    // Convenient getters for backwards compatibility
    recommendedRatio: ratio,
    recommendedGrind: leafGrade,
    leafGrade,
    tempF,
    tempC,
    brewMethod: method,
    upc
  };
}

export function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
