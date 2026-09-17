/**
 * LooseLeaf — Specialty Tea Steeping Data & Botanical Knowledge Compendium
 * Dedicated exclusively to fine loose leaf tea varieties, leaf grades, terroirs, and water chemistry.
 */

export const TEA_METHODS = [
  {
    "id": "darjeeling_tea",
    "name": "Himalayan Darjeeling Tea (The Champagne of Teas)",
    "category": "tea",
    "featured": true,
    "heroImage": "/tea_ceremony.jpg",
    "ratio": 50,
    "defaultCupMl": 240,
    "tempC": 88,
    "tempF": 190,
    "leafGrade": "FTGFOP1 Whole Leaf",
    "description": "Grown in high-altitude misty Himalayan ridges. Renowned for delicate muscatel grape clarity, peach notes, and crisp amber finish.",
    "phases": [
      {
        "name": "Vessel Preheat",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Rinse porcelain or glass teapot with warm water to maintain steep temperature."
      },
      {
        "name": "Aromatic Himalayan Steep",
        "durationSec": 180,
        "waterMultiplier": 1,
        "instruction": "Pour 88°C water over leaves. Steep 3 minutes for peak muscatel grape bouquet."
      },
      {
        "name": "Decant & Serve",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Strain completely into teacup to stop extraction."
      }
    ],
    "preferredTeaTypes": "First & Second Flush Himalayan Darjeeling (West Bengal, India). High altitude garden lots yielding muscatel, floral, and stone fruit elegance."
  },
  {
    "id": "chai_masala",
    "name": "Masala Chai (Spiced Assam & Botanical Infusion)",
    "category": "tea",
    "featured": true,
    "heroImage": "/tea_kettle.jpg",
    "ratio": 25,
    "defaultCupMl": 250,
    "tempC": 98,
    "tempF": 208,
    "leafGrade": "CTC Assam Black Tea & Whole Cracked Spices",
    "description": "Robust, comforting Indian spiced tea simmered with green cardamom, Ceylon cinnamon, organic ginger root, cloves, and black pepper.",
    "phases": [
      {
        "name": "Spice & Leaf Decoction Simmer",
        "durationSec": 240,
        "waterMultiplier": 1,
        "instruction": "Boil crushed spices and tea leaves in water for 4 minutes to extract essential oils."
      },
      {
        "name": "Milk & Sweetener Rest",
        "durationSec": 120,
        "waterMultiplier": 1,
        "instruction": "Add milk and unrefined cane sugar (Panela/Jaggery); bring to gentle froth."
      },
      {
        "name": "Fine Mesh Strain",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Pour through fine sieve into mug."
      }
    ],
    "preferredTeaTypes": "Brahmaputra Valley Assam CTC with green cardamom, Ceylon cinnamon bark, organic ginger root, and star anise."
  },
  {
    "id": "english_breakfast",
    "name": "English Breakfast Tea (Malty Assam & Ceylon Blend)",
    "category": "tea",
    "featured": true,
    "heroImage": "/tea_kettle.jpg",
    "ratio": 50,
    "defaultCupMl": 250,
    "tempC": 96,
    "tempF": 205,
    "leafGrade": "Orthodox Broken Orange Pekoe",
    "description": "Classic rich, full-bodied morning black tea blend combining Assam malty strength, Ceylon crispness, and Kenyan amber depth.",
    "phases": [
      {
        "name": "Teapot Warm",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Rinse teapot with near-boiling water."
      },
      {
        "name": "Full Extraction Steep",
        "durationSec": 240,
        "waterMultiplier": 1,
        "instruction": "Steep at 96°C for 4 minutes for robust body without harshness."
      },
      {
        "name": "Serve & Rest",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Remove infuser basket completely."
      }
    ],
    "preferredTeaTypes": "High-grown Assam, Sri Lankan Ceylon Dimbula, and Rift Valley Kenyan Orthodox leaves offering malty cocoa and toast notes."
  },
  {
    "id": "earl_grey",
    "name": "Earl Grey Tea (Italian Bergamot Oil Infused)",
    "category": "tea",
    "featured": true,
    "heroImage": "/tea_ceremony.jpg",
    "ratio": 50,
    "defaultCupMl": 240,
    "tempC": 95,
    "tempF": 203,
    "leafGrade": "Full-Leaf Black & Cold-Pressed Bergamot Oil",
    "description": "Aromatic black tea infused with natural cold-pressed oil of Italian bergamot citrus. Fragrant floral citrus aroma balanced with malty cocoa depth.",
    "phases": [
      {
        "name": "Vessel Warm",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Rinse ceramic teapot with hot water."
      },
      {
        "name": "Aromatic Citrus Steep",
        "durationSec": 210,
        "waterMultiplier": 1,
        "instruction": "Steep untouched at 95°C for 3.5 minutes to release citrus aromatics."
      },
      {
        "name": "Decant",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Separate tea leaves from liqueur."
      }
    ],
    "preferredTeaTypes": "Calabrian organic bergamot oil blended with Orthodox Ceylon and Assam estate black teas."
  },
  {
    "id": "green_tea",
    "name": "Specialty Green Tea (Dragonwell / Sencha)",
    "category": "tea",
    "featured": false,
    "heroImage": "/tea_ceremony.jpg",
    "ratio": 50,
    "defaultCupMl": 200,
    "tempC": 78,
    "tempF": 172,
    "leafGrade": "Whole Leaf (Steamed / Pan-Fired)",
    "description": "Delicate low-temp steeping to preserve fresh umami, sweet grassy aromas, and high L-theanine amino acids without bitter tannins.",
    "phases": [
      {
        "name": "Vessel Preheat",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Warm teapot or glass with warm water, then discard water."
      },
      {
        "name": "1st Steeping Infusion",
        "durationSec": 120,
        "waterMultiplier": 1,
        "instruction": "Pour 78°C water gently over leaves. Do not agitate."
      },
      {
        "name": "Decant & 2nd Infusion Prep",
        "durationSec": 90,
        "waterMultiplier": 1,
        "instruction": "Pour completely into server. Leaves ready for 2nd steep."
      }
    ],
    "preferredTeaTypes": "Japanese Sencha & Gyokuro, Chinese West Lake Longjing. Steamed & pan-fired green leaves high in L-theanine amino acids."
  },
  {
    "id": "matcha_tea",
    "name": "Japanese Ceremonial Matcha (Usucha Whisk)",
    "category": "tea",
    "featured": true,
    "heroImage": "/tea_ceremony.jpg",
    "ratio": 35,
    "defaultCupMl": 100,
    "tempC": 80,
    "tempF": 176,
    "leafGrade": "Micro-Milled Ceremonial Tencha Powder",
    "description": "Vibrant jade-green stone-ground powdered tea whisked in a Chawan bowl into a creamy micro-foam. Rich in umami sweetness, chlorophyll, and antioxidants.",
    "phases": [
      {
        "name": "Sift & Warm Bowl",
        "durationSec": 20,
        "waterMultiplier": 0,
        "instruction": "Sift 2g matcha powder through fine mesh into warm Chawan bowl."
      },
      {
        "name": "Water Add & Bloom",
        "durationSec": 15,
        "waterMultiplier": 1,
        "instruction": "Pour 70mL of 80°C water gently down side of bowl."
      },
      {
        "name": "Chasen Bamboo Whisk",
        "durationSec": 45,
        "waterMultiplier": 1,
        "instruction": "Whisk rapidly in a zig-zag \"W\" motion using bamboo Chasen until rich froth forms."
      }
    ],
    "preferredTeaTypes": "Uji & Yame First-Harvest Ceremonial Grade Tencha leaves ground on traditional granite stone mills."
  },
  {
    "id": "oolong_tea",
    "name": "Oolong Tea (Gongfu Hand-Rolled)",
    "category": "tea",
    "featured": false,
    "heroImage": "/tea_ceremony.jpg",
    "ratio": 30,
    "defaultCupMl": 150,
    "tempC": 88,
    "tempF": 190,
    "leafGrade": "Tightly Rolled Leaf",
    "description": "High-leaf ratio Gongfu steeping revealing evolving layers of orchid florals, toasted honey, lilac, and rock mineral depth over 5+ infusions.",
    "phases": [
      {
        "name": "Leaf Wash Rinse",
        "durationSec": 10,
        "waterMultiplier": 1,
        "instruction": "Quick 10-second flash pour to wake rolled leaves; discard liquid."
      },
      {
        "name": "1st Infusion",
        "durationSec": 45,
        "waterMultiplier": 1,
        "instruction": "Steep 45 seconds at 88°C for rich aroma peak."
      },
      {
        "name": "2nd Infusion",
        "durationSec": 60,
        "waterMultiplier": 1,
        "instruction": "Add 15s to steep time. Full floral body unfolding."
      }
    ],
    "preferredTeaTypes": "Taiwanese High Mountain Alishan, Wuyi Rock Da Hong Pao, Dong Ding Oolong. Hand-rolled oolongs releasing floral butter, lilac, and rock mineral depth."
  },
  {
    "id": "ceylon_tea",
    "name": "Ceylon High-Grown Tea (Sri Lankan Black Tea)",
    "category": "tea",
    "featured": false,
    "heroImage": "/tea_kettle.jpg",
    "ratio": 50,
    "defaultCupMl": 240,
    "tempC": 95,
    "tempF": 203,
    "leafGrade": "Orthodox High-Grown Ceylon BOP",
    "description": "Cultivated in the misty Nuwara Eliya and Dimbula mountain peaks of Sri Lanka. Crisp citrus notes, golden copper color, and brisk invigorating finish.",
    "phases": [
      {
        "name": "Vessel Warm",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Rinse teapot with hot water."
      },
      {
        "name": "Brisk Mountain Steep",
        "durationSec": 210,
        "waterMultiplier": 1,
        "instruction": "Steep at 95°C for 3.5 minutes for bright citrus acidity."
      },
      {
        "name": "Decant & Serve",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Strain completely into cup."
      }
    ],
    "preferredTeaTypes": "Single-estate Nuwara Eliya & Uva Ceylon black teas with citrus zest, woodsy cedar, and crisp brisk tannin."
  },
  {
    "id": "white_tea",
    "name": "White Tea (Silver Needle / White Peony)",
    "category": "tea",
    "featured": false,
    "heroImage": "/tea_ceremony.jpg",
    "ratio": 60,
    "defaultCupMl": 240,
    "tempC": 83,
    "tempF": 181,
    "leafGrade": "Unoxidized Buds & Young Leaves",
    "description": "Subtle, sweet, and velvety texture with notes of honeysuckle and soft melon. Hand-harvested spring buds with silver downy hairs.",
    "phases": [
      {
        "name": "Vessel Preheat",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Warm ceramic teapot with warm water."
      },
      {
        "name": "Long Floral Infusion",
        "durationSec": 180,
        "waterMultiplier": 1,
        "instruction": "Steep untouched at 83°C to unlock delicate essential oils."
      },
      {
        "name": "Decant",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Strain fully to prevent over-steeping the leaves."
      }
    ],
    "preferredTeaTypes": "Fujian Silver Needle (Bai Hao Yin Zhen) & White Peony. Whole unoxidized buds rich in delicate melon and honeysuckle floral oils."
  },
  {
    "id": "turmeric_tea",
    "name": "Golden Turmeric Botanical Tea (Herbal Infusion)",
    "category": "tea",
    "featured": true,
    "heroImage": "/tea_kettle.jpg",
    "ratio": 40,
    "defaultCupMl": 250,
    "tempC": 98,
    "tempF": 208,
    "leafGrade": "Crushed Organic Turmeric Root & Botanicals",
    "description": "Caffeine-free wellness infusion combining golden turmeric root, ginger, lemongrass, black pepper (for curcumin absorption), and raw honey.",
    "phases": [
      {
        "name": "Botanical Hydration",
        "durationSec": 15,
        "waterMultiplier": 0,
        "instruction": "Place crushed turmeric and botanicals into infuser."
      },
      {
        "name": "Deep Botanical Steep",
        "durationSec": 300,
        "waterMultiplier": 1,
        "instruction": "Steep 5 minutes with boiling 98°C water for rich golden extraction."
      },
      {
        "name": "Honey & Citrus Stir",
        "durationSec": 30,
        "waterMultiplier": 1,
        "instruction": "Stir in raw honey and squeeze of fresh lemon."
      }
    ],
    "preferredTeaTypes": "Organic Alleppey Turmeric root, ginger root, lemongrass, black pepper, and cinnamon bark."
  },
  {
    "id": "puerh_tea",
    "name": "Aged Pu-erh Tea (Shou / Sheng Gongfu)",
    "category": "tea",
    "featured": false,
    "heroImage": "/tea_kettle.jpg",
    "ratio": 20,
    "defaultCupMl": 150,
    "tempC": 99,
    "tempF": 210,
    "leafGrade": "Aged Compressed Tea Leaves & Gushu Buds",
    "description": "Post-fermented tea cakes from Yunnan. Dense liquor with sweet damp earth, camphor wood, and dark chocolate undertones.",
    "preferredTeaTypes": "Menghai Shou Ripe Pu-erh or Aged Spring Sheng Raw Pu-erh from ancient wild tea trees.",
    "phases": [
      {
        "name": "Awakening Boiling Rinse",
        "durationSec": 10,
        "waterMultiplier": 1,
        "instruction": "Pour boiling water over leaf cake chunks; flash discard after 10s to awaken aged leaves."
      },
      {
        "name": "1st Deep Earth Infusion",
        "durationSec": 25,
        "waterMultiplier": 1,
        "instruction": "Steep 25 seconds with active rolling boil (99°C)."
      },
      {
        "name": "Decant & Subsequent Steeps",
        "durationSec": 20,
        "waterMultiplier": 1,
        "instruction": "Decant completely into pitcher. Leaves endure 8-12 successive infusions."
      }
    ]
  }
];

