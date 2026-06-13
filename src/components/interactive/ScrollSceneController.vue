<template>
  <!-- Invisible utility component to manage page scroll animations -->
  <div class="hidden" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from '../../lib/animations/gsap'
import { prefersReducedMotion } from '../../lib/animations/reducedMotion'

onMounted(() => {
  if (prefersReducedMotion()) return

  // Register GSAP ScrollTrigger plugin dynamically to avoid SSR errors
  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger)

    // Select all sections to animate
    const sections = document.querySelectorAll('.scroll-section')

    sections.forEach((section) => {
      // Fade in section content smoothly as it scrolls into view
      gsap.fromTo(
        section,
        { opacity: 0.1, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  })
})
</script>
