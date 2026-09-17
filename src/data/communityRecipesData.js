// Curated Master Recipes & Signature Steeping Protocols for LooseLeaf
// Verified standard techniques from recognized tea masters, tea sommeliers, and traditions.

export const CURATED_MASTER_RECIPES = [
  {
    id: 'rec_gaiwan_alishan',
    title: 'Traditional High Mountain Gongfu Multi-Steep',
    technique: 'Taiwanese Gongfu Cha Heritage Protocol',
    badge: 'Heritage Protocol',
    methodId: 'oolong_tea',
    methodName: 'Gongfu Oolong Gaiwan',
    trackMode: 'tea',
    beanName: 'High Mountain Alishan Rolled Oolong',
    roasterName: 'Hand-Harvested High Elevation Spring Pluck',
    ratio: 20.0,
    dryDoseGrams: 7.5,
    waterAmountMl: 150.0,
    waterTempC: 92,
    grindSetting: 'Whole Tightly Rolled Pearls',
    totalTimeSec: 240,
    description: 'High leaf-to-water ratio unlocking rich orchid honey sweetness, buttery mouthfeel, and deep mineral aftertaste across progressive infusions.',
    steps: [
      { order: 1, durationSec: 10, waterMl: 150, action: 'Flash Rinse & Awaken Leaves (Discard Rinse)' },
      { order: 2, durationSec: 20, waterMl: 150, action: '1st Steep: Floral Aromatics & Creamy Body' },
      { order: 3, durationSec: 25, waterMl: 150, action: '2nd Steep: Honey Nectar & Orchid Notes' },
      { order: 4, durationSec: 35, waterMl: 150, action: '3rd Steep: Lingering Sweet Finish & Mineral Tone' }
    ]
  },
  {
    id: 'rec_matcha_usucha',
    title: 'Kyoto Ceremonial Usucha Matcha Protocol',
    technique: 'Traditional Uji Chasen Whisk Method',
    badge: 'Ceremonial Protocol',
    methodId: 'matcha_tea',
    methodName: 'Ceremonial Matcha (Usucha)',
    trackMode: 'tea',
    beanName: 'Uji First-Harvest Ceremonial Tencha',
    roasterName: 'Stone-Ground Kyoto Heritage Mill',
    ratio: 35.0,
    dryDoseGrams: 2.0,
    waterAmountMl: 70.0,
    waterTempC: 80,
    grindSetting: 'Stone-Ground Tencha Powder (<15 µm)',
    totalTimeSec: 80,
    description: 'Stone-ground green tea whisked with bamboo Chasen in a preheated ceramic Chawan to generate rich, silky micro-foam with intense sweet umami.',
    steps: [
      { order: 1, durationSec: 20, waterMl: 0, action: 'Warm bowl with hot water, wipe dry, sift 2g matcha powder' },
      { order: 2, durationSec: 15, waterMl: 70, action: 'Pour 70mL 80°C soft water along inner edge of bowl' },
      { order: 3, durationSec: 45, waterMl: 70, action: 'Whisk briskly from wrist in W-motion until dense green foam crowns bowl' }
    ]
  },
  {
    id: 'rec_darjeeling_muscatel',
    title: 'Himalayan Darjeeling First Flush Infusion',
    technique: 'Estate Tasting Protocol',
    badge: 'Himalayan Benchmark',
    methodId: 'darjeeling_tea',
    methodName: 'Himalayan Darjeeling',
    trackMode: 'tea',
    beanName: 'Darjeeling FTGFOP1 First Flush',
    roasterName: 'Single-Estate Himalayan Lot',
    ratio: 50.0,
    dryDoseGrams: 5.0,
    waterAmountMl: 250.0,
    waterTempC: 88,
    grindSetting: 'Orthodox Whole Leaf',
    totalTimeSec: 225,
    description: 'Careful temperature moderation at 88°C preserves delicate muscatel grape esters, fresh peach skin, and wildflower honey aromatics without astringency.',
    steps: [
      { order: 1, durationSec: 15, waterMl: 0, action: 'Warm porcelain teapot and discard warming water' },
      { order: 2, durationSec: 180, waterMl: 250, action: 'Pour 88°C water gently over leaves. Steep undisturbed for 3 minutes' },
      { order: 3, durationSec: 30, waterMl: 250, action: 'Strain completely into teacup to prevent over-extraction' }
    ]
  },
  {
    id: 'rec_royal_masala_chai',
    title: 'Traditional Brahmaputra Valley Simmered Chai',
    technique: 'Slow Decoction Protocol',
    badge: 'Heritage Recipe',
    methodId: 'chai_masala',
    methodName: 'Masala Chai',
    trackMode: 'tea',
    beanName: 'Assam CTC Estate Black Tea',
    roasterName: 'Cracked Whole Botanicals & Spices',
    ratio: 25.0,
    dryDoseGrams: 10.0,
    waterAmountMl: 250.0,
    waterTempC: 98,
    grindSetting: 'CTC Granular & Cracked Spices',
    totalTimeSec: 390,
    description: 'Decoction simmer extracting essential oils from green cardamom, Ceylon cinnamon, ginger root, and black pepper, bound with rich milk and Assam black tea.',
    steps: [
      { order: 1, durationSec: 240, waterMl: 250, action: 'Boil crushed spices and Assam CTC tea in water for 4 minutes' },
      { order: 2, durationSec: 120, waterMl: 250, action: 'Add milk and cane sugar; bring to three consecutive rolling froths' },
      { order: 3, durationSec: 30, waterMl: 250, action: 'Strain through fine mesh strainer directly into mug' }
    ]
  }
];

export const COMMUNITY_RECIPES = CURATED_MASTER_RECIPES;
