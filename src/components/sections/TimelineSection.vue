<template>
  <section
    id="timeline"
    class="scroll-section timeline-section"
    data-app="timeline"
    data-frame="timeline"
    aria-label="Timeline canvas"
  >
    <div class="timeline-shell" data-timeline-boot="chrome">
      <header class="timeline-topbar">
        <div class="timeline-controls" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav aria-label="Portfolio sections" class="timeline-global-tabs">
          <a href="#home" class="timeline-global-tab" data-nav-target="home">_home</a>
          <a href="#projects" class="timeline-global-tab" data-nav-target="projects">_projects</a>
          <a
            href="#timeline"
            class="timeline-global-tab timeline-global-tab-active"
            data-nav-target="timeline"
            aria-current="page"
          >
            _timeline
          </a>
          <a href="/home-lab" class="timeline-global-tab">_home_lab</a>
          <a href="#contact" class="timeline-global-tab" data-nav-target="contact">_contact</a>
        </nav>

        <div class="timeline-path">workspace/timeline/samuele.canvas</div>
      </header>

      <div class="timeline-toolbar">
        <div>
          <p class="timeline-kicker">[ 02 . TIMELINE CANVAS ]</p>
          <h2>git log --oneline --samuele</h2>
        </div>
        <p>A trace of my educational and development journey.</p>
      </div>

      <div class="timeline-workspace">
        <aside class="timeline-sidebar" aria-label="Timeline legend">
          <span class="timeline-sidebar-label">nodes</span>
          <div
            v-for="event in visibleEvents"
            :key="`legend-${event.hash}`"
            class="timeline-legend-item"
          >
            <span>{{ event.year }}</span>
            <small>{{ event.hash }}</small>
          </div>
        </aside>

        <div class="timeline-canvas" data-timeline-canvas data-timeline-boot="canvas">
          <div
            class="timeline-track"
            :style="{ '--total': visibleEvents.length }"
            role="list"
            aria-label="Timeline events"
          >
            <div class="timeline-line" data-timeline-boot="line"></div>
            <article
              v-for="(event, idx) in visibleEvents"
              :key="event.hash"
              class="timeline-event"
              :class="{
                'timeline-event-top': idx % 2 === 0,
                'timeline-event-bottom': idx % 2 !== 0,
                'timeline-event-easter': event.isEasterEgg,
              }"
              :style="{ '--index': idx }"
              role="listitem"
            >
              <div class="timeline-anchor" data-timeline-boot="node" aria-hidden="true"></div>
              <div class="timeline-connector" data-timeline-boot="node" aria-hidden="true"></div>
              <div class="timeline-card" data-timeline-boot="card">
                <header>
                  <span>commit {{ event.hash }}</span>
                  <strong>{{ event.year }}</strong>
                </header>
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { timelineEvents } from '../../data/timeline'

const visibleEvents = computed(() => timelineEvents)
</script>