export const BREW_METHODS = Object.assign([...TEA_METHODS], {
  tea: TEA_METHODS,
  list: TEA_METHODS
});


export const GRIND_VISUAL_GUIDE = [
  {
    "id": "matcha_powder",
    "name": "Ceremonial Stone-Ground Tencha",
    "micron": "5 - 15 µm",
    "image": "/tea_ceremony.jpg",
    "textureComparison": "Micro-Milled Silk / Powder",
    "visualDensity": "Ultra-Fine Jade Dust",
    "suitableMethods": [
      "Ceremonial Matcha (Usucha)",
      "Matcha Latte Prep"
    ],
    "burrSettingTip": "Slow granite stone milled (40g per hour) to preserve vibrant chlorophyll and sweet L-theanine amino acids.",
    "sensoryImpact": "Complete liquid suspension creating velvet froth, deep brothy umami, and zero astringency."
  },
  {
    "id": "fannings_dust",
    "name": "Fannings & Fine Sachet Cut",
    "micron": "200 - 500 µm",
    "image": "/tea_kettle.jpg",
    "textureComparison": "Fine Ground Pepper",
    "visualDensity": "Uniform Fine Leaf Particles",
    "suitableMethods": [
      "Brisk Morning Infusions",
      "Specialty Pyramid Sachets"
    ],
    "burrSettingTip": "High surface area yields instant deep copper color and bold brisk extraction within 60 to 90 seconds.",
    "sensoryImpact": "Rapid tannin dissolution creating strong brisk liquor; excellent with milk or honey."
  },
  {
    "id": "ctc_granular",
    "name": "CTC Granular (Crush-Tear-Curl)",
    "micron": "800 - 1500 µm",
    "image": "/tea_kettle.jpg",
    "textureComparison": "Dense Tiny Pellets",
    "visualDensity": "Uniform Dark Brown Spheres",
    "suitableMethods": [
      "Masala Chai Decoction",
      "Karak Chai Simmer"
    ],
    "burrSettingTip": "Mechanically rolled into dense pellets specifically formulated to withstand prolonged boiling with milk and spices.",
    "sensoryImpact": "Deep malty spine and robust amber liquor that asserts itself cleanly through whole milk, cinnamon, and fresh ginger."
  },
  {
    "id": "broken_leaf",
    "name": "Broken Orange Pekoe (BOP)",
    "micron": "1.5 - 3.0 mm",
    "image": "/tea_ceremony.jpg",
    "textureComparison": "Cracked Amber Leaf Flakes",
    "visualDensity": "Medium Orthodox Broken Leaves",
    "suitableMethods": [
      "English Breakfast",
      "Ceylon High-Grown",
      "Earl Grey"
    ],
    "burrSettingTip": "Traditional orthodox broken cut designed for balanced extraction speed, golden amber clarity, and crisp structure.",
    "sensoryImpact": "Bright citric zest, brisk lively astringency, and comforting malty finish."
  },
  {
    "id": "rolled_pearl",
    "name": "Hand-Rolled Leaves & Pearls",
    "micron": "3.0 - 6.0 mm",
    "image": "/tea_ceremony.jpg",
    "textureComparison": "Rolled Spheres / Beads",
    "visualDensity": "Tightly Rolled Leaf Clusters",
    "suitableMethods": [
      "Gongfu Oolong (Alishan)",
      "Jasmine Dragon Pearls",
      "Tieguanyin"
    ],
    "burrSettingTip": "Hand-rolled during oxidation. Performs best with a 10s flash hot-water rinse before multi-steeping.",
    "sensoryImpact": "Slowly uncurls across 6+ infusions, successively revealing lilac floral, buttered orchid, and mineral rock notes."
  },
  {
    "id": "whole_leaf",
    "name": "Orthodox Whole Leaf & Silver Buds",
    "micron": "10 - 25 mm",
    "image": "/tea_ceremony.jpg",
    "textureComparison": "Intact Dried Whole Leaves & Needle Buds",
    "visualDensity": "Long Silver Downy Needles",
    "suitableMethods": [
      "Darjeeling First Flush",
      "Silver Needle (Bai Hao Yin Zhen)",
      "Dragonwell (Longjing)"
    ],
    "burrSettingTip": "Hand-plucked tender spring tips and unoxidized buds dried completely intact with zero machine crushing.",
    "sensoryImpact": "Supreme liquor clarity, honeysuckle nectar sweetness, muscatel grape brightness, and silky L-theanine mouthfeel."
  }
];

