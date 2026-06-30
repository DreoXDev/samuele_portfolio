# Animation Guidelines - Samuele Poretti Portfolio

This document outlines the animation standards, performance limits and accessibility rules for the portfolio.

## Libraries and Tooling

- GSAP is used for startup animations, frame transitions and small staged reveals.
- The shared GSAP import is centralized in `src/lib/animations/gsap.ts`.
- CSS transitions are preferred for hover, focus and small state changes.
- Scroll-bound plugin timelines are not part of the current frame system.

## Reduced Motion

Always honor system-level reduced motion settings via `prefersReducedMotion()` from `src/lib/animations/reducedMotion.ts`.

When reduced motion is active:

- Do not start the fullscreen frame snapping mode.
- Keep sections in normal document flow.
- Avoid staged GSAP timelines.
- Prefer instant visibility and native scrolling.

## Performance Rules

- Animate `transform` and `opacity` where possible.
- Avoid continuous scroll-bound animation loops.
- Keep the app switcher lightweight and decorative.
- Clean up global event listeners in Vue component unmount hooks.
- Do not add polling or intervals unless there is a clear user-facing need.

## Current Interaction Model

- `ScrollSceneController.vue` owns desktop frame mode, hash handling, wheel/touch navigation, the Alt+Tab-style switcher and frame boot animations.
- Timeline horizontal interaction is scoped to the timeline canvas.
- Contact note scroll is allowed to consume wheel input before frame switching.

## What to Avoid

- No fake live dashboards without real data.
- No heavy WebGL or video-based scroll effects.
- No animations that make contact or project content harder to read.
