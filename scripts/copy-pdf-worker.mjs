#!/usr/bin/env node
/**
 * Copy pdfjs worker from node_modules into /public so we can self-host it
 * instead of pulling from a CDN.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const candidates = [
  'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  'node_modules/pdfjs-dist/build/pdf.worker.mjs',
  'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs',
];

const dest = 'public/pdf.worker.min.mjs';

await mkdir('public', { recursive: true });

const src = candidates.find((p) => existsSync(p));
if (!src) {
  console.error('✗ Could not find pdfjs worker in node_modules. Tried:', candidates.join(', '));
  process.exit(1);
}

await copyFile(src, dest);
console.log(`✓ Copied ${src} → ${dest}`);