export const TEA_BELT_OVERVIEW = {
  "title": "The Global Tea Terroirs & Mountain Gardens",
  "description": "Specialty tea thrives in misty high-altitude microclimates across Asia and the Himalayas, where mountain fog, cool night temperatures, and rich soils concentrate sweet L-theanine amino acids and aromatic essential oils.",
  "macroRegions": [
    {
      "name": "East Asia (China, Japan & Taiwan)",
      "leader": "Birthplace of Tea, Green Tea & High Mountain Oolong",
      "characteristics": "From shaded Uji Gyokuro rich in umami to high-elevation Taiwanese Alishan oolongs with floral orchid aromas and Fujian Silver Needle white tea."
    },
    {
      "name": "South Asia (India & Sri Lanka)",
      "leader": "Led by Darjeeling, Assam & Ceylon High-Grown",
      "characteristics": "High-altitude Himalayan Darjeeling offering prized muscatel grape clarity, malty full-bodied Brahmaputra Assam, and crisp citrusy Nuwara Eliya Ceylon."
    },
    {
      "name": "Rift Valley & Southeast Asia",
      "leader": "Led by Kenya, Vietnam & Thailand",
      "characteristics": "High-elevation volcanic red soils yielding bright, brisk, antioxidant-rich black teas and ancient wild tea tree forests."
    }
  ]
};

