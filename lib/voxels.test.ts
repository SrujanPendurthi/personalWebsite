import { test } from "node:test";
import assert from "node:assert/strict";
import { pixelsToVoxels } from "./voxels.ts";

// 2x2 image: top-left red opaque, top-right transparent, bottom row blue opaque
const data = new Uint8ClampedArray([
  255, 0, 0, 255, 0, 0, 0, 0,
  0, 0, 255, 255, 0, 0, 255, 200,
]);

test("skips transparent pixels", () => {
  assert.equal(pixelsToVoxels(data, 2, 2).length, 3);
});

test("centers on origin and flips y so top row is highest", () => {
  const v = pixelsToVoxels(data, 2, 2);
  const red = v.find((p) => p.color === "#ff0000");
  assert.deepEqual(red && { x: red.x, y: red.y }, { x: -0.5, y: 0.5 });
  assert.ok(v.filter((p) => p.color === "#0000ff").every((p) => p.y === -0.5));
});

test("color is hex from rgb", () => {
  assert.deepEqual(pixelsToVoxels(data, 2, 2).map((p) => p.color).sort(), ["#0000ff", "#0000ff", "#ff0000"]);
});
