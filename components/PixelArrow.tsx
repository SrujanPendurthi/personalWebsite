const CELLS = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [4, 1], [4, 2], [4, 3], [1, 4], [2, 4], [3, 4]];

const PixelArrow = ({ size = 10 }: { size?: number }) => (
  <svg viewBox="0 0 5 5" width={size} height={size} shapeRendering="crispEdges" aria-hidden className="inline-block">
    {CELLS.map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
    ))}
  </svg>
);

export default PixelArrow;
