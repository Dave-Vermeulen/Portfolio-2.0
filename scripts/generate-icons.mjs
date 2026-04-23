#!/usr/bin/env node
/**
 * Generate PWA icons + apple-touch-icon from public/favicon.png.
 */
import sharp from 'sharp';

const SOURCE = 'public/favicon.png';

const SIZES = [
  { size: 192, name: 'public/icon-192.png' },
  { size: 512, name: 'public/icon-512.png' },
  { size: 180, name: 'public/apple-touch-icon.png' },
];

await Promise.all(
  SIZES.map(({ size, name }) =>
    sharp(SOURCE)
      .resize(size, size, { fit: 'contain', background: { r: 10, g: 15, b: 26, alpha: 1 } })
      .png()
      .toFile(name)
      .then(() => console.log(`✓ ${name} (${size}×${size})`))
  )
);
