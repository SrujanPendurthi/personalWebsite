import { getElement } from "@/lib/elements";
import { COVER_H, COVER_W, pixelCover } from "@/lib/pixelCover";

const PixelCover = ({ seed, language, className }: { seed: string; language: string | null; className?: string }) => (
  <svg
    viewBox={`0 0 ${COVER_W} ${COVER_H}`}
    shapeRendering="crispEdges"
    aria-hidden
    className={`aspect-[16/10] w-full bg-surface ${className ?? ""}`}
  >
    {pixelCover(seed, getElement(language).color).map((p) => (
      <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={1} height={1} fill={p.fill} />
    ))}
  </svg>
);

export default PixelCover;
