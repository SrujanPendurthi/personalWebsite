# Editorial Redesign Implementation Plan

**Spec:** docs/superpowers/specs/2026-10-16-editorial-redesign-design.md
Execution: native (inline), final whole-branch review.

1. Remove 3D: delete components/hero, lib/voxels*.ts; npm uninstall three @react-three/fiber @react-three/drei @types/three; build passes.
2. pixelCover (TDD): lib/pixelCover.test.ts (deterministic, in bounds 16x10, mirrored, fills subset of {color,#e6cfa1}, different seeds differ) -> RED -> lib/pixelCover.ts -> GREEN. Add components/PixelCover.tsx, components/PixelArrow.tsx.
3. Theme: globals.css tokens + remove pixel-frame/pixel-btn, add `.pixel-divider`; layout.tsx Space Grotesk + Press Start 2P (logo only); Navbar, Footer.
4. Home rewrite per spec.
5. About, Projects (ProjectCard row + cover), Papers, ExperienceTimeline, PaperCard restyle.
6. CLAUDE.md: palette + no-animation restored; route notes.
7. Verify: test, lint, build, grep no `pixel-frame|pixel-btn|three`, visual check; final review.
