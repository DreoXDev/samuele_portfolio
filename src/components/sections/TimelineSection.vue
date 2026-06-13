<template>
  <section id="timeline" class="scroll-section py-20 bg-[#09090b] border-b border-border-dark/30 relative">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-red-primary select-none mb-3">
          <span>[</span>
          <span class="text-red-primary">02</span>
          <span class="text-text-subtle">.</span>
          <span class="text-text-main uppercase">Timeline</span>
          <span>]</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-text-main font-mono mt-2">
          git log --oneline --samuele
        </h2>
        <p class="text-sm text-text-muted mt-2">
          A trace of my educational and development journey.
        </p>
      </div>

      <!-- Timeline Git Branch View -->
      <div class="relative pl-8 md:pl-0">
        <!-- Vertical Line (Representing Git main branch) -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border-dark/60 -translate-x-1/2"></div>

        <!-- Timeline Items -->
        <div class="space-y-12">
          <div 
            v-for="(event, idx) in visibleEvents" 
            :key="event.hash"
            :class="[
              'relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0',
              idx % 2 === 0 ? 'md:flex-row-reverse' : ''
            ]"
          >
            <!-- Commit Node (Dot on the line) -->
            <div class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background-dark border-2 border-red-primary -translate-x-1/2 z-10 flex items-center justify-center">
              <div class="w-1.5 h-1.5 rounded-full bg-red-primary animate-ping" v-if="idx === visibleEvents.length - 1"></div>
            </div>

            <!-- Content Card (Left or Right depending on index) -->
            <div :class="['w-full md:w-[45%] pl-4 md:pl-0', idx % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8']">
              <div class="bg-surface-dark/60 border border-border-dark/50 p-5 rounded-lg hover:border-red-primary/30 transition-all duration-200 shadow-lg">
                <div class="flex flex-wrap items-center gap-2 text-xs font-mono mb-2" :class="idx % 2 === 0 ? 'md:justify-end' : 'justify-start'">
                  <span class="text-red-primary font-bold">commit {{ event.hash }}</span>
                  <span class="text-text-subtle">|</span>
                  <span class="text-text-main bg-surface-soft px-1.5 py-0.5 rounded">{{ event.year }}</span>
                </div>
                <h3 class="text-base font-bold text-text-main font-mono mb-2">{{ event.title }}</h3>
                <p class="text-xs text-text-muted leading-relaxed">{{ event.description }}</p>
              </div>
            </div>

            <!-- Spacer for layout balance on desktop -->
            <div class="hidden md:block w-[10%]"></div>
            <div class="hidden md:block w-[45%]"></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { timelineEvents } from '../../data/timeline'

// Separate easter egg events unless explicitly triggered, or show them by default but with distinct styling.
// We'll show all events, including the easter egg with its own flavor.
const visibleEvents = computed(() => timelineEvents)
</script>
