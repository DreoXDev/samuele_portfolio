<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none select-none font-mono text-[11px] leading-relaxed text-red-primary/10 p-4 z-0">
    <div class="flex flex-col justify-end h-full">
      <div 
        v-for="(line, idx) in activeLines" 
        :key="line.id" 
        :class="{ 'opacity-15': !isReducedMotion, 'opacity-5': isReducedMotion }"
        class="transition-opacity duration-300 whitespace-pre"
      >
        <span class="text-text-subtle/20">[{{ line.timestamp }}]</span> {{ line.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { backgroundLogs } from '../../data/terminalLines'
import { prefersReducedMotion } from '../../lib/animations/reducedMotion'

interface LogItem {
  id: number
  text: string
  timestamp: string
}

const activeLines = ref<LogItem[]>([])
const isReducedMotion = ref(false)
let logInterval: number | null = null
let counter = 0

const formatTime = () => {
  const now = new Date()
  return now.toTimeString().split(' ')[0]
}

const addLogLine = () => {
  if (backgroundLogs.length === 0) return

  const randomIndex = Math.floor(Math.random() * backgroundLogs.length)
  const lineText = backgroundLogs[randomIndex]

  activeLines.value.push({
    id: counter++,
    text: lineText,
    timestamp: formatTime()
  })

  // Limit lines to prevent DOM bloat
  if (activeLines.value.length > 25) {
    activeLines.value.shift()
  }
}

onMounted(() => {
  isReducedMotion.value = prefersReducedMotion()
  
  // Seed initial lines
  for (let i = 0; i < 8; i++) {
    addLogLine()
  }

  if (!isReducedMotion.value) {
    logInterval = window.setInterval(addLogLine, 1800)
  }
})

onUnmounted(() => {
  if (logInterval) {
    clearInterval(logInterval)
  }
})
</script>
