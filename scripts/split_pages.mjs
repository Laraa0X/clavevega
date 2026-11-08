import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const books = [
  { id: 'book1', prefix: 'b1' },
  { id: 'book2', prefix: 'b2' },
  { id: 'book3', prefix: 'b3' }
];

const outDir = path.resolve('public/assets/panels');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

books.forEach(({ id, prefix }) => {
  const dir = path.resolve(`public/assets/${id}`);
  for (let p = 1; p <= 8; p++) {
    const pageNum = String(p).padStart(2, '0');
    const inFile = path.join(dir, `page_${pageNum}.png`);
    if (!fs.existsSync(inFile)) continue;

    const leftOut = path.join(outDir, `${prefix}_p${pageNum}_left.jpg`);
    const rightOut = path.join(outDir, `${prefix}_p${pageNum}_right.jpg`);

    // Crop left page (width: 877, height: 1241, x: 0, y: 0)
    execSync(`convert "${inFile}" -crop 877x1241+0+0 -quality 88 "${leftOut}"`);
    // Crop right page (width: 877, height: 1241, x: 877, y: 0)
    execSync(`convert "${inFile}" -crop 877x1241+877+0 -quality 88 "${rightOut}"`);
  }
});

console.log('Split pages complete!');
