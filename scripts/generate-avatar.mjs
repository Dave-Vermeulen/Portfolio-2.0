#!/usr/bin/env node
/**
 * Regenerate the Home2 portrait (`src/Assets/avatar.svg`) from DiceBear
 * (avataaars style), post-processed to use the royal-blue hoodie.
 *
 * Toffee skin, no hair (bald), black beard, royal-blue hoodie.
 *
 * ⚠️ The hero + about scenes (`avatar-hero.svg`, `avatar-about.svg`) are
 * HAND-DRAWN ILLUSTRATED SCENES (Dawūd coding / stargazing). Do NOT regenerate
 * them — this script only touches `avatar.svg`.
 *
 * Usage:
 *   npm run avatar                       # regenerate the portrait
 *   SKIN_COLOR=614335 npm run avatar     # darker skin
 *   BEARD=beardMajestic npm run avatar   # fuller beard
 *   MOUTH=serious npm run avatar         # different expression
 */
import { writeFile } from 'node:fs/promises';

const BASE = {
  top: process.env.TOP ?? 'shortFlat', // fallback — topProbability=0 overrides
  topProbability: 0, // ★ bald
  hairColor: process.env.HAIR_COLOR ?? '2c1b18',
  facialHair: process.env.BEARD ?? 'beardMedium',
  facialHairColor: process.env.FACIAL_HAIR_COLOR ?? '2c1b18',
  facialHairProbability: 100,
  clothes: 'hoodie', // v9 avataaars uses `clothes` not `clothing`
  clothesColor: '25557c', // pinned → then recoloured to royal blue below
  skinColor: process.env.SKIN_COLOR ?? 'd08b5b', // ★ toffee
  eyebrows: 'default',
  eyes: 'default',
  accessoriesProbability: 0,
};

const VARIANTS = [
  {
    out: 'src/Assets/avatar.svg',
    seed: process.env.SEED ?? 'Dawud',
    mouth: process.env.MOUTH ?? 'smile',
  },
];

const HOODIE_BLUE = '#0035a5';
const HOODIE_BLUE_SHADOW = '#002a84';

async function build({ out, seed, mouth }) {
  const params = new URLSearchParams(
    Object.entries({ ...BASE, seed, mouth }).reduce((acc, [k, v]) => {
      acc[k] = String(v);
      return acc;
    }, {})
  );
  const url = `https://api.dicebear.com/9.x/avataaars/svg?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${out}: DiceBear returned ${res.status}`);
    console.error(await res.text());
    process.exit(1);
  }
  let svg = await res.text();

  // Recolour the hoodie. `clothingColor=25557c` above pins it; now swap to royal blue.
  svg = svg.replace(/#25557c/gi, HOODIE_BLUE);
  // Drawstring / secondary clothing detail — keep a slightly lighter blue for contrast.
  svg = svg.replace(/#F4F4F4/g, HOODIE_BLUE_SHADOW).replace(/#f4f4f4/g, HOODIE_BLUE_SHADOW);

  await writeFile(out, svg);
  console.log(`✓ ${out.padEnd(32)} ${svg.length} bytes · seed=${seed}  mouth=${mouth}`);
}

for (const v of VARIANTS) await build(v);
console.log('\nDone. Portrait regenerated.');
console.log(
  'Note: avatar-hero.svg and avatar-about.svg are hand-drawn scenes and were not touched.'
);
