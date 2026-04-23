#!/usr/bin/env node
import { readdir, stat, unlink } from 'node:fs/promises';
import { extname, join, parse } from 'node:path';
import sharp from 'sharp';

const TARGETS = ['src/Assets/Projects', 'src/Assets'];
const QUALITY = 80;

async function convertDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const tasks = [];
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = extname(entry.name).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue;
    const src = join(dir, entry.name);
    const dst = join(dir, `${parse(entry.name).name}.webp`);
    tasks.push(convert(src, dst));
  }
  await Promise.all(tasks);
}

async function convert(src, dst) {
  const before = (await stat(src)).size;
  // sharp strips metadata by default — no EXIF carry-over
  await sharp(src).webp({ quality: QUALITY, effort: 6 }).toFile(dst);
  const after = (await stat(dst)).size;
  await unlink(src);
  const pct = (((before - after) / before) * 100).toFixed(1);
  console.log(
    `${src.padEnd(48)} ${(before / 1024).toFixed(0).padStart(6)} kB → ${(after / 1024)
      .toFixed(0)
      .padStart(6)} kB  (-${pct}%)`
  );
}

for (const dir of TARGETS) {
  await convertDir(dir);
}
console.log('\n✓ done');
