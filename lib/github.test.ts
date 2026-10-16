import { test } from "node:test";
import assert from "node:assert/strict";
import { selectRepos, type Repo } from "./github.ts";

const repo = (o: Partial<Repo>): Repo => ({
  id: 1, name: "r", description: "d", html_url: "", homepage: null, language: null,
  stargazers_count: 0, forks_count: 0, fork: false, archived: false,
  updated_at: "", pushed_at: "2026-01-01T00:00:00Z", topics: [], ...o,
});

test("drops forks and archived, keeps repos without a description", () => {
  const out = selectRepos([
    repo({ id: 1, fork: true }),
    repo({ id: 2, archived: true }),
    repo({ id: 3, description: null }),
    repo({ id: 4 }),
  ]);
  assert.deepEqual(out.map((r) => r.id).sort(), [3, 4]);
});

test("sorts by pushed_at descending", () => {
  const out = selectRepos([
    repo({ id: 1, pushed_at: "2026-01-01T00:00:00Z" }),
    repo({ id: 2, pushed_at: "2026-06-01T00:00:00Z" }),
  ]);
  assert.deepEqual(out.map((r) => r.id), [2, 1]);
});
