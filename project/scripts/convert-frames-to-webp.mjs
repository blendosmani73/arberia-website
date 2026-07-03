import { readdir, mkdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const animationDir = join(process.cwd(), 'src', 'animation');
const sourceExtensions = new Set(['.jpg', '.jpeg', '.png']);

const files = await readdir(animationDir);
const sources = files.filter((file) => sourceExtensions.has(extname(file).toLowerCase()));

if (sources.length === 0) {
  console.log('No source frames found to convert.');
  process.exit(0);
}

await mkdir(animationDir, { recursive: true });

let converted = 0;

for (const file of sources) {
  const inputPath = join(animationDir, file);
  const outputPath = join(
    animationDir,
    `${basename(file, extname(file))}.webp`,
  );

  await sharp(inputPath)
    .webp({ quality: 85, effort: 4 })
    .toFile(outputPath);

  converted += 1;
}

console.log(`Converted ${converted} frames to WebP.`);
