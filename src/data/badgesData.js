// Gamification Badges & Achievements Data for LooseLeaf

export const BADGES_DATA = [
  {
    id: 'first_brew',
    slug: 'first_brew',
    name: 'First Steeping',
    description: 'Logged your very first loose-leaf tea steeping in LooseLeaf.',
    category: 'milestone',
    icon: '🍵',
    criteriaType: 'brew_count',
    threshold: 1
  },
  {
    id: 'golden_ratio_master',
    slug: 'golden_ratio_master',
    name: 'Steep Ratio Master',
    description: 'Steeped using exact leaf-to-water ratio precision.',
    category: 'mastery',
    icon: '✨',
    criteriaType: 'ratio_mastery',
    threshold: 50
  },
  {
    id: 'streak_3_days',
    slug: 'streak_3_days',
    name: '3-Day Tea Ritual',
    description: 'Steeped specialty loose-leaf tea for 3 consecutive days.',
    category: 'streak',
    icon: '🌿',
    criteriaType: 'streak_days',
    threshold: 3
  },
  {
    id: 'streak_7_days',
    slug: 'streak_7_days',
    name: '7-Day Ritual',
    description: 'Maintained a 7-day uninterrupted daily tea steeping ritual.',
    category: 'streak',
    icon: '⚡',
    criteriaType: 'streak_days',
    threshold: 7
  },
  {
    id: 'gongfu_master',
    slug: 'gongfu_master',
    name: 'Gongfu Cha Master',
    description: 'Mastered high-ratio Gaiwan multi-steeping across 5 sessions.',
    category: 'method',
    icon: '🫖',
    criteriaType: 'method_brews',
    threshold: 5
  },
  {
    id: 'matcha_artisan',
    slug: 'matcha_artisan',
    name: 'Ceremonial Matcha Artisan',
    description: 'Whisked ceremonial stone-ground tencha into rich micro-foam.',
    category: 'method',
    icon: '🥣',
    criteriaType: 'method_brews',
    threshold: 3
  },
  {
    id: 'darjeeling_connoisseur',
    slug: 'darjeeling_connoisseur',
    name: 'Himalayan Explorer',
    description: 'Steeped high-altitude First or Second Flush Darjeeling whole leaf.',
    category: 'terroir',
    icon: '🏔️',
    criteriaType: 'terroir_explored',
    threshold: 1
  },
  {
    id: 'loose_leaf_scholar',
    slug: 'loose_leaf_scholar',
    name: 'Tea Garden Scholar',
    description: 'Explored mountain terroirs and botanical Camellia sinensis cultivars.',
    category: 'education',
    icon: '📜',
    criteriaType: 'terroir_explored',
    threshold: 5
  }
];
