import { test } from "node:test";
import assert from "node:assert/strict";
import { getElement } from "./elements.ts";

test("maps known languages", () => {
  assert.equal(getElement("C").name, "Earth");
  assert.equal(getElement("Python").name, "Magic");
  assert.equal(getElement("Rust").name, "Fire");
  assert.equal(getElement("Go").name, "Water");
  assert.equal(getElement("TypeScript").name, "Tech");
});

test("unknown or null language falls back to Undead", () => {
  assert.equal(getElement(null).name, "Undead");
  assert.equal(getElement("Brainfuck").name, "Undead");
});
