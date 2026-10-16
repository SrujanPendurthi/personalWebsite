# Editorial redesign with pixel accents

## Intent
Redesign site after long-nguyen.dev (light, quiet, single narrow column, type-led) with small pixel-art accents.

## Decisions (user-approved)
- Remove 3D Portal hero, its deps (three, @react-three/fiber, @react-three/drei, @types/three) and lib/voxels.
- Palette: bg `#fffbf5`, ink `#2d1724`, muted = ink 60%, accent `#E6CFA1` (highlights + pixel accents only). Light only.
- Font: Space Grotesk 400 everywhere; Press Start 2P only for "srujan." logo mark.
- No animations (CLAUDE.md exception removed).
- Selected Works covers: generated deterministic pixel-art SVG per project (seeded by name, colored by language element). Optional `image` field overrides later.
- No resume link (PDF contains phone number). Contact row: Email, GitHub, LinkedIn.

## Layout
- Column `max-w-[66ch]`, generous vertical spacing, no card borders.
- Nav: "srujan." left; About, Projects right. Papers hidden.
- Home: intro (48px pixel avatar, uppercase name h1 ~2.5rem, tagline, location) -> contact row -> Selected Works ↘ (featuredProjects, cover + name + period + first highlight + stack) -> short bio + "More about me ↘" -> footer.
- Experience only on /about.
- Section h2: small uppercase + pixel ↘ arrow.
- Pixel accents: avatar, covers, pixel arrow, square bullets, pixel dashed divider above footer.
- /about, /projects, /papers: same type/spacing; borderless rows; /projects keeps live GitHub fetch with small pixel cover per repo.

## Units
- `lib/pixelCover.ts`: `pixelCover(seed: string, color: string): { x: number; y: number; fill: string }[]` on 16x10 grid, horizontally mirrored, fills only `color` or `#e6cfa1`. Pure, tested.
- `components/PixelCover.tsx`: server SVG, `shape-rendering="crispEdges"`.
- `components/PixelArrow.tsx`: tiny ↘ SVG.

## Verification
`npm test`, lint, build; visual check (`/`, `/about`, `/projects`, 360px).