<style scoped>
  .timeline-section {
    box-sizing: border-box;
    min-height: 100svh;
    padding: clamp(0.75rem, 1.5vw, 1.25rem);
    color: #f4f4f5;
    background:
      radial-gradient(circle at 18% 12%, rgba(239, 68, 68, 0.11), transparent 28rem),
      linear-gradient(135deg, #070708 0%, #0d0d11 48%, #09090b 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .timeline-shell {
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr);
    width: 100%;
    height: calc(100svh - clamp(1.5rem, 3vw, 2.5rem));
    min-height: 41rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.85rem;
    background:
      linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
      rgba(9, 9, 12, 0.94);
    background-size: 28px 28px, 28px 28px, auto;
    box-shadow: 0 28px 90px rgba(0, 0, 0, 0.52);
  }

  .timeline-topbar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
    min-height: 3.25rem;
    padding: 0.55rem 0.85rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    backdrop-filter: blur(18px);
  }

  .timeline-controls {
    display: inline-flex;
    gap: 0.45rem;
  }

  .timeline-controls span {
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .timeline-controls span:nth-child(1) {
    background: #ff5f57;
  }

  .timeline-controls span:nth-child(2) {
    background: #febc2e;
  }

  .timeline-controls span:nth-child(3) {
    background: #28c840;
  }

  .timeline-global-tabs {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .timeline-global-tabs::-webkit-scrollbar {
    display: none;
  }

  .timeline-global-tab {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0 0.75rem;
    border: 1px solid transparent;
    border-radius: 0.45rem 0.45rem 0.2rem 0.2rem;
    color: #9ca3af;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.03);
    transition:
      color 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .timeline-global-tab:hover,
  .timeline-global-tab:focus-visible {
    color: #f4f4f5;
    border-color: rgba(255, 59, 59, 0.35);
    background: rgba(255, 59, 59, 0.09);
    box-shadow: 0 0 18px rgba(255, 59, 59, 0.12);
  }

  .timeline-global-tab-active {
    color: #ff6b6b;
    border-color: rgba(255, 59, 59, 0.4);
    background: rgba(255, 59, 59, 0.12);
  }

  .timeline-path {
    max-width: 19rem;
    overflow: hidden;
    color: #8b8b94;
    font-size: 0.68rem;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .timeline-toolbar {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem clamp(1rem, 2vw, 1.6rem);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(0, 0, 0, 0.12);
  }

  .timeline-kicker {
    margin: 0 0 0.3rem;
    color: #ff6b6b;
    font-size: 0.72rem;
    font-weight: 900;
  }

  .timeline-toolbar h2 {
    margin: 0;
    color: #f8fafc;
    font-size: clamp(1.05rem, 2vw, 1.7rem);
    font-weight: 900;
    letter-spacing: 0;
  }

  .timeline-toolbar > p {
    max-width: 29rem;
    margin: 0;
    color: #a1a1aa;
    font-size: 0.78rem;
    line-height: 1.6;
  }

  .timeline-workspace {
    display: grid;
    grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
    min-height: 0;
  }

  .timeline-sidebar {
    display: grid;
    align-content: start;
    gap: 0.55rem;
    padding: 1rem;
    border-right: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.025);
  }

  .timeline-sidebar-label {
    color: #71717a;
    font-size: 0.66rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .timeline-legend-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    min-height: 2rem;
    padding: 0 0.55rem;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 0.45rem;
    background: rgba(0, 0, 0, 0.18);
  }

  .timeline-legend-item span {
    color: #f4f4f5;
    font-size: 0.72rem;
    font-weight: 900;
  }

  .timeline-legend-item small {
    color: #ff6b6b;
    font-size: 0.62rem;
    font-weight: 900;
  }

  .timeline-canvas {
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow-x: auto;
    overflow-y: hidden;
    cursor: grab;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.026) 1px, transparent 1px),
      radial-gradient(circle at 30% 45%, rgba(239, 68, 68, 0.08), transparent 24rem);
    background-size: 34px 34px, 34px 34px, auto;
    scrollbar-color: rgba(239, 68, 68, 0.42) rgba(255, 255, 255, 0.04);
    scrollbar-width: thin;
  }

  .timeline-canvas.is-dragging {
    cursor: grabbing;
    user-select: none;
  }

  .timeline-track {
    position: relative;
    width: calc(var(--total) * 22.5rem + 20rem);
    min-width: 100%;
    height: 100%;
    min-height: 29rem;
  }

  .timeline-line {
    position: absolute;
    left: 6rem;
    right: 6rem;
    top: 50%;
    height: 1px;
    background:
      linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), rgba(255, 107, 107, 0.5), rgba(255, 255, 255, 0.16), transparent);
    transform-origin: left center;
  }

  .timeline-event {
    position: absolute;
    left: calc(6rem + var(--index) * 22.5rem);
    top: 50%;
    width: min(19rem, 78vw);
  }

  .timeline-anchor {
    position: absolute;
    left: 0;
    top: -0.45rem;
    width: 0.9rem;
    height: 0.9rem;
    border: 2px solid #ff5b5b;
    border-radius: 999px;
    background: #08080b;
    box-shadow: 0 0 22px rgba(255, 70, 70, 0.34);
    transform: translateX(-50%);
    z-index: 2;
  }

  .timeline-connector {
    position: absolute;
    left: 0;
    width: 1px;
    height: 3.2rem;
    background: linear-gradient(rgba(255, 255, 255, 0.18), rgba(255, 107, 107, 0.3));
  }

  .timeline-event-top .timeline-connector {
    bottom: 0.5rem;
  }

  .timeline-event-bottom .timeline-connector {
    top: 0.5rem;
  }

  .timeline-card {
    position: absolute;
    left: 0;
    width: 100%;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.7rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025)),
      rgba(10, 10, 14, 0.9);
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.34);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;
  }

  .timeline-event-top .timeline-card {
    bottom: 3.6rem;
  }

  .timeline-event-bottom .timeline-card {
    top: 3.6rem;
  }

  .timeline-card:hover {
    border-color: rgba(255, 75, 75, 0.55);
    box-shadow: 0 26px 65px rgba(0, 0, 0, 0.42), 0 0 30px rgba(239, 68, 68, 0.12);
    transform: translateY(-2px);
  }

  .timeline-card header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 0.72rem;
    color: #ff6b6b;
    font-size: 0.68rem;
    font-weight: 900;
  }

  .timeline-card strong {
    padding: 0.15rem 0.45rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.35rem;
    color: #f4f4f5;
    background: rgba(255, 255, 255, 0.06);
  }

  .timeline-card h3 {
    margin: 0 0 0.55rem;
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 900;
    line-height: 1.3;
  }

  .timeline-card p {
    margin: 0;
    color: #a1a1aa;
    font-size: 0.74rem;
    line-height: 1.65;
  }

  .timeline-event-easter .timeline-card {
    border-color: rgba(255, 107, 107, 0.24);
    background:
      linear-gradient(180deg, rgba(239, 68, 68, 0.09), rgba(255, 255, 255, 0.025)),
      rgba(10, 10, 14, 0.9);
  }

  @media (max-width: 899px) {
    .timeline-section {
      padding: 0;
    }

    .timeline-shell {
      height: auto;
      min-height: 100svh;
      border-width: 0 0 1px;
      border-radius: 0;
    }

    .timeline-topbar {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .timeline-path {
      grid-column: 1 / -1;
      max-width: none;
    }

    .timeline-toolbar {
      display: grid;
      align-items: start;
    }

    .timeline-workspace {
      display: block;
    }

    .timeline-sidebar {
      display: none;
    }

    .timeline-canvas {
      overflow-x: hidden;
      overflow-y: visible;
      cursor: auto;
    }

    .timeline-track {
      display: grid;
      gap: 1rem;
      width: auto;
      min-height: auto;
      padding: 1rem;
    }

    .timeline-line {
      left: 1.4rem;
      right: auto;
      top: 1rem;
      bottom: 1rem;
      width: 1px;
      height: auto;
    }

    .timeline-event {
      position: relative;
      left: auto;
      top: auto;
      width: auto;
      padding-left: 1.6rem;
    }

    .timeline-anchor {
      left: 0;
      top: 1.2rem;
    }

    .timeline-connector {
      display: none;
    }

    .timeline-card,
    .timeline-event-top .timeline-card,
    .timeline-event-bottom .timeline-card {
      position: relative;
      top: auto;
      bottom: auto;
      left: auto;
    }
  }
</style>
