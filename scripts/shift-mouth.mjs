#!/usr/bin/env node
/**
 * Restore the original hoodie portrait to `src/Assets/avatar.svg` and shift
 * the mouth paths down a couple of pixels — pulls the upper lip down under
 * the moustache/beard so the "visible upper gum" effect disappears.
 *
 * Why this works: the original 88-path SVG has 3 uniquely-coloured paths
 * that make up the mouth, independent of every other face element:
 *
 *    #d98189  — pink lips
 *    #fbfafb  — teeth / mouth highlight
 *    #050404  — dark mouth interior
 *
 * Each path gets wrapped in `<g transform="translate(0 N)">` (no reflow,
 * no path-editing, fully reversible). Non-mouth paths are untouched.
 *
 * Source of truth for the original is the pristine copy we squirrelled away
 * in /tmp; if that's gone, we pull from `git show HEAD:` as a fallback.
 *
 * Usage:
 *    npm run shift:mouth                  # default 2 px
 *    SHIFT=3 npm run shift:mouth          # bigger drop if 2 isn't enough
 *    SHIFT=1 npm run shift:mouth          # subtler
 */
import { copyFile, access, readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const DEST = 'src/Assets/avatar.svg';
const PRISTINE = '/tmp/original-avatar.svg';

const SHIFT = Number(process.env.SHIFT ?? 2);
if (!Number.isFinite(SHIFT)) {
  console.error('SHIFT must be a number');
  process.exit(1);
}

// The 3 mouth fills from the original avatarmaker export.
const MOUTH_FILLS = new Set(['#d98189', '#fbfafb', '#050404']);

// --- 1. Restore the original SVG ------------------------------------------------

let restored = false;
try {
  await access(PRISTINE);
  await copyFile(PRISTINE, DEST);
  restored = true;
  console.log(`✓ Restored original from ${PRISTINE}`);
} catch {
  // /tmp copy is gone (fresh machine, rebooted, etc.) — fall back to git.
  try {
    const svg = execSync(`git show HEAD:${DEST}`, { encoding: 'utf8' });
    await writeFile(DEST, svg);
    restored = true;
    console.log(`✓ Restored original from git HEAD`);
  } catch (err) {
    console.error(`✗ Could not restore the original avatar: ${err.message}`);
    process.exit(1);
  }
}

// --- 2. Wrap the 3 mouth paths in translate groups -----------------------------

const svgRaw = await readFile(DEST, 'utf8');

let shifted = 0;
const newSvg = svgRaw.replace(/<path\b[^/>]*\/?>/g, (tag) => {
  const m = tag.match(/\bfill="([^"]+)"/i);
  if (!m) return tag;
  const fill = m[1].toLowerCase();
  if (!MOUTH_FILLS.has(fill)) return tag;
  shifted++;
  return `<g transform="translate(0 ${SHIFT})">${tag}</g>`;
});

await writeFile(DEST, newSvg);

console.log(`✓ Shifted ${shifted} mouth path${shifted === 1 ? '' : 's'} down by ${SHIFT}px`);
if (shifted !== 3) {
  console.warn(
    `⚠ Expected 3 mouth paths (#d98189, #fbfafb, #050404). Found ${shifted}. The SVG may have been recently replaced; re-run with PRISTINE restored.`
  );
}
if (restored) {
  console.log(`\n  Tune with:   SHIFT=3 npm run shift:mouth`);
}
