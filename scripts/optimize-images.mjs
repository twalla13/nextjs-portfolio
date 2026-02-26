#!/usr/bin/env node
/**
 * Image optimization script
 * Converts source PNGs to WebP at responsive sizes.
 * Run manually: node scripts/optimize-images.mjs
 * Or automatically via `npm run build` (prebuild hook).
 *
 * Add new images to the `jobs` array below.
 */

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const srcDir = join(root, 'public', 'imgs');
const outDir = join(root, 'public', 'imgs', 'optimized');

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

/** @type {{ src: string; out: string; width: number; quality: number }[]} */
const jobs = [
  // Hero image — multiple sizes for responsive display
  { src: 'homepagegirl.png', out: 'hero-sm.webp',  width: 360, quality: 82 },
  { src: 'homepagegirl.png', out: 'hero-md.webp',  width: 512, quality: 82 },
  { src: 'homepagegirl.png', out: 'hero-lg.webp',  width: 768, quality: 82 },

  // Skill card decorative images — displayed at ≤128px, 256px source is plenty
  { src: 'cloud-removebg.png',    out: 'cloud.webp',    width: 256, quality: 85 },
  { src: 'computer-removebg.png', out: 'computer.webp', width: 256, quality: 85 },
  { src: 'html-removebg.png',     out: 'html.webp',     width: 256, quality: 85 },
];

let created = 0;
let skipped = 0;

for (const { src, out, width, quality } of jobs) {
  const srcPath = join(srcDir, src);
  const outPath = join(outDir, out);

  if (!existsSync(srcPath)) {
    console.warn(`  WARN  source not found: ${src}`);
    continue;
  }

  if (existsSync(outPath)) {
    console.log(`  skip  ${out}`);
    skipped++;
    continue;
  }

  await sharp(srcPath)
    .resize(width)
    .webp({ quality })
    .toFile(outPath);

  console.log(`  ✓  ${out}  (${width}px webp q${quality})`);
  created++;
}

console.log(`\nImage optimization done. Created: ${created}, Skipped: ${skipped}.`);
