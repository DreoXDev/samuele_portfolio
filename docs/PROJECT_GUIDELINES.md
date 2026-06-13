# Project Guidelines — Samuele Poretti Portfolio

This document outlines the general guidelines, philosophies, and instructions for maintaining and expanding this portfolio codebase.

## 1. Project Vision

The portfolio is designed to mimic a developer environment (Terminal $\to$ IDE Explorer $\to$ Git Commit Timeline $\to$ API Endpoint Contact). It should feel functional, modern, and high-performance. 

- **Keep it lightweight:** Avoid importing heavy libraries unless absolutely required.
- **Maintain the theme:** Stick to the dark-mode aesthetic with red highlights and monospaced typography.
- **Isolate data:** Never hardcode project descriptions or timeline events directly in the UI components. Keep them in `src/data/`.

## 2. Adding a New Project

To add a new project to the portfolio:
1. Open [src/data/projects.ts](file:///d:/Projects/dreox_portfolio/src/data/projects.ts).
2. Append a new object following the `Project` type definition from [src/types/project.ts](file:///d:/Projects/dreox_portfolio/src/types/project.ts).
3. Ensure the project has:
   - A unique `slug` (kebab-case).
   - A descriptive `fileName` matching its technology type (e.g. `my-app.kt` or `my-site.astro`).
   - A specific `folder` category matching one of the categories in [src/components/sections/ProjectsEditor.vue](file:///d:/Projects/dreox_portfolio/src/components/sections/ProjectsEditor.vue).
4. Put a placeholder SVG in `public/assets/images/projects/` if you don't have a screenshot yet.

## 3. Updating the Timeline

To add a new milestone to the timeline:
1. Open [src/data/timeline.ts](file:///d:/Projects/dreox_portfolio/src/data/timeline.ts).
2. Add a new element to the `timelineEvents` array.
3. Generate a random 7-character hexadecimal string as the `hash` (to mimic a git commit hash).
4. Save the file. The timeline page element will automatically render the new node.

## 4. Home Lab Page Safety Rules

The `/home-lab` page is intended to showcase system administration and Docker networking skills.
- **NO CREDENTIALS:** Never commit passwords, tokens, API keys, or certificates. Use environment variables if needed, or omit them.
- **NO PRIVATE IPS/DNS:** Do not reference actual internal server IP addresses, exact ports, or specific private domain configurations.
- **NO PATHS:** Do not expose exact directory structures of the home server hosting directory. Keep descriptions general.
