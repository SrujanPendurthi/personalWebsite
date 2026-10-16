# Project: Personal Portfolio Website

## Overview
A high-performance, minimalist personal portfolio website for a software engineering student to showcase technical projects, blog posts, and professional experience. The design is simple, developer-centric, accessible, and optimized for speed. No animations. 

Use this color(E6CFA1) and two other that ensure a good neutral color pallette.

The following block should be the first thing someone should see when they land on the page. Along with the 'srujan.png'
"
Srujan Pendurthi
ML @ CMU. C enjoyer.
United States
"

## Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS (Dark mode optimized)

---

## Core Features & Architecture

### 1. Structure & Routing
- `/` - Landing page: Brief, high-impact bio, featured projects, and quick links.
- `/about` - Detailed background, technical skillset, and education.
- `/projects` - Grid/list layout dynamically powered by the GitHub API.
- `/papers` - Authored research papers (hidden from nav, empty until first paper is added to `lib/data.ts`).
- `/blog` - Markdown/MDX-driven technical blog for writing about systems, tooling, or engineering concepts.

### 2. Dynamic GitHub Integration
- **Endpoint:** Fetch directly from `https://api.github.com/users/{username}/repos?sort=updated`.
- **Filtering:** Filter out forks (`!repo.fork`) automatically. Focus on displaying active repositories.
- **Security:** Keep the GitHub Personal Access Token (`GITHUB_TOKEN`) strictly server-side using environment variables. Never leak it to client bundles.
- **Caching & Rate Limits:** Use Next.js Server Components with native fetch caching (`next: { revalidate: 3600 }`) to cache data for 1 hour, protecting against GitHub API rate limits.

### 3. Component Design Principles
- **Minimalism:** Lean heavily on sharp typography, monospaced details, subtle slate/zinc border highlights, and zero layout shift. Avoid heavy animations.
- **Performance:** Use React Server Components (RSC) by default. Keep `'use client'` usage restricted to minimal interaction boundaries.

---

## Coding Style & Instructions for Claude

### General Rules
- Write clean, strictly type-safe **TypeScript**. Avoid using `any` type assertions.
- Adhere to **Next.js App Router** conventions (`layout.tsx`, `page.tsx`, loading states).
- Use **Tailwind CSS** utility classes for responsive layouts. Prefer structured Tailwind tokens over inline arbitary values where possible.
- Keep components modular, self-contained, and highly scannable.

### Code Preferences
- Use functional components with arrow functions.
- Import individual icons directly from `lucide-react` (e.g., `import { Github, Star } from 'lucide-react'`).
- Keep code concise; eliminate redundant comments unless documenting complex API logic or caching strategies.

---

## Current Sprint Tasks

- [ ] Initialize Next.js project with TypeScript, Tailwind CSS, and standard configurations.
- [ ] Set up the base layout with a responsive navbar and footer (`app/layout.tsx`).
- [ ] Create the landing page layout (`app/page.tsx`) featuring a clean hero section.
- [ ] Implement the dynamic server-side GitHub fetch routine in `app/projects/page.tsx`.
- [ ] Build the `ProjectCard` component displaying repo name, stars, forks, language indicator, and links.
- [ ] Configure local MDX file reading for the `/blog` route.
      
      
Ask any follow-up questions you may have. Sacrifice grammar to be concise when speaking with me.

@AGENTS.md
