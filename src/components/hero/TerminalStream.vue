<template>
  <div class="terminal-stream" data-boot="stream" aria-hidden="true">
    <div class="terminal-stream-lines">
      <div
        v-for="line in activeLines"
        :key="line.id"
        class="terminal-stream-line"
      >
        <span class="terminal-stream-time">[{{ line.timestamp }}]</span>
        <span :class="line.kindClass">{{ line.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { prefersReducedMotion } from '../../lib/animations/reducedMotion'

interface StreamLine {
  id: number
  text: string
  timestamp: string
  kindClass: string
}

const TERMINAL_LINES = [
  '[astro] compiling src/pages/index.astro',
  '[vite] HMR update /src/components/hero/TerminalHero.astro',
  '[vue] hydrating terminal stream island',
  '[tailwind] resolving terminal window utilities',
  '[docker] checking container health: portfolio_web',
  '[traefik] route matched Host(`dreoxdev.it`)',
  '[cloudflared] tunnel heartbeat OK',
  '[prometheus] scraping node_exporter:9100',
  '[portfolio] rendering project workspace',
  '[git] branch feat/terminal-hero ready',
  '[deploy] npm run build completed in 1.42s',
  '[home-lab] dashboard service healthy',
  '[android] gradle cache warm for Voci app',
  '[study] indexing university notes',
]

const EASTER_EGGS = [
  'samuele@portfolio:~$ whoami -> Computer Science student based in Milan',
  '[dreox] routing packets through the home lab',
  '[voci] Android app archive loaded',
  '[le-tende-ad-arte] optimizing client website assets',
  '[knowledge-base] exam notes indexed for retrieval',
  '[security] SQL injection payload rejected',
  '[apa] Dijkstra sanity check passed',
  '[focus] deep work session logged',
  '[dreoxdev.it] tunnel stable without router port forwarding',
]

const activeLines = ref<StreamLine[]>([])
let timer: number | undefined
let counter = 0

const formatTime = () => {
  const now = new Date()
  return now.toTimeString().split(' ')[0]
}

const pickLine = () => {
  const pool = Math.random() > 0.22 ? TERMINAL_LINES : EASTER_EGGS
  const text = pool[Math.floor(Math.random() * pool.length)]

  return {
    text,
    kindClass: text.startsWith('samuele@') ? 'terminal-stream-command' : 'terminal-stream-output',
  }
}

const addLine = () => {
  const next = pickLine()

  activeLines.value.push({
    id: counter++,
    text: next.text,
    timestamp: formatTime(),
    kindClass: next.kindClass,
  })

  if (activeLines.value.length > 35) {
    activeLines.value.shift()
  }
}

const scheduleNextLine = () => {
  const delay = 800 + Math.floor(Math.random() * 800)
  timer = window.setTimeout(() => {
    addLine()
    scheduleNextLine()
  }, delay)
}

onMounted(() => {
  const reducedMotion = prefersReducedMotion()
  const initialLines = reducedMotion ? 10 : 18

  for (let i = 0; i < initialLines; i++) {
    addLine()
  }

  if (!reducedMotion) {
    scheduleNextLine()
  }
})

onUnmounted(() => {
  if (timer) {
    window.clearTimeout(timer)
  }
})
</script>

<style scoped>
  .terminal-stream {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    z-index: 1;
    padding: clamp(1rem, 2.2vw, 2rem);
    color: rgba(244, 244, 245, 0.52);
    mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 76%, transparent 100%);
  }

  .terminal-stream-lines {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.32rem;
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: clamp(0.64rem, 0.92vw, 0.82rem);
    line-height: 1.45;
  }

  .terminal-stream-line {
    width: max-content;
    max-width: min(88vw, 92rem);
    white-space: nowrap;
    opacity: 0;
    transform: translateY(0.35rem);
    animation: stream-enter 420ms ease forwards;
  }

  .terminal-stream-time {
    color: rgba(113, 113, 122, 0.68);
    margin-right: 0.65rem;
  }

  .terminal-stream-output {
    color: rgba(244, 244, 245, 0.5);
  }

  .terminal-stream-command {
    color: rgba(255, 107, 107, 0.66);
  }

  @keyframes stream-enter {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-stream-line {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }

  @media (max-width: 760px) {
    .terminal-stream {
      padding: 0.85rem;
    }

    .terminal-stream-lines {
      gap: 0.26rem;
      font-size: 0.62rem;
    }
  }
</style>
