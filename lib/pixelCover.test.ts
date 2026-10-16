import { test } from "node:test";
import assert from "node:assert/strict";
import { pixelCover, COVER_W, COVER_H } from "./pixelCover.ts";

const RED = "#ff0000";

test("is deterministic per seed", () => {
  assert.deepEqual(pixelCover("reDoors", RED), pixelCover("reDoors", RED));
});

test("different seeds give different covers", () => {
  assert.notDeepEqual(pixelCover("reDoors", RED), pixelCover("TranscriptFlow", RED));
});

test("stays on a 16x10 grid", () => {
  assert.equal(COVER_W, 16);
  assert.equal(COVER_H, 10);
  for (const p of pixelCover("x", RED)) {
    assert.ok(p.x >= 0 && p.x < COVER_W && p.y >= 0 && p.y < COVER_H);
  }
});

test("is mirrored horizontally", () => {
  const cells = new Map(pixelCover("mirror", RED).map((p) => [`${p.x},${p.y}`, p.fill]));
  for (const [key, fill] of cells) {
    const [x, y] = key.split(",").map(Number);
    assert.equal(cells.get(`${COVER_W - 1 - x},${y}`), fill);
  }
});

test("only uses the element color and the accent", () => {
  const fills = new Set(pixelCover("palette", RED).map((p) => p.fill));
  for (const f of fills) assert.ok(f === RED || f === "#e6cfa1");
  assert.ok(fills.size > 0);
});
