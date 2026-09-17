import React from 'react';

export default function BrandLogo({ size = 36, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label="loose-leaf Logo"
    >
      <defs>
        {/* Soft Ambient Luminous Halo */}
        <radialGradient id="leafAura" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#059669" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#022c16" stopOpacity="0" />
        </radialGradient>

        {/* Primary Leaf Luminous Gradient */}
        <linearGradient id="mainLeafGrad" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="40%" stopColor="#34D399" />
          <stop offset="85%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        {/* Tender Sprout / Second Leaf Gradient */}
        <linearGradient id="sproutGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>

        {/* Delicate Golden Dewdrop */}
        <linearGradient id="goldDew" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Ambient Drop Glow */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#10B981" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Transparent Circular Background with Subtle Jade Bezel */}
      <circle cx="50" cy="50" r="46" fill="#07170E" stroke="#34D399" strokeWidth="1.2" strokeOpacity="0.3" />
      <circle cx="50" cy="50" r="46" fill="url(#leafAura)" />

      {/* Group of Floating Loose Leaves with Organic Flow */}
      <g filter="url(#softGlow)">
        {/* Secondary Delicate Small Leaf / Sprout (Left / Lower) */}
        <path
          d="M 46 68 C 30 68, 22 56, 26 44 C 30 32, 42 36, 47 48 C 49 53, 49 61, 46 68 Z"
          fill="url(#sproutGrad)"
          opacity="0.9"
        />
        {/* Sprout Spine */}
        <path
          d="M 28 42 C 34 50, 42 58, 46 67"
          stroke="#064E3B"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* Primary Graceful Loose Tea Leaf (Rising Right & Curving) */}
        <path
          d="M 38 78 C 36 62, 40 44, 52 30 C 62 18, 76 14, 80 18 C 84 22, 80 38, 70 52 C 58 68, 46 76, 38 78 Z"
          fill="url(#mainLeafGrad)"
          stroke="#A7F3D0"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Primary Leaf Main Rib / Spine */}
        <path
          d="M 40 76 C 47 62, 58 46, 78 20"
          stroke="#E6FFFA"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* Primary Leaf Delicate Lateral Veins */}
        <path d="M 48 64 Q 57 63, 62 60" stroke="#E6FFFA" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.65" />
        <path d="M 54 53 Q 63 50, 68 46" stroke="#E6FFFA" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.65" />
        <path d="M 61 41 Q 69 37, 73 32" stroke="#E6FFFA" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.65" />

        <path d="M 46 65 Q 41 58, 42 54" stroke="#064E3B" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M 53 52 Q 47 46, 49 41" stroke="#064E3B" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* Morning Dewdrop Accent */}
        <circle cx="67" cy="38" r="2.2" fill="url(#goldDew)" opacity="0.95" />
        <circle cx="66.3" cy="37.3" r="0.7" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
