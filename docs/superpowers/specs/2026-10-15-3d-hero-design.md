# Plan: interactive 3D Skylanders hero (React Three Fiber)

## Context
The user wants a React Three Fiber, interactive, Skylanders-themed personal site. Decisions they confirmed:
- **Scope:** the 3D scene replaces the hero on `/` only. `/about`, `/projects` and `/papers` keep the current pixel theme as fast text pages.
- **Scene:** a "Portal of Power" pedestal, with a voxel figure built from `public/srujan.png`, which is 32×32 so it maps 1 pixel to 1 voxel.
  - Clicking the portal cycles the element (Fire, Water, Magic, Tech and so on), which recolors the portal glow and the figure's aura.
  - Three floating crystals are the top 3 repos. Clicking one opens the repo.
- **Motion:**
  - Subtle idle motion: a portal glow pulse, a figure bob and a slow crystal orbit.
  - With `prefers-reduced-motion`, the scene renders a static frame.
  - CLAUDE.md's "No animations" rule gets an exception for the home 3D hero only.
- **Assets:** everything is original and procedural. No Activision models, logos or textures.

Required constraint: the hero text block ("Srujan Pendurthi / ML @ CMU. C enjoyer. / United States") plus the image must still be the first thing a visitor sees.

## Dependencies
I checked these versions against the registry. R3F 9.8.2 supports React `>=19 <19.4`, and the repo has 19.2.4.
- `three@0.186.1`, `@react-three/fiber@9.8.2`, `@react-three/drei@10.7.9`
- dev: `@types/three`

## Files
- `lib/elements.ts` (modify): export `ELEMENTS: Element[]` (the 8, in order) and `elementColor(e: Element): string`, using the existing `COLORS`. Keep `getElement`.
- `lib/voxels.ts` (new, pure, tested): `pixelsToVoxels(data: Uint8ClampedArray, width: number, height: number): { x: number; y: number; color: string }[]`.
  - Skips pixels with alpha < 128.
  - Centers on the origin and flips y, so row 0 is the top.
- `components/hero/HeroScene.tsx` (new, `'use client'`):
  - `<Canvas dpr={[1, 1.5]} frameloop={reduced ? "demand" : "always"}>` plus drei `OrbitControls`, with no zoom or pan and a limited polar angle.
  - Lights.
  - `Portal`: a cylinder pedestal plus an emissive ring in the element color, with a pulse in `useFrame` that is skipped when `reduced`. `onClick` calls `onCycle`, and hovering sets the cursor to a pointer.
  - `RepoCrystals`: three octahedrons in the language element color (via `getElement`). They orbit slowly, show a drei `Html` label on hover, and `onClick` opens `window.open(url, "_blank", "noopener")`.
  - Props: `{ element: Element; onCycle: () => void; repos: HeroRepo[]; reduced: boolean }`.
- `components/hero/VoxelFigure.tsx` (new, `'use client'`):
  - Loads `/srujan.png` into an offscreen canvas and calls `getImageData`, then `pixelsToVoxels`.
  - Renders one `InstancedMesh` of boxes (at most 1024), with per-instance colors.
  - Adds a faint aura in the element color, and a bob when not `reduced`.
- `components/hero/Hero3D.tsx` (new, `'use client'`, the only boundary the page imports):
  - `dynamic(() => import("./HeroScene"), { ssr: false })`, per `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`.
  - Detects WebGL support and `matchMedia("(prefers-reduced-motion: reduce)")`.
  - Owns the `element` state.
  - Fixed-height slot (`h-80`), so there is no layout shift. The fallback is the existing pixel `srujan.png` in a `pixel-frame` while loading or when there is no WebGL.
  - Below the canvas, a real `<button className="pixel-btn">Element: {element} ▸</button>` drives the same `onCycle`, so the scene works by keyboard.
  - An `sr-only` `<ul>` lists links to the 3 crystal repos.
  - The canvas wrapper gets `aria-label`.
- `app/page.tsx` (modify):
  - Stays a server component.
  - `await getRepos()` (existing, `lib/github.ts`, 1h cached), then `.slice(0, 3)` mapped to `HeroRepo = { name; url; language }`, which is exported from `Hero3D.tsx`.
  - Hero layout: the existing text block on the left, `<Hero3D repos={...} />` on the right (below on mobile). The text renders server-side, so it is first either way.
- `CLAUDE.md` (modify): note the animation exception for the home 3D hero, and that it respects reduced motion.
- `docs/superpowers/specs/2026-10-15-3d-hero-design.md`: copy this plan's Context and Files sections, as the brainstorming spec record.

Reuse:
- `getElement` and `COLORS` from `lib/elements.ts`.
- `getRepos` and `selectRepos` from `lib/github.ts`.
- The `pixel-frame` and `pixel-btn` utilities in `app/globals.css`.
- The `ElementBadge` color logic.

Not built (YAGNI): postprocessing/bloom, particles, camera fly-in, 3D on other routes, GLTF models.

## Tests (TDD, `npm test` via node:test)
- `lib/voxels.test.ts`:
  - transparent pixels skipped;
  - count equals opaque pixels;
  - output is centered;
  - y is flipped (the top row has the max y);
  - color is a hex string from the RGB values.
- `lib/elements.test.ts` additions: `ELEMENTS` has 8 unique entries, and `elementColor` matches `getElement` for a mapped language.

## Verification
1. `npm test`, `npm run lint`, `npm run build`. The build must not prerender the canvas, because of `ssr: false`.
2. `npm run dev`, then check in Claude in Chrome:
   - Hero text is visible immediately, and the canvas loads beside it.
   - Dragging orbits the scene.
   - Clicking the portal changes the element color, and so does the HTML button.
   - Hovering a crystal shows its label; clicking opens the repo in a new tab.
   - No console errors.
3. Reduced motion: emulate it with DevTools rendering, or check in JS with `matchMedia`. The scene should be static.
4. No WebGL: force `Hero3D`'s detection to fail temporarily, or use a browser flag. The pixel image fallback should appear.
5. Mobile width 360px: the layout stacks, nothing overflows, and touch-drag works.
6. Check that the `/about` and `/projects` bundles don't include `three`: `grep -l "three" .next/static/chunks` should only be referenced by the home page.
