# Animation Guidelines — Samuele Poretti Portfolio

This document outlines the animation standards, libraries, performance limits, and accessibility rules for the portfolio.

## 1. Libraries and Tooling

We use **GSAP (GreenSock Animation Platform)** with the **ScrollTrigger** plugin for UI transitions. 
- The GSAP registration and imports are centralized in [src/lib/animations/gsap.ts](file:///d:/Projects/dreox_portfolio/src/lib/animations/gsap.ts) to prevent server-side rendering (SSR) errors in Astro.
- CSS transitions are preferred for simple states (hovers, cursor blinking) to keep overhead low.

## 2. Accessibility: Reduced Motion
> [!IMPORTANT]
> Some users have vestibular disorders where animations cause dizziness. We must honor their system settings.

- Always check if the user prefers reduced motion using `prefersReducedMotion()` from [src/lib/animations/reducedMotion.ts](file:///d:/Projects/dreox_portfolio/src/lib/animations/reducedMotion.ts).
- If reduced motion is active:
  - Do NOT trigger GSAP ScrollTriggers.
  - Disable the background log stream intervals.
  - Set transition duration times to zero or instant.

## 3. Performance Best Practices

To maintain 60 FPS scrolling:
1. **Animate `transform` and `opacity` only:** Avoid animating properties that trigger layout recalculation (like `width`, `height`, `top`, `left`, `margin`).
2. **Limit DOM elements:** For example, the background terminal log simulator ([src/components/interactive/AnimatedTerminalBackground.vue](file:///d:/Projects/dreox_portfolio/src/components/interactive/AnimatedTerminalBackground.vue)) must clean up elements and limit the list size to 25 lines.
3. **Avoid heavy loops:** Never run continuous Javascript animation loops on scroll. Rely on ScrollTrigger's optimized event listener binding.

## 4. What to Avoid
- No complex WebGL/Three.js canvases.
- No heavy video-based scroll frames.
- No flashy, distracting animations that compromise the reading of professional CV information.