export const BOTANICAL_COMPARISON = {
  "title": "Camellia sinensis: Sinensis vs. Assamica",
  "description": "All authentic specialty tea originates from Camellia sinensis. Two primary botanical varieties define global flavor profiles, leaf morphology, and extraction dynamics.",
  "sinensis": {
    "name": "Camellia sinensis var. sinensis",
    "commonName": "Small-Leaf Chinese Variety",
    "nativeRegion": "Southwestern & Eastern China",
    "leafSize": "Small, delicate leaves (3–6 cm)",
    "coldHardiness": "Tolerates frost and mountain cold (-10°C)",
    "chemicalProfile": "Rich in sweet L-theanine amino acids; moderate catechins",
    "flavorSignature": "Delicate floral, sweet grassy, melon, orchid, and honey",
    "primaryTeas": "Green Tea (Longjing, Sencha), White Tea (Silver Needle), High Mountain Oolong"
  },
  "assamica": {
    "name": "Camellia sinensis var. assamica",
    "commonName": "Broad-Leaf Assam Variety",
    "nativeRegion": "Assam, Yunnan, and Northern Indochina",
    "leafSize": "Large, broad, glossy leaves (15–20 cm)",
    "coldHardiness": "Strictly tropical/subtropical; zero frost tolerance",
    "chemicalProfile": "Higher caffeine, robust polyphenols, bold theaflavins",
    "flavorSignature": "Malty, bold cocoa, dried dark fruit, stone fruit, and brisk tannins",
    "primaryTeas": "Assam CTC, English Breakfast, Traditional Chai, Yunnan Shou Pu-erh"
  },
  "varieties": {
    "sinensis": {
      "name": "Camellia sinensis var. sinensis",
      "commonName": "Small-Leaf Chinese Variety",
      "nativeRegion": "Southwestern & Eastern China",
      "leafSize": "Small, delicate leaves (3–6 cm)",
      "coldHardiness": "Tolerates frost and high mountain cold (up to -10°C)",
      "chemicalProfile": "High in sweet L-theanine amino acids; lower caffeine and moderate catechins",
      "flavorSignature": "Delicate floral, sweet grassy, melon, orchid, and silky honey notes",
      "primaryTeas": "Green Tea (Longjing, Sencha), White Tea (Silver Needle), High Mountain Oolong"
    },
    "assamica": {
      "name": "Camellia sinensis var. assamica",
      "commonName": "Broad-Leaf Assam Variety",
      "nativeRegion": "Assam, Yunnan, and Northern Indochina",
      "leafSize": "Large, broad, glossy leaves (15–20 cm)",
      "coldHardiness": "Strictly tropical/subtropical; susceptible to frost",
      "chemicalProfile": "Higher caffeine, robust polyphenols, bold theaflavins and thearubigins",
      "flavorSignature": "Malty, bold cocoa, dried dark fruit, stone fruit, and brisk tannins",
      "primaryTeas": "Assam CTC, English Breakfast, Traditional Chai, Yunnan Shou Pu-erh"
    }
  }
};

