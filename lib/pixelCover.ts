export const COVER_W = 16;
export const COVER_H = 10;
const ACCENT = "#e6cfa1";

export type CoverPixel = { x: number; y: number; fill: string };

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const pixelCover = (seed: string, color: string): CoverPixel[] => {
  const rand = mulberry32(hash(seed));
  const pixels: CoverPixel[] = [];
  for (let y = 0; y < COVER_H; y++) {
    for (let x = 0; x < COVER_W / 2; x++) {
      const r = rand();
      if (r > 0.6) continue;
      const fill = r < 0.35 ? color : ACCENT;
      pixels.push({ x, y, fill }, { x: COVER_W - 1 - x, y, fill });
    }
  }
  return pixels;
};
