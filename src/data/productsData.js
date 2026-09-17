export const AMAZON_AFFILIATE_TAG = 'thebrewapp13-20';

// Category Tabs for Specialty Tea Gear
const TEA_PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Tea Gear' },
  { id: 'method_kit', label: 'Tea Steeping Kits' },
  { id: 'teapots_whisks', label: 'Gaiwans & Whisks' },
  { id: 'water_kettles', label: 'Kettles & Water' },
  { id: 'beans_tea', label: 'Imperial Loose Leaf Teas' },
  { id: 'top_rated', label: 'Top Rated ⭐ 4.9+' }
];

export const PRODUCT_CATEGORIES = Object.assign([...TEA_PRODUCT_CATEGORIES], {
  tea: TEA_PRODUCT_CATEGORIES
});

export const PRODUCTS_DATA = [
  {
    id: 'gaiwan_tea_set',
    name: 'Gongfu Ceramic Gaiwan Teapot Tea Set',
    track: 'tea',
    category: 'method_kit',
    methodIds: ['darjeeling_tea', 'chai_masala', 'english_breakfast', 'green_tea', 'matcha_tea', 'oolong_tea', 'ceylon_tea', 'white_tea', 'turmeric_tea', 'puerh_tea'],
    badge: 'Ceremony Grade',
    rating: 4.8,
    reviewsCount: 840,
    priceRange: '$32 - $39',
    asin: 'B01AXZA9CU',
    amazonUrl: `https://www.amazon.com/dp/B01AXZA9CU/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_ceremony.jpg',
    description: 'Traditional 100mL porcelain lidded Gaiwan set for precision multi-steep Gongfu tea infusions.'
  },
  {
    id: 'bamboo_chasen_matcha_whisk',
    name: 'Japanese Bamboo Chasen Matcha Whisk & Chawan Scoop Set',
    track: 'tea',
    category: 'teapots_whisks',
    methodIds: ['matcha_tea'],
    badge: 'Uji Handcrafted',
    rating: 4.9,
    reviewsCount: 4210,
    priceRange: '$18 - $24',
    topRated: true,
    asin: 'B00O87EVG0',
    amazonUrl: `https://www.amazon.com/dp/B00O87EVG0/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_ceremony.jpg',
    description: 'Hand-split 100-prong golden bamboo Chasen whisk designed to create creamy micro-foam froth for ceremonial Matcha.'
  },
  {
    id: 'cosori_gooseneck_timer',
    name: 'COSORI Electric Gooseneck Kettle with Variable Temp Control & Presets',
    track: 'tea',
    category: 'water_kettles',
    methodIds: ['darjeeling_tea', 'chai_masala', 'english_breakfast', 'green_tea', 'matcha_tea', 'oolong_tea', 'ceylon_tea', 'white_tea', 'turmeric_tea', 'puerh_tea'],
    badge: 'Tea Temp Presets',
    rating: 4.8,
    reviewsCount: 14200,
    priceRange: '$65 - $79',
    topRated: true,
    asin: 'B081LQMXKP',
    amazonUrl: `https://www.amazon.com/dp/B081LQMXKP/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_kettle.jpg',
    description: 'Precision temperature presets for Green Tea (180°F), White Tea (185°F), Oolong (190°F), and Black Tea (205°F).'
  },
  {
    id: 'ippodo_matcha_ummon',
    name: 'Ippodo Tea Ummon-no-mukai Ceremonial Grade Matcha 40g Tin',
    track: 'tea',
    category: 'beans_tea',
    methodIds: ['matcha_tea'],
    badge: 'Kyoto Imperial',
    rating: 4.9,
    reviewsCount: 1150,
    priceRange: '$38 - $44',
    topRated: true,
    asin: 'B003KYSOCE',
    amazonUrl: `https://www.amazon.com/dp/B003KYSOCE/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_ceremony.jpg',
    description: 'First-harvest shade-grown green tea leaves stone-ground in Kyoto, Japan. Deep emerald foam with intense savory umami.'
  },
  {
    id: 'harney_dragon_pearl',
    name: 'Harney and Sons Supreme Dragon Pearl Jasmine Green Tea',
    track: 'tea',
    category: 'beans_tea',
    methodIds: ['green_tea', 'white_tea'],
    badge: 'Floral Excellence',
    rating: 4.9,
    reviewsCount: 5200,
    priceRange: '$12 - $16',
    topRated: true,
    asin: 'B000OQXXOA',
    amazonUrl: `https://www.amazon.com/dp/B000OQXXOA/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_ceremony.jpg',
    description: 'Hand-rolled Fujian tea pearls infused multiple times with fresh night-blooming jasmine flowers for a sweet fragrant cup.'
  },
  {
    id: 'vahdam_english_breakfast',
    name: 'Vahdam Imperial English Breakfast Loose Leaf Black Tea 12 oz',
    track: 'tea',
    category: 'beans_tea',
    methodIds: ['english_breakfast', 'darjeeling_tea', 'ceylon_tea'],
    badge: '100% Single Origin',
    rating: 4.8,
    reviewsCount: 7800,
    priceRange: '$14 - $17',
    asin: 'B00VFYPK82',
    amazonUrl: `https://www.amazon.com/dp/B00VFYPK82/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_kettle.jpg',
    description: 'Robust blend of Assam second-flush orthodox black tea leaves delivering rich maltiness, amber cup, and bold body.'
  },
  {
    id: 'yunnan_sourcing_puerh',
    name: 'Yunnan Sourcing Aged Shou Ripe Pu-erh Tea Cake',
    track: 'tea',
    category: 'beans_tea',
    methodIds: ['turmeric_tea', 'english_breakfast', 'puerh_tea'],
    badge: 'Aged Imperial',
    rating: 4.9,
    reviewsCount: 310,
    priceRange: '$24 - $29',
    topRated: true,
    asin: 'B0CS6JWMXF',
    amazonUrl: `https://www.amazon.com/dp/B0CS6JWMXF/?tag=${AMAZON_AFFILIATE_TAG}`,
    image: '/tea_kettle.jpg',
    description: 'Post-fermented tea cake from Menghai with deep camphor wood, damp earth sweetness, and velvet chocolate body.'
  }
];