export const TERROIR_ATLAS = {
  tea: [
  {
    "id": "fujian_china",
    "country": "Fujian Province, China",
    "flag": "🇨🇳",
    "macroRegion": "East Asia (Birthplace of White & Oolong Tea)",
    "regions": "Fuding, Zhenghe, Anxi County, Wuyi Mountains",
    "altitude": "600 - 1,400 meters",
    "soilType": "Red Acidic Volcanic Clay & Rocky Granite Scree",
    "climate": "Humid subtropical mist with heavy mountain dew cycles",
    "genetics": "Fuding Da Bai, Zhenghe Da Bai, Anxi Tieguanyin Cultivars",
    "processing": "Sun-Withered White Tea & Semi-Oxidized Rolled Oolong",
    "flavorNotes": [
      "Honeysuckle Floral",
      "Fresh Melon",
      "Orchid Blossom",
      "Chestnut Sweetness",
      "Velvety Body"
    ],
    "acidProfile": "Subtle Sweet L-Theanine Amino Acids",
    "agronomyDeepDive": "Fujian is the historic birthplace of white tea and Gongfu oolong. Cool ocean mountain mists and iron-rich acidic soils encourage tea buds to develop dense silver trichome hairs packed with L-theanine and floral essential oils.",
    "roastPairing": "Light Sun-Withered to Medium Charcoal Roast",
    "recommendedMethod": "Specialty Green & White Tea (83°C)",
    "famousTeas": [
      "Silver Needle White Tea",
      "Iron Goddess of Mercy (Tieguanyin)"
    ],
    "steepStyle": "80°C - 88°C Gongfu Steeping",
    "sourcedBrands": [
      {
        "name": "Ippodo Tea Co.",
        "offering": "Fuding Silver Needle & Imperial Jasmine",
        "note": "Hand-picked spring buds with honeysuckle nectar, fresh melon, and velvety clarity."
      },
      {
        "name": "In Pursuit of Tea",
        "offering": "Anxi Master Grade Autumn Tieguanyin",
        "note": "Traditional charcoal-roasted oolong with orchid aromatics and lingering sweet aftertaste."
      },
      {
        "name": "Verdant Tea",
        "offering": "Zhenghe First Flush White Peony (Bai Mu Dan)",
        "note": "Sun-dried whole buds and leaves releasing wild honey, apricot, and soft floral finish."
      }
    ]
  },
  {
    "id": "uji_japan",
    "country": "Uji, Kyoto, Japan",
    "flag": "🇯🇵",
    "macroRegion": "East Asia (Shaded Gyokuro & Matcha Terroir)",
    "regions": "Uji, Kyotanabe, Shirakawa, Wazuka Valley",
    "altitude": "200 - 600 meters",
    "soilType": "Rich Alluvial River Basin Soil along the Uji River",
    "climate": "Cool damp morning fog with high temperature swings between day & night",
    "genetics": "Yabukita, Gokou, Samidori, Asahi Camellia sinensis Cultivars",
    "processing": "20-Day Tana Rice-Straw Shading, Steaming (Aracha), & Stone Milling",
    "flavorNotes": [
      "Deep Seaweed Umami",
      "Sweet Buttered Edamame",
      "Fresh Steamed Spinach",
      "Zero Tannin Bitterness"
    ],
    "acidProfile": "High Glutamic Acid & Umami Sweetness",
    "agronomyDeepDive": "Uji is Japan’s most revered tea terroir. Rice-straw shading mats (Tana) block 90% of sunlight for 20 days prior to spring harvest, preventing L-theanine amino acids from converting into astringent tannins and creating thick savory umami.",
    "roastPairing": "Deep Steamed (Fukamushi) Green Tea",
    "recommendedMethod": "Specialty Green Tea (75°C - 78°C)",
    "famousTeas": [
      "Uji Ceremonial Matcha",
      "Gyokuro Shadow Green Tea"
    ],
    "steepStyle": "60°C - 78°C Low-Temp Steeping",
    "sourcedBrands": [
      {
        "name": "Ippodo Tea Co. Kyoto",
        "offering": "Uji Ceremonial Ummon Matcha & Kan-no-shiro",
        "note": "Kyoto stone-ground spring matcha with rich jade froth, brothy umami, and zero bitterness."
      },
      {
        "name": "Kettl Tea",
        "offering": "Wazuka Gokou Gyokuro Single Cultivar",
        "note": "Shaded 21 days with buttered edamame sweetness, oceanic breeze, and deep green liqueur."
      },
      {
        "name": "Den’s Tea",
        "offering": "Deep-Steamed Uji Sencha Extra Fine",
        "note": "Rich emerald green tea with sweet grassy notes and soothing savory mouthfeel."
      }
    ]
  },
  {
    "id": "wuyi_china",
    "country": "Wuyi Mountains, China",
    "flag": "🇨🇳",
    "macroRegion": "East Asia (UNESCO Rock Oolong & Lapsang Souchong)",
    "regions": "Wuyishan National Park, Zhengyan Inner Rock Escarpments",
    "altitude": "700 - 1,200 meters",
    "soilType": "Red Conglomerate Sandstone & Weathered Volcanic Mineral Scree",
    "climate": "Sheltered gorge microclimates with perpetual mountain springs",
    "genetics": "Da Hong Pao, Rou Gui, Shui Xian, Lapsang Small Bush Cultivars",
    "processing": "Pine-Smoked Black Tea & Multi-Stage Charcoal Pit Roasting",
    "flavorNotes": [
      "Mineral Rock Yan Yun",
      "Roasted Honey",
      "Smoky Pine Tar",
      "Dried Longan Fruit",
      "Spiced Cinnamon"
    ],
    "acidProfile": "Mineral-Rich Tannin Structure",
    "agronomyDeepDive": "High in UNESCO-protected red sandstone gorges, Wuyi rock teas (Yancha) absorb volcanic minerals from cliff springs. Roasted over bamboo charcoal pits for up to 24 hours, they yield legendary \"Yan Yun\" (Rock Rhyme) depth.",
    "roastPairing": "Heavy Charcoal Fire Roasted",
    "recommendedMethod": "Oolong Tea Gongfu Style (88°C - 95°C)",
    "famousTeas": [
      "Da Hong Pao (Big Red Robe)",
      "Smoky Lapsang Souchong"
    ],
    "steepStyle": "90°C - 95°C Boiling Flash Infusion",
    "sourcedBrands": [
      {
        "name": "Red Blossom Tea Company",
        "offering": "Zhengyan Master Da Hong Pao Rock Oolong",
        "note": "Cliff-grown hand-roasted Yancha with stone mineral depth, roasted peach, and Yan Yun finish."
      },
      {
        "name": "Song Tea & Ceramics",
        "offering": "Wuyi Cliffside Rou Gui (Cinnamon Oolong)",
        "note": "Intense spicy cinnamon aroma, toasted walnut, and persistent sweet throat resonance."
      },
      {
        "name": "Mei Leaf",
        "offering": "Traditional Pine-Smoked Lapsang Souchong",
        "note": "Smoked over wild Horsetail pine wood with dried longan fruit, sweet pipe resin, and malt."
      }
    ]
  },
  {
    "id": "darjeeling_india",
    "country": "Darjeeling, India",
    "flag": "🇮🇳",
    "macroRegion": "South Asia (Champagne of Teas)",
    "regions": "Himalayan Foothills, Kurseong Valley, Mirik, Kalimpong",
    "altitude": "1,200 - 2,000 meters",
    "soilType": "Porous Mountain Loam rich in Organic Forest Leaf Residue",
    "climate": "Chilly Himalayan mist currents with high ultraviolet sunlight radiation",
    "genetics": "Sinensis & China Hybrid High-Altitude Bush Selections",
    "processing": "Lightly Oxidized 1st Flush & Rich Muscatel 2nd Flush Harvests",
    "flavorNotes": [
      "Muscatel Grape",
      "Crisp Peach Skin",
      "Wildflower Honey",
      "Brilliant Amber Liqueur",
      "Citrus Zest"
    ],
    "acidProfile": "Crisp Sparkling Malic Acidity",
    "agronomyDeepDive": "Perched on high Himalayan slopes facing Mt. Kanchenjunga, high UV light and mountain chill slow leaf growth. 1st Flush spring harvests produce pale green cups with sparkling muscatel grape clarity.",
    "roastPairing": "Un-roasted Orthodox Whole Leaf",
    "recommendedMethod": "Full-Leaf Black Tea (95°C)",
    "famousTeas": [
      "Darjeeling 1st Flush Spring Harvest",
      "Darjeeling 2nd Flush Muscatel"
    ],
    "steepStyle": "88°C - 96°C 4-Minute Steep",
    "sourcedBrands": [
      {
        "name": "Vahdam India Direct",
        "offering": "Darjeeling Summer 2nd Flush Arya Estate",
        "note": "Single estate muscatel black tea with notes of ripe passionfruit, wild honey, and amber clarity."
      },
      {
        "name": "Fortnum & Mason London",
        "offering": "Famous Darjeeling Jungpana Estate 1st Flush",
        "note": "Iconic London tea merchant lot with delicate peach blossom, white grape, and crisp astringency."
      },
      {
        "name": "Harney & Sons",
        "offering": "Darjeeling Superfine Tippy Golden Flowery Orange Pekoe",
        "note": "Classic Himalayan tea with muscatel grape body, floral aroma, and smooth finish."
      }
    ]
  },
  {
    "id": "yunnan_china",
    "country": "Yunnan Province, China",
    "flag": "🇨🇳",
    "macroRegion": "East Asia (Ancient Wild Tea Trees & Aged Pu-erh)",
    "regions": "Xishuangbanna, Menghai, Lincang, Pu’er City",
    "altitude": "1,400 - 2,200 meters",
    "soilType": "Deep Tropical Forest Humus & Red Clay",
    "climate": "Subtropical monsoon jungle with 800-year-old ancient wild tea trees (Gushu)",
    "genetics": "Camellia sinensis var. assamica (Large-Leaf Broad Cultivars)",
    "processing": "Sun-Dried Sheng Raw Pu-erh & Pile-Fermented Shou Ripe Pu-erh Cakes",
    "flavorNotes": [
      "Damp Forest Floor",
      "Rich Sweet Molasses",
      "Camphor & Pipe Tobacco",
      "Aged Plum",
      "Dark Bittersweet Cocoa"
    ],
    "acidProfile": "Deep Earthy Low-Acidity Microbial Ferment",
    "agronomyDeepDive": "Yunnan is home to 1,000-year-old wild tea trees. Leaves harvested from large-leaf Daye cultivars are compressed into tea cakes and aged for decades to develop deep earthiness, camphor, and dark cocoa sweetness.",
    "roastPairing": "Wet Pile Microbial Post-Fermented",
    "recommendedMethod": "Pu-erh & Herbal Infusions (98°C)",
    "famousTeas": [
      "Aged Shou Ripe Pu-erh Tea Cakes",
      "Wild Spring Sheng Raw Pu-erh"
    ],
    "steepStyle": "98°C Boiling Rinse & Multi-Steep",
    "sourcedBrands": [
      {
        "name": "Yunnan Sourcing",
        "offering": "Menghai 10-Year Aged Shou Ripe Pu-erh Cake",
        "note": "Smooth post-fermented tea cake with sweet damp earth, camphor wood, and dark chocolate liqueur."
      },
      {
        "name": "White2Tea",
        "offering": "Ancient Tree Spring Sheng Raw Pu-erh (Gushu)",
        "note": "Hand-panned wild large leaf tea boasting stone fruit nectar, powerful Cha Qi energy, and honeysuckle."
      },
      {
        "name": "Global Tea Hut",
        "offering": "Lincang Wild Large-Leaf Dian Hong Black Tea",
        "note": "Golden tipped jungle black tea with rich malt, sweet yam, and floral cocoa complexity."
      }
    ]
  }
  ]
};


