import { test } from "node:test";
import assert from "node:assert/strict";
import { COVERS, PALETTE, coverArt } from "./covers.ts";
import { COVER_W, COVER_H } from "./pixelCover.ts";

const REPOS = [
  "112Final", "audire", "Hack112", "hackcmu2026", "kvAdmission", "lagunaLab", "mantiEngine", "matalu",
  "miningGame", "moeStream", "Notes", "OdiNotes", "odiNotes-MCP", "personalWebsite", "Seer",
  "skills-introduction-to-github", "syspractice", "TartanHacks_E-Walkers", "tinyloop", "whis",
  "ytTranscript", "TranscriptFlow", "reDoors",
];

test("every cover is a 16x10 grid of palette characters", () => {
  for (const [name, rows] of Object.entries(COVERS)) {
    assert.equal(rows.length, COVER_H, `${name} rows`);
    for (const row of rows) {
      assert.equal(row.length, COVER_W, `${name}: "${row}"`);
      for (const ch of row) assert.ok(ch === "." || ch in PALETTE, `${name}: bad char ${ch}`);
    }
  }
});

test("every current repo and featured project has a cover", () => {
  for (const name of REPOS) assert.ok(coverArt(name), name);
});

test("lookup is case-insensitive and unknown names return null", () => {
  assert.deepEqual(coverArt("SEER"), coverArt("Seer"));
  assert.equal(coverArt("no-such-repo"), null);
});

test("transparent cells are skipped and colors come from the palette", () => {
  const art = coverArt("Seer");
  assert.ok(art && art.length > 0 && art.length < COVER_W * COVER_H);
  for (const p of art ?? []) assert.ok(Object.values(PALETTE).includes(p.fill));
});
