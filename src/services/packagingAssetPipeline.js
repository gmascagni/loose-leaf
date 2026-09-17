/**
 * LooseLeaf — Shared Packaging & Asset Pipeline Service
 * 
 * Centralized engine for generating physical packaging assets:
 * - 300-DPI composite sticker images ready for commercial printers (Avery, Zebra, Rollo, Dymo)
 * - Scalable vector SVGs for tin / pouch die-lines
 * - Standalone high-res QR codes
 * - Universal deep links
 */

import QRCode from 'qrcode';
import { createTeaProfile, slugify } from '../models/teaProfile';
import { generateSmartBagUrl } from '../data/roasterRegistry';

/**
 * Generates the full 300-DPI composite packaging sticker canvas for tea tins and pouches.
 * 
 * @param {Object} rawTea - Tea profile or raw leaf object
 * @returns {Promise<HTMLCanvasElement>}
 */
export async function generateCompositeStickerCanvas(rawTea = {}) {
  const tea = createTeaProfile(rawTea);
  const targetUrl = tea.packaging?.customUrl?.trim() || generateSmartBagUrl(tea);

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1800;
  const ctx = canvas.getContext('2d');

  // 1. Clean white card background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1200, 1800);

  // 2. Outer printer bleed & border
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, 1140, 1740);

  // 3. Inner hairline frame
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 2;
  ctx.strokeRect(45, 45, 1110, 1710);

  // 4. Header Tag
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 22px -apple-system, monospace, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('SPECIALTY TEA PURVEYOR • SMART PACKAGING CERTIFIED', 70, 105);

  // 5. Harvest / Oxidation Pill Badge
  const harvestText = (tea.roastLevel || tea.oxidationLevel || 'SPRING FLUSH').toUpperCase();
  ctx.font = 'bold 22px monospace, sans-serif';
  const badgeW = ctx.measureText(harvestText).width + 36;
  ctx.fillStyle = '#2D5A27';
  ctx.fillRect(1200 - 70 - badgeW, 78, badgeW, 42);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(harvestText, 1200 - 70 - badgeW + 18, 107);

  // 6. Purveyor Title & Location
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 52px Georgia, "Times New Roman", serif';
  ctx.fillText(tea.roaster, 70, 180);

  ctx.fillStyle = '#57534E';
  ctx.font = '28px -apple-system, sans-serif';
  ctx.fillText(tea.location || 'Artisan Mountain Garden', 70, 225);

  // 7. Dividing Rule
  ctx.strokeStyle = '#2D5A27';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(70, 255);
  ctx.lineTo(1130, 255);
  ctx.stroke();

  // 8. Tea Lot Name & Terroir
  ctx.fillStyle = '#0C0A09';
  ctx.font = 'bold 44px Georgia, serif';
  ctx.fillText(tea.beanName, 70, 315);

  ctx.fillStyle = '#44403C';
  ctx.font = '500 26px -apple-system, sans-serif';
  const originStr = `${tea.origin} • ${tea.process} • ${tea.elevation}`;
  ctx.fillText(originStr, 70, 360);

  // 9. Tasting Notes
  const notesStr = (tea.tastingNotes || []).slice(0, 4).join(', ');
  if (notesStr) {
    ctx.fillStyle = '#2D5A27';
    ctx.font = 'italic 26px Georgia, serif';
    ctx.fillText(`Notes: ${notesStr}`, 70, 405);
  }

  // 10. Prominent "SCAN ME FOR STEEP RECIPE" Banner
  const bannerY = 460;
  const bannerH = 75;
  ctx.fillStyle = '#1C1917';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(140, bannerY, 920, bannerH, 37);
    ctx.fill();
  } else {
    ctx.fillRect(140, bannerY, 920, bannerH);
  }

  ctx.fillStyle = '#7EA98E'; // Sage Green
  ctx.font = 'bold 32px -apple-system, monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨  SCAN ME FOR STEEP RECIPE  ✨', 600, bannerY + 49);

  // 11. Centered High-Res QR Code
  const qrCanvas = document.createElement('canvas');
  await QRCode.toCanvas(qrCanvas, targetUrl, {
    width: 700,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: { dark: '#000000', light: '#FFFFFF' }
  });
  ctx.drawImage(qrCanvas, 250, 560, 700, 700);

  // 12. Callout Subtitle below QR
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 22px monospace, sans-serif';
  ctx.fillText('AIM PHONE CAMERA TO DIAL-IN & STEEP', 600, 1315);

  // 13. Extraction Parameter Box
  ctx.fillStyle = '#F5F5F4';
  ctx.fillRect(70, 1360, 1060, 230);
  ctx.strokeStyle = '#D6D3D1';
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 1360, 1060, 230);

  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 20px monospace, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TEA MASTER STEEP SPECIFICATIONS', 100, 1400);

  const colW = 1060 / 4;
  const colY = 1455;

  // Col 1: Ratio
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 18px monospace, sans-serif';
  ctx.fillText('WATER RATIO', 100, colY);
  ctx.fillStyle = '#2D5A27';
  ctx.font = 'bold 36px monospace, sans-serif';
  ctx.fillText(`1:${tea.extraction.ratio}`, 100, colY + 45);

  // Col 2: Water Temp
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 18px monospace, sans-serif';
  ctx.fillText('WATER TEMP', 100 + colW, colY);
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 36px monospace, sans-serif';
  ctx.fillText(`${tea.extraction.tempF}°F`, 100 + colW, colY + 45);

  // Col 3: Method
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 18px monospace, sans-serif';
  ctx.fillText('STEEP METHOD', 100 + colW * 2, colY);
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText((tea.extraction.method || 'darjeeling_tea').replace(/_/g, ' '), 100 + colW * 2, colY + 42);

  // Col 4: Leaf Style
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 18px monospace, sans-serif';
  ctx.fillText('LEAF STYLE', 100 + colW * 3, colY);
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText((tea.extraction.grind || 'Whole Leaf').split('(')[0].trim(), 100 + colW * 3, colY + 42);

  // 14. Footer
  ctx.fillStyle = '#A8A29E';
  ctx.font = 'bold 22px monospace, sans-serif';
  ctx.fillText('looseleaf.app dial-in', 70, 1660);
  ctx.textAlign = 'right';
  ctx.fillText(`LOT: ${tea.packaging.upc || 'CERTIFIED-LOT'}`, 1130, 1660);

  return canvas;
}