export const MASTERCLASSES = [
  {
    "id": "mc_gongfu_steps",
    "track": "tea",
    "methodId": "oolong_tea",
    "method": "Oolong Tea",
    "title": "The 14 Steps of Gong Fu Tea (Walkthrough Guide)",
    "duration": "12:30",
    "thumbnail": "https://img.youtube.com/vi/vxYWCijfZn0/hqdefault.jpg",
    "embedId": "vxYWCijfZn0",
    "description": "A step-by-step walkthrough guide by Mei Leaf on gaiwan handling, leaf awakening, and multi-steep oolong infusions.",
    "keyTakeaways": [
      "Rinse leaves for 5-10s to open rolled oolong tea balls",
      "Pour water down gaiwan rim to avoid scorching delicate leaves",
      "Increase steep time by 5-10 seconds per subsequent infusion"
    ]
  },
  {
    "id": "mc_gongfu_teaware",
    "track": "tea",
    "methodId": "oolong_tea",
    "method": "Oolong Tea",
    "title": "Gong Fu Tea Teaware 101",
    "duration": "14:15",
    "thumbnail": "https://img.youtube.com/vi/Ia4oup1v4tU/hqdefault.jpg",
    "embedId": "Ia4oup1v4tU",
    "description": "Mei Leaf breaks down essential teaware from simple gaiwans to Yixing clay pots and fairness cups.",
    "keyTakeaways": [
      "Porcelain gaiwans offer pure, uncolored flavor assessment",
      "Yixing clay softens minerals and rounds out roasted oolongs",
      "Use a fairness cup (Cha Hai) to ensure even strength for all cups"
    ]
  },
  {
    "id": "mc_green_explained",
    "track": "tea",
    "methodId": "green_tea",
    "method": "Green Tea",
    "title": "Chinese Green Tea Explained: 11 Famous Teas",
    "duration": "18:40",
    "thumbnail": "https://img.youtube.com/vi/nOUSfwF5Z3U/hqdefault.jpg",
    "embedId": "nOUSfwF5Z3U",
    "description": "Mei Leaf compares 11 legendary green teas, explaining harvest timing, pan-firing, and temperature control.",
    "keyTakeaways": [
      "Never use boiling water on green tea leaves (75°C-80°C is ideal)",
      "Preheat glassware and decant completely between infusions",
      "Preserves sweet grassy umami and prevents bitter astringency"
    ]
  },
  {
    "id": "mc_steamed_green",
    "track": "tea",
    "methodId": "green_tea",
    "method": "Green Tea",
    "title": "China's Famous Steamed Green Tea Tasting",
    "duration": "15:10",
    "thumbnail": "https://img.youtube.com/vi/1S8PRIvqV60/hqdefault.jpg",
    "embedId": "1S8PRIvqV60",
    "description": "Exploring steamed green tea processing, leaf chlorophyll preservation, and marine sweetness.",
    "keyTakeaways": [
      "Steaming halts oxidation while preserving emerald green color",
      "Yields rich marine umami, nori, and sweet grassy aromatics",
      "Steep short 60-90 second infusions in porcelain or glass"
    ]
  },
  {
    "id": "mc_white_silverneedle",
    "track": "tea",
    "methodId": "white_tea",
    "method": "White Tea",
    "title": "Silver Needle White Tea Masterclass",
    "duration": "6:15",
    "thumbnail": "https://img.youtube.com/vi/74kotpiKUo0/hqdefault.jpg",
    "embedId": "74kotpiKUo0",
    "description": "Red Blossom Tea Company explores premium single-bud Silver Needle (Bai Hao Yin Zhen) harvesting and gentle steeping.",
    "keyTakeaways": [
      "Steep at 85°C (185°F) for 3-4 minutes without leaf agitation",
      "Whole unoxidized trichome buds release honeysuckle sweetness",
      "Lowest processing of any tea preserves delicate antioxidants"
    ]
  },
  {
    "id": "mc_white_baimudan",
    "track": "tea",
    "methodId": "white_tea",
    "method": "White Tea",
    "title": "Bai Mu Dan (White Peony) Steeping Guide",
    "duration": "5:45",
    "thumbnail": "https://img.youtube.com/vi/6cHTJcTnaHo/hqdefault.jpg",
    "embedId": "6cHTJcTnaHo",
    "description": "Steeping two-leaves-and-a-bud White Peony for melon sweetness and soft floral bouquet.",
    "keyTakeaways": [
      "Blend of buds and young leaves adds deeper body than pure needle teas",
      "Steep at 85°C in a glass or gaiwan",
      "Tasting notes of ripe honeydew melon, wild flowers, and raw honey"
    ]
  },
  {
    "id": "mc_chai_ranveer",
    "track": "tea",
    "methodId": "chai_masala",
    "method": "Masala Chai",
    "title": "Authentic Indian Masala Chai & Spices",
    "duration": "8:50",
    "thumbnail": "https://img.youtube.com/vi/ptrblJdZT6I/hqdefault.jpg",
    "embedId": "ptrblJdZT6I",
    "description": "Chef Ranveer Brar shares the authentic Indian Masala Chai decoction technique, whole spice roasting, and milk simmering.",
    "keyTakeaways": [
      "Crush whole cardamom, cinnamon bark, and ginger before simmering",
      "Boil spices & Assam CTC tea for 4 minutes to extract essential oils",
      "Add milk and unrefined sugar, bring to gentle froth and strain"
    ]
  },
  {
    "id": "mc_chai_caffeinefree",
    "track": "tea",
    "methodId": "chai_masala",
    "method": "Masala Chai",
    "title": "Botanical Spiced Chai Decoction",
    "duration": "5:10",
    "thumbnail": "https://img.youtube.com/vi/U-UI9iqANMc/hqdefault.jpg",
    "embedId": "U-UI9iqANMc",
    "description": "Red Blossom Tea Company demonstrates whole spice decoctions with cinnamon, cardamom, and clove.",
    "keyTakeaways": [
      "Slow simmering unlocks fat-soluble spice oils into whole milk",
      "Cinnamon bark and clove provide natural warming sweetness",
      "Excellent hot or iced"
    ]
  },
  {
    "id": "mc_english_assam",
    "track": "tea",
    "methodId": "english_breakfast",
    "method": "English Breakfast",
    "title": "Formosa Red Assam & Full-Bodied Black Tea",
    "duration": "6:30",
    "thumbnail": "https://img.youtube.com/vi/9FaPoLb4iSs/hqdefault.jpg",
    "embedId": "9FaPoLb4iSs",
    "description": "Steeping robust Assam black tea at 95°C for rich malty depth, cocoa notes, and honey sweetness.",
    "keyTakeaways": [
      "Steep full-leaf black tea at 95°C-98°C for 3-4 minutes",
      "Bold malty tannins pair wonderfully with a splash of whole milk",
      "Decant completely to prevent bitter over-extraction"
    ]
  },
  {
    "id": "mc_black_dianhong",
    "track": "tea",
    "methodId": "english_breakfast",
    "method": "English Breakfast",
    "title": "Yunnan Dianhong Black Tea Masterclass",
    "duration": "16:20",
    "thumbnail": "https://img.youtube.com/vi/tV7lANeLAeE/hqdefault.jpg",
    "embedId": "tV7lANeLAeE",
    "description": "Mei Leaf explores Yunnan Dianhong black teas, golden buds, and complex sweet potato and cocoa notes.",
    "keyTakeaways": [
      "Golden tip rich leaves offer sweet chocolate and malt without harsh astringency",
      "Steep at 90°C-95°C for rich golden amber liqueur",
      "Naturally sweet without requiring added sugar"
    ]
  },
  {
    "id": "mc_darjeeling_elevation",
    "track": "tea",
    "methodId": "darjeeling_tea",
    "method": "Himalayan Darjeeling",
    "title": "How High Elevation Impacts First & Second Flush Teas",
    "duration": "7:45",
    "thumbnail": "https://img.youtube.com/vi/KfobDIwdhio/hqdefault.jpg",
    "embedId": "KfobDIwdhio",
    "description": "Red Blossom Tea Company explains how high Himalayan elevation and diurnal temperature swings produce muscatel grape clarity.",
    "keyTakeaways": [
      "High elevation slows leaf growth, concentrating aromatic essential oils",
      "Steep at 88°C-90°C for 3 minutes for crisp muscatel bouquet",
      "First flush yields crisp floral notes; second flush yields rich stone fruit"
    ]
  },
  {
    "id": "mc_ceylon_origin",
    "track": "tea",
    "methodId": "ceylon_tea",
    "method": "Ceylon Tea",
    "title": "High-Grown Red Leaf & Oxidation Dynamics",
    "duration": "6:15",
    "thumbnail": "https://img.youtube.com/vi/PHpq2tc-VKk/hqdefault.jpg",
    "embedId": "PHpq2tc-VKk",
    "description": "Understanding high-grown black tea oxidation, citrus clementine brightness, and brisk copper liquor.",
    "keyTakeaways": [
      "High-grown elevation produces brisk citric acidity and cedar wood finish",
      "Steep at 95°C for 3.5 minutes",
      "Refreshing served hot or iced with lemon peel"
    ]
  },
  {
    "id": "mc_earl_grey_scented",
    "track": "tea",
    "methodId": "earl_grey",
    "method": "Earl Grey",
    "title": "Scented Black Teas & Essential Bergamot Oils",
    "duration": "7:10",
    "thumbnail": "https://img.youtube.com/vi/IWQJLn5ABRk/hqdefault.jpg",
    "embedId": "IWQJLn5ABRk",
    "description": "Red Blossom Tea Company explores traditional scented black teas and natural essential oil infusing.",
    "keyTakeaways": [
      "Natural cold-pressed bergamot oil releases sweet citrus aromatics",
      "Steep at 95°C for 3.5 minutes without agitating leaves",
      "Great black tea base for London Fog lattes"
    ]
  },
  {
    "id": "mc_matcha_guide",
    "track": "tea",
    "methodId": "matcha_tea",
    "method": "Ceremonial Matcha",
    "title": "Matcha Whisking, Latte Prep & Frothing Guide",
    "duration": "9:40",
    "thumbnail": "https://img.youtube.com/vi/MWzqidSeEy0/hqdefault.jpg",
    "embedId": "MWzqidSeEy0",
    "description": "Specialty Tea Sommelier explores authentic ceremonial matcha powder whisking, frothing, and milk integration.",
    "keyTakeaways": [
      "Sift 2g matcha powder through fine sieve to eliminate clumps",
      "Whisk in rapid \"W\" motion using bamboo Chasen for 45 seconds",
      "Use 80°C water for smooth umami sweetness without bitterness"
    ]
  },
  {
    "id": "mc_matcha_genmai",
    "track": "tea",
    "methodId": "matcha_tea",
    "method": "Ceremonial Matcha",
    "title": "Genmai Matcha Ceremonial Whisking Guide",
    "duration": "5:30",
    "thumbnail": "https://img.youtube.com/vi/DqtigeEKI2Y/hqdefault.jpg",
    "embedId": "DqtigeEKI2Y",
    "description": "Red Blossom Tea Company demonstrates traditional matcha whisking mechanics and roasted rice tea infusions.",
    "keyTakeaways": [
      "Preheat chawan matcha bowl with hot water",
      "Whisk briskly until velvety micro-foam coats the surface",
      "Savor fresh within minutes of preparation"
    ]
  },
  {
    "id": "mc_turmeric_tisane",
    "track": "tea",
    "methodId": "turmeric_tea",
    "method": "Golden Turmeric",
    "title": "Botanical Herbal Tisane & Wellness Decoction Guide",
    "duration": "6:50",
    "thumbnail": "https://img.youtube.com/vi/RiBKUy_rEVQ/hqdefault.jpg",
    "embedId": "RiBKUy_rEVQ",
    "description": "Red Blossom Tea Company demonstrates brewing botanical herbal tisanes, ginger root, and turmeric infusions.",
    "keyTakeaways": [
      "Simmer whole botanicals at 98°C for 5 full minutes",
      "Pairs perfectly with raw honey and fresh citrus squeeze",
      "Caffeine-free and packed with natural soothing aromatics"
    ]
  }
];

