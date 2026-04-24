#!/usr/bin/env node
/**
 * Pixel-level "skin detect and shift to toffee" for the original home-main
 * hero illustration.
 *
 * Skin detector (see `isPinkSkin` below): explicit RGB fingerprint for
 * stylised pink (around #f8a8a8 with highlight/shadow variants):
 *   • r ≥ 170 and r − g ≥ 22  (pink rather than grey/blue)
 *   • |g − b| ≤ 28           (pink rather than red)
 *   • 85 ≤ g ≤ 230           (excludes near-black and pure white)
 *
 * Matches get remapped toward toffee (hue 24°, sat 0.50), preserving each
 * pixel's original lightness curve scaled down so the illustration's
 * shading/highlights survive the swap. Other pixels stay untouched.
 *
 * Usage:  npm run tint:skin
 *
 * To reset from a clean original before re-running:
 *   git show HEAD:src/Assets/home-main.svg > src/Assets/home-main.svg
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

function isPinkSkin(r, g, b) {
  return r >= 170 && r - g >= 22 && Math.abs(g - b) <= 28 && g >= 85 && g <= 230;
}

const TARGET_HUE = 24; // toffee
const TARGET_SAT = 0.5;
const LIGHT_SCALE = 0.62; // darken original lightness toward toffee range

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  let h = 0,
    s = 0;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    switch (mx) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  h /= 360;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(hk(h + 1 / 3) * 255),
    Math.round(hk(h) * 255),
    Math.round(hk(h - 1 / 3) * 255),
  ];
}

async function tintPng(inputBuf) {
  const image = sharp(inputBuf).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let hits = 0;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const a = channels === 4 ? data[i + 3] : 255;
    if (a < 20) continue;

    if (isPinkSkin(r, g, b)) {
      const [, , l] = rgbToHsl(r, g, b);
      const [nr, ng, nb] = hslToRgb(TARGET_HUE, TARGET_SAT, l * LIGHT_SCALE);
      data[i] = nr;
      data[i + 1] = ng;
      data[i + 2] = nb;
      hits++;
    }
  }

  const out = await sharp(data, { raw: { width, height, channels } }).png().toBuffer();
  return { buffer: out, hits, total: width * height };
}

const svgRaw = await readFile('src/Assets/home-main.svg', 'utf8');
const m = svgRaw.match(/base64,([A-Za-z0-9+/=]+)/);
if (!m) throw new Error('No base64 PNG found inside home-main.svg');

const pngIn = Buffer.from(m[1], 'base64');
const { buffer: pngOut, hits, total } = await tintPng(pngIn);

const svgOut = svgRaw.replace(/base64,[A-Za-z0-9+/=]+/, `base64,${pngOut.toString('base64')}`);
await writeFile('src/Assets/home-main.svg', svgOut);

const pct = ((hits / total) * 100).toFixed(1);
console.log(
  `✓ home-main.svg   skin pixels retinted: ${hits.toLocaleString()} / ${total.toLocaleString()} (${pct}%)`
);
