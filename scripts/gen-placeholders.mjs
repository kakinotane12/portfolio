/**
 * 開発用のプレースホルダー画像を public/ に生成します。
 * 実際の画像が用意できたら、同じファイル名で差し替えるか
 * Markdown 側のパスを書き換えてください。
 *
 *   node scripts/gen-placeholders.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = resolve(root, 'public/images');
mkdirSync(imagesDir, { recursive: true });

const ACCENT = '#2563eb';

/* ---------- プレースホルダー SVG ---------- */
const placeholder = (label, hue) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 70% 96%)"/>
      <stop offset="100%" stop-color="hsl(${hue} 40% 88%)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#g)"/>
  <g fill="none" stroke="hsl(${hue} 30% 70%)" stroke-width="1.5" opacity="0.5">
    <path d="M0 375h1200M600 0v750"/>
  </g>
  <text x="600" y="368" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="600" fill="hsl(${hue} 35% 40%)">${label}</text>
  <text x="600" y="410" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" fill="hsl(${hue} 25% 52%)">1200 &#215; 750</text>
</svg>
`;

const placeholders = [
  ['placeholder-1.svg', 'Placeholder 1', 220],
  ['placeholder-2.svg', 'Placeholder 2', 265],
  ['placeholder-3.svg', 'Placeholder 3', 190],
];

for (const [file, label, hue] of placeholders) {
  writeFileSync(resolve(imagesDir, file), placeholder(label, hue));
}

/* ---------- favicon ---------- */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${ACCENT}"/>
  <text x="16" y="22" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="#fff">S</text>
</svg>
`;
writeFileSync(resolve(root, 'public/favicon.svg'), favicon);

/* ---------- OG 画像（単色の暫定 PNG） ----------
   SNS でシェアされたときに画像が壊れないよう、最低限の PNG を置いておきます。
   TODO: 氏名と肩書きを載せた 1200x630 の画像に差し替えてください。 */
function solidPng(width, height, [r, g, b]) {
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };

  const table = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })();

  function crc32(buf) {
    let c = -1;
    for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return c ^ -1;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor

  const stride = width * 3 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const off = y * stride;
    raw[off] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const p = off + 1 + x * 3;
      raw[p] = r;
      raw[p + 1] = g;
      raw[p + 2] = b;
    }
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

writeFileSync(resolve(imagesDir, 'og.png'), solidPng(1200, 630, [0x1d, 0x4e, 0xd8]));

console.log('placeholder assets written to public/');
