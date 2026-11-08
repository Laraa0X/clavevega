import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const crops = [
  // b1_p08_right: 877x1241. Bee is in bottom area
  {
    src: 'public/assets/panels/b1_p08_right.jpg',
    out: 'public/assets/panels/symbol_bee_chalk.jpg',
    crop: '560x420+160+540'
  },
  // Cathedral facade b1_p03_left
  {
    src: 'public/assets/panels/b1_p03_left.jpg',
    out: 'public/assets/panels/cathedral_arches.jpg',
    crop: '760x760+60+80'
  },
  // Grandfather clock b1_p07_right
  {
    src: 'public/assets/panels/b1_p07_right.jpg',
    out: 'public/assets/panels/symbol_clock.jpg',
    crop: '620x780+140+120'
  },
  // Control console b2_p04_right
  {
    src: 'public/assets/panels/b2_p04_right.jpg',
    out: 'public/assets/panels/console_mechanism.jpg',
    crop: '680x820+100+240'
  },
  // Glowing key in box b2_p08_left
  {
    src: 'public/assets/panels/b2_p08_left.jpg',
    out: 'public/assets/panels/symbol_bronze_key.jpg',
    crop: '520x420+200+740'
  },
  // Observatory b2_p03_right
  {
    src: 'public/assets/panels/b2_p03_right.jpg',
    out: 'public/assets/panels/observatory_view.jpg',
    crop: '760x860+60+80'
  },
  // 4 elements gears b3_p04_left
  {
    src: 'public/assets/panels/b3_p04_left.jpg',
    out: 'public/assets/panels/elements_gears.jpg',
    crop: '560x700+60+200'
  },
  // Aislin revelation b3_p06_left
  {
    src: 'public/assets/panels/b3_p06_left.jpg',
    out: 'public/assets/panels/aislin_reveal.jpg',
    crop: '680x800+60+260'
  },
  // Ancient chest b3_p07_left
  {
    src: 'public/assets/panels/b3_p07_left.jpg',
    out: 'public/assets/panels/guardian_chest.jpg',
    crop: '760x760+60+340'
  },
  // Characters Elena & Bruno b1_p03_right
  {
    src: 'public/assets/panels/b1_p03_right.jpg',
    out: 'public/assets/panels/elena_bruno.jpg',
    crop: '740x800+80+380'
  }
];

crops.forEach(({ src, out, crop }) => {
  if (fs.existsSync(src)) {
    try {
      execSync(`convert "${src}" -crop ${crop} +repage -quality 90 "${out}"`);
      console.log(`Generated crop: ${out}`);
    } catch (e) {
      console.error(`Failed ${out}`, e.message);
    }
  }
});