export const TROUBLESHOOTING_GUIDE = {
  tea: [
  {
    "id": "bitter",
    "symptom": "Bitter, Harsh, or Astringent Infusion",
    "cause": "Over-Steeping or Water Temperature Too High (Scalding delicate green or white tea leaves)",
    "remedies": [
      "Water Temp: Drop water temperature (e.g. use 75°C - 80°C for Green tea; 83°C for White tea)",
      "Steep Time: Reduce steep time by 30 - 60 seconds",
      "Leaf Decanting: Strain liquid completely away from leaves between infusions to stop steeping"
    ]
  },
  {
    "id": "sour",
    "symptom": "Sour, Grassy, or Weak Floral Notes",
    "cause": "Under-Steeping or Water Temperature Too Cold (Failing to unlock complex essential oils)",
    "remedies": [
      "Water Temp: Increase water temperature by +3°C to +5°C",
      "Steep Time: Extend steeping duration by 45 - 60 seconds",
      "Leaf Expansion: Give rolled leaves a 10s hot water flash rinse to help them uncurl"
    ]
  },
  {
    "id": "flat",
    "symptom": "Flat, Dull, or Metallic Tea Liqueur",
    "cause": "Stale Loose Tea Leaves, Poor Water Filtration, or Stagnant Tap Water",
    "remedies": [
      "Leaf Freshness: Store loose tea in airtight, opaque tins away from light and humidity",
      "Fresh Boiling: Always use fresh cold water; do not re-boil stagnant water multiple times",
      "Water Hardness: Use filtered water to prevent mineral cloudiness"
    ]
  },
  {
    "id": "weak",
    "symptom": "Weak, Thin, or Flavorless Cup",
    "cause": "Low Leaf-to-Water Ratio or Cold Vessel Steeping",
    "remedies": [
      "Leaf Quantity: Add +1g of tea leaves or reduce water volume",
      "Vessel Preheat: Warm teapot, gaiwan, or ceramic mug with hot water before steeping",
      "Whole Leaf Room: Use a spacious infuser basket so leaves can fully expand"
    ]
  }
  ]
};