/**
 * Downloads the 300-DPI composite packaging sticker as a PNG file.
 */
export async function downloadCompleteStickerPng(rawTea = {}) {
  const tea = createTeaProfile(rawTea);
  const canvas = await generateCompositeStickerCanvas(tea);
  const slug = slugify(tea.beanName || 'tea');

  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = `smart_tin_sticker_${slug}_print_ready_300dpi.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Downloads a scalable vector SVG of the tea lot's Smart Tin QR code.
 */
export async function downloadVectorQrSvg(rawTea = {}) {
  const tea = createTeaProfile(rawTea);
  const targetUrl = tea.packaging?.customUrl?.trim() || generateSmartBagUrl(tea);

  const svgString = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 2,
    errorCorrectionLevel: 'H',
    color: { dark: '#000000', light: '#FFFFFF' }
  });

  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const slug = slugify(tea.beanName || 'tea');

  const a = document.createElement('a');
  a.href = url;
  a.download = `smart_tin_qr_${slug}_vector.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Downloads an ultra-high-resolution standalone QR code PNG.
 */
export async function downloadHighResQrPng(rawTea = {}, width = 1200) {
  const tea = createTeaProfile(rawTea);
  const targetUrl = tea.packaging?.customUrl?.trim() || generateSmartBagUrl(tea);

  const dataUrl = await QRCode.toDataURL(targetUrl, {
    width,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: { dark: '#000000', light: '#FFFFFF' }
  });

  const slug = slugify(tea.beanName || 'tea');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `smart_tin_qr_${slug}_${width}px.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
