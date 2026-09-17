/**
 * LooseLeaf • Master Tea Video Academy & Video Registry
 * Authentic curated video masterclasses from recognized tea masters,
 * tea sommeliers, and agricultural researchers.
 */

export const VIDEO_CATEGORIES = [
  { id: 'all', label: 'All Masterclasses', icon: 'Sparkles' },
  { id: 'gongfu', label: 'Gongfu Cha & Gaiwan', icon: 'Leaf' },
  { id: 'matcha', label: 'Ceremonial Matcha', icon: 'Flame' },
  { id: 'green_white', label: 'Green & White Tea', icon: 'Droplets' },
  { id: 'chai_black', label: 'Masala Chai & Black Tea', icon: 'Store' },
  { id: 'water_science', label: 'Water Lab & Chemistry', icon: 'FlaskConical' }
];

export const TEA_VIDEOS = [
  {
    id: 'meileaf-gongfu-masterclass',
    youtubeId: 'bBlyG3v0cHQ',
    title: 'The 14 Steps of Gong Fu Tea Brewing (Step-by-Step Guide)',
    creator: 'Mei Leaf',
    creatorBadge: 'Tea Master & Sommelier',
    creatorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    category: 'gongfu',
    methodId: 'oolong_tea',
    duration: '18:24',
    views: '890K',
    featured: true,
    description: 'The definitive Gongfu Cha masterclass explaining vessel preheating, flash leaf waking rinse, high-ratio steeping in a Gaiwan, and flavor progression across multi-steeps.',
    recipeSync: {
      methodName: 'Gongfu Oolong (Gaiwan)',
      methodId: 'oolong_tea',
      ratio: 20.0,
      doseGrams: 7.5,
      totalWaterMl: 150,
      waterTempF: 194,
      waterTempC: 90,
      grindSetting: 'Tightly Rolled Leaf (Hand-Rolled)',
      notes: '10s leaf rinse, followed by 45s first steep, then progressively longer steeps.',
      phases: [
        { name: 'Leaf Wash Rinse', durationSec: 10, instruction: 'Flash 10s pour with 90°C water to awaken rolled leaves. Discard liquid.' },
        { name: '1st Steeping Infusion', durationSec: 45, instruction: 'Steep 45s at 90°C to release floral orchid aromatics.' },
        { name: 'Decant & 2nd Infusion', durationSec: 60, instruction: 'Pour completely into pitcher to prevent bitter tannins from building.' }
      ]
    }
  },
  {
    id: 'ippodo-matcha-ceremony',
    youtubeId: '3U18SvhPqT8',
    title: 'How to Whisk Authentic Ceremonial Matcha (Usucha)',
    creator: 'Ippodo Tea Co. Kyoto',
    creatorBadge: 'Kyoto Tea Master (Est. 1717)',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    category: 'matcha',
    methodId: 'matcha_tea',
    duration: '06:12',
    views: '1.2M',
    featured: true,
    description: 'Authentic Kyoto bamboo whisking technique using stone-ground ceremonial tencha powder, temperature-controlled water, and a rapid W-motion froth.',
    recipeSync: {
      methodName: 'Ceremonial Matcha (Usucha)',
      methodId: 'matcha_tea',
      ratio: 35.0,
      doseGrams: 2.0,
      totalWaterMl: 70,
      waterTempF: 176,
      waterTempC: 80,
      grindSetting: 'Micro-Milled Tencha Powder',
      notes: 'Sift 2g into preheated bowl. Add 70mL 80°C water. Whisk with bamboo Chasen.',
      phases: [
        { name: 'Sift & Warm Bowl', durationSec: 20, instruction: 'Sift 2g matcha powder through mesh into prewarmed Chawan.' },
        { name: 'Pour Water', durationSec: 15, instruction: 'Pour 70mL of 80°C water gently down side of bowl.' },
        { name: 'Chasen Whisk', durationSec: 45, instruction: 'Whisk briskly back-and-forth in a W-pattern until creamy micro-foam covers surface.' }
      ]
    }
  },
  {
    id: 'darjeeling-first-flush-guide',
    youtubeId: 'xPqU0wWbV2A',
    title: 'Himalayan Darjeeling First Flush: Steeping the Champagne of Teas',
    creator: 'Vahdam Master Blender',
    creatorBadge: 'Orthodox Tea Taster',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    category: 'chai_black',
    methodId: 'darjeeling_tea',
    duration: '09:45',
    views: '420K',
    featured: true,
    description: 'Masterclass on delicate spring-plucked Darjeeling FTGFOP1 whole leaves, highlighting temperature management to avoid astringency and maximize muscatel grape clarity.',
    recipeSync: {
      methodName: 'Himalayan Darjeeling',
      methodId: 'darjeeling_tea',
      ratio: 50.0,
      doseGrams: 5.0,
      totalWaterMl: 250,
      waterTempF: 190,
      waterTempC: 88,
      grindSetting: 'Orthodox Whole Leaf',
      notes: 'Gentle 3-minute steep at 88°C for delicate stone fruit and floral bouquet.',
      phases: [
        { name: 'Warm Vessel', durationSec: 15, instruction: 'Pre-rinse teapot with warm water.' },
        { name: 'Aromatic Steep', durationSec: 180, instruction: 'Steep untouched at 88°C for 3 minutes.' },
        { name: 'Decant & Savor', durationSec: 30, instruction: 'Strain completely into teacup.' }
      ]
    }
  },
  {
    id: 'ranveer-authentic-masala-chai',
    youtubeId: 'v3gO8zVbZ2U',
    title: 'The Art of Traditional Masala Chai Simmering',
    creator: 'Chef Ranveer Brar',
    creatorBadge: 'Culinary Master & Historian',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    category: 'chai_black',
    methodId: 'chai_masala',
    duration: '14:20',
    views: '3.8M',
    featured: true,
    description: 'Decoction technique simmering crushed ginger root, green cardamom, cloves, and Assam CTC black tea with milk and unrefined cane jaggery.',
    recipeSync: {
      methodName: 'Masala Chai',
      methodId: 'chai_masala',
      ratio: 25.0,
      doseGrams: 10.0,
      totalWaterMl: 250,
      waterTempF: 208,
      waterTempC: 98,
      grindSetting: 'CTC Granular & Cracked Spices',
      notes: 'Simmer spices and tea in water for 4 mins, then add milk and froth.',
      phases: [
        { name: 'Spice & Tea Decoction', durationSec: 240, instruction: 'Boil crushed ginger, cardamom, and Assam CTC leaves in water for 4 minutes.' },
        { name: 'Milk Simmer & Aerate', durationSec: 120, instruction: 'Add whole milk and sugar. Bring to three rolling froths.' },
        { name: 'Double Strain', durationSec: 30, instruction: 'Strain through fine wire sieve into cup.' }
      ]
    }
  },
  {
    id: 'ippodo-sencha-green-tea',
    youtubeId: 'm4XgY6v-mR8',
    title: 'Sencha & Gyokuro: The Japanese Low-Temperature Extraction Secret',
    creator: 'Japanese Tea Sommelier',
    creatorBadge: 'Nihoncha Certified Instructor',
    creatorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    category: 'green_white',
    methodId: 'green_tea',
    duration: '08:30',
    views: '650K',
    featured: false,
    description: 'How to steep Japanese steamed green tea (Sencha & Gyokuro) using cooled water (70°C - 78°C) to prevent catechin bitterness and unlock savory umami sweetness.',
    recipeSync: {
      methodName: 'Specialty Green Tea',
      methodId: 'green_tea',
      ratio: 50.0,
      doseGrams: 4.0,
      totalWaterMl: 200,
      waterTempF: 172,
      waterTempC: 78,
      grindSetting: 'Steamed Whole Leaf',
      notes: 'Cool boiling water first in a Yuzamashi cooling bowl before pouring over leaves.',
      phases: [
        { name: 'Cool Water & Warm Kyusu', durationSec: 15, instruction: 'Pour hot water into cooling cup to drop temp to 78°C.' },
        { name: 'Gentle Infusion', durationSec: 120, instruction: 'Pour 78°C water over leaves. Do not shake teapot.' },
        { name: 'Even Drop Decant', durationSec: 90, instruction: 'Pour alternating drops into each cup until last golden drop.' }
      ]
    }
  }
];

