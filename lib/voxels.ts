export type Voxel = { x: number; y: number; color: string };

const hex = (n: number) => n.toString(16).padStart(2, "0");

export const pixelsToVoxels = (data: Uint8ClampedArray, width: number, height: number): Voxel[] => {
  const voxels: Voxel[] = [];
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const i = (row * width + col) * 4;
      if (data[i + 3] < 128) continue;
      voxels.push({
        x: col - (width - 1) / 2,
        y: (height - 1) / 2 - row,
        color: `#${hex(data[i])}${hex(data[i + 1])}${hex(data[i + 2])}`,
      });
    }
  }
  return voxels;
};
