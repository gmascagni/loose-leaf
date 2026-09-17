import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BREW_METHODS, TEA_METHODS } from '../src/data/brewData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Please run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Copy 404.html for SPA routing fallback
fs.writeFileSync(path.join(distDir, '404.html'), templateHtml);
fs.writeFileSync(path.join(rootDir, '404.html'), templateHtml);

const allMethods = BREW_METHODS.tea || TEA_METHODS || BREW_METHODS;

console.log(`Prerendering ${allMethods.length} tea steeping pages for search crawlers & social link previews...`);

allMethods.forEach((method) => {
  const methodDir = path.join(distDir, 'methods', method.id);
  fs.mkdirSync(methodDir, { recursive: true });

  const rootMethodDir = path.join(rootDir, 'methods', method.id);
  fs.mkdirSync(rootMethodDir, { recursive: true });

  const pageTitle = `How to Steep ${method.name} - loose-leaf | Specialty Tea Guide`;
  const pageDescription = method.description || `Step-by-step loose leaf steeping guide, leaf-to-water ratio, temperature, and infusion phases for ${method.name}.`;
  const canonicalUrl = `https://thebrew.app/methods/${method.id}`;
  const totalSec = (method.phases || []).reduce((acc, p) => acc + (p.durationSec || 0), 0);
  const totalMinutes = Math.ceil(totalSec / 60) || 3;

  // Generate Schema.org HowTo JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Steep ${method.name}`,
    "description": pageDescription,
    "totalTime": `PT${totalMinutes}M`,
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Specialty Loose Leaf Tea"
      },
      {
        "@type": "HowToSupply",
        "name": `Filtered Hot Water (${method.tempF || 190}°F / ${method.tempC || 88}°C)`
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": method.name
      },
      {
        "@type": "HowToTool",
        "name": "Digital Gram Scale"
      },
      {
        "@type": "HowToTool",
        "name": "Temperature-Controlled Kettle"
      }
    ],
    "step": (method.phases || []).map((phase, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": phase.name,
      "text": phase.instruction,
      "timeRequired": `PT${phase.durationSec || 30}S`
    }))
  };

  // Build high-performance static HTML shell
  let staticHtml = templateHtml;
  staticHtml = staticHtml.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);
  staticHtml = staticHtml.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${pageDescription}" />`);
  staticHtml = staticHtml.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  
  staticHtml = staticHtml.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${pageTitle}" />`);
  staticHtml = staticHtml.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${pageDescription}" />`);
  staticHtml = staticHtml.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  
  staticHtml = staticHtml.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${pageTitle}" />`);
  staticHtml = staticHtml.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${pageDescription}" />`);
  staticHtml = staticHtml.replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);

  // Inject prerendered rich SEO body
  const prerenderBody = `
    <div id="prerender-seo" style="max-width: 800px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #EBF7EE; background: #08110B; min-height: 100vh;">
      <header style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 30px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #7EA98E; font-weight: bold;">
          LooseLeaf • Specialty Loose Leaf Tea Guide
        </span>
        <h1 style="font-size: 32px; font-family: Georgia, serif; margin: 10px 0; color: #FFFFFF;">${method.name}</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #A2B9AB;">${method.description}</p>
        <div style="display: flex; gap: 15px; margin-top: 15px; font-family: monospace; font-size: 13px;">
          <span style="background: rgba(94,150,106,0.15); border: 1px solid rgba(94,150,106,0.3); padding: 4px 10px; border-radius: 8px; color: #7EA98E;">Ratio 1:${method.ratio}</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 8px;">Temp: ${method.tempF}°F (${method.tempC}°C)</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 8px;">Leaf Style: ${method.leafGrade || 'Whole Leaf'}</span>
        </div>
      </header>
      
      <section style="margin-bottom: 35px;">
        <h2 style="font-size: 20px; color: #FFFFFF; border-left: 3px solid #7EA98E; padding-left: 10px; margin-bottom: 15px;">
          Steeping Parameters & Phases
        </h2>
        <div style="display: grid; gap: 12px;">
          ${(method.phases || []).map((phase, idx) => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <strong style="color: #7EA98E; font-family: monospace;">Phase ${idx + 1}: ${phase.name}</strong>
                <span style="color: #71717A; font-family: monospace; font-size: 12px;">${phase.durationSec}s</span>
              </div>
              <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #D4D4D8;">${phase.instruction}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #71717A; text-align: center;">
        © ${new Date().getFullYear()} loose-leaf • Single-Origin Botanical Terroirs & Ceremonial Steeping
      </footer>
    </div>
  `;

  staticHtml = staticHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${prerenderBody}</div><script id="json-ld-structured-data" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  );

  fs.writeFileSync(path.join(methodDir, 'index.html'), staticHtml);
  fs.writeFileSync(path.join(rootMethodDir, 'index.html'), staticHtml);
});

console.log(`✓ Successfully prerendered ${allMethods.length} tea methods with valid Schema.org HowTo JSON-LD!`);

// Prerender Guides: /guides/tea-water-chemistry
console.log('Prerendering /guides/tea-water-chemistry guide page...');
const guideDistDir = path.join(distDir, 'guides', 'tea-water-chemistry');
fs.mkdirSync(guideDistDir, { recursive: true });
const guideRootDir = path.join(rootDir, 'guides', 'tea-water-chemistry');
fs.mkdirSync(guideRootDir, { recursive: true });

const waterGuideTitle = 'Tea Water Chemistry & Mineral Formulation Guide | loose-leaf';
const waterGuideDesc = 'Master specialty tea water chemistry: optimal mineral balance (GH & KH), Lotus drop formulations, and flavor extraction balance for fine teas.';
const waterGuideUrl = 'https://thebrew.app/guides/tea-water-chemistry';

let waterHtml = templateHtml;
waterHtml = waterHtml.replace(/<title>.*?<\/title>/i, `<title>${waterGuideTitle}</title>`);
waterHtml = waterHtml.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${waterGuideDesc}" />`);
waterHtml = waterHtml.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${waterGuideUrl}" />`);

fs.writeFileSync(path.join(guideDistDir, 'index.html'), waterHtml);
fs.writeFileSync(path.join(guideRootDir, 'index.html'), waterHtml);
console.log('✓ Successfully prerendered /guides/tea-water-chemistry!');
