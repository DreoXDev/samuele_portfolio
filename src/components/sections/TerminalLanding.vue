<template>
  <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background-dark border-b border-border-dark/30">
    <!-- Animated background logs -->
    <AnimatedTerminalBackground />

    <!-- Foreground Content -->
    <div class="relative z-10 w-full max-w-4xl flex flex-col gap-8 md:gap-12">
      
      <!-- Bio / Intro -->
      <div class="text-left max-w-2xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-main mb-3">
          Samuele Poretti
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-red-primary font-medium mb-4">
          Computer Science Student & Developer
        </p>
        <p class="text-sm sm:text-base text-text-muted leading-relaxed">
          I build web interfaces, Android apps and self-hosted tools. Focused on clean code, containerized deployments, and robust network routing.
        </p>
      </div>

      <!-- Interactive Terminal Emulator -->
      <div class="w-full border border-border-dark/60 bg-surface-dark/90 rounded-lg overflow-hidden shadow-2xl shadow-red-primary/5">
        <!-- Window Title Bar -->
        <div class="flex items-center justify-between px-4 py-2 border-b border-border-dark/60 bg-surface-dark/50 select-none">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500/70 border border-red-600/30"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500/70 border border-yellow-600/30"></div>
            <div class="w-3 h-3 rounded-full bg-green-500/70 border border-green-600/30"></div>
          </div>
          <div class="text-xs text-text-muted font-mono truncate px-4">samuele@portfolio:~ (bash)</div>
          <div class="w-12"></div>
        </div>

        <!-- Terminal Terminal Screen -->
        <div 
          ref="terminalBody"
          class="p-4 md:p-6 h-72 md:h-80 overflow-y-auto font-mono text-xs md:text-sm text-text-main flex flex-col gap-2 scroll-smooth"
          @click="focusInput"
        >
          <div>Welcome to my portfolio shell. Type <span class="text-red-primary font-bold">help</span> to see available commands.</div>
          
          <!-- Command History -->
          <div v-for="(line, index) in history" :key="index" class="whitespace-pre-wrap">
            <div v-if="line.type === 'input'" class="flex items-center gap-1.5 text-text-muted">
              <span class="text-red-primary">samuele@portfolio:~$</span>
              <span>{{ line.text }}</span>
            </div>
            <div v-else-if="line.type === 'output'" class="text-text-muted pl-4">
              {{ line.text }}
            </div>
            <div v-else-if="line.type === 'error'" class="text-red-primary/90 pl-4 font-bold">
              {{ line.text }}
            </div>
            <div v-else-if="line.type === 'success'" class="text-emerald-400 pl-4">
              {{ line.text }}
            </div>
          </div>

          <!-- Active Prompt Line -->
          <div class="flex items-center gap-1.5">
            <span class="text-red-primary select-none">samuele@portfolio:~$</span>
            <input 
              ref="commandInput"
              v-model="inputValue"
              type="text"
              class="flex-grow bg-transparent border-none outline-none text-text-main font-mono caret-red-primary focus:ring-0 p-0"
              autofocus
              @keydown.enter="handleCommand"
            />
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons / CTA -->
      <div class="flex flex-wrap gap-4 items-center justify-start font-mono text-xs sm:text-sm">
        <a 
          href="#projects" 
          class="px-4 py-2 rounded border border-border-dark/60 bg-surface-soft text-text-muted hover:border-red-primary/40 hover:text-red-primary hover:shadow-red-glow transition-all duration-200"
        >
          [ 01. Projects ]
        </a>
        <a 
          href="/home-lab" 
          class="px-4 py-2 rounded border border-border-dark/60 bg-surface-soft text-text-muted hover:border-red-primary/40 hover:text-red-primary hover:shadow-red-glow transition-all duration-200"
        >
          [ 02. Home Lab ]
        </a>
        <a 
          href="#timeline" 
          class="px-4 py-2 rounded border border-border-dark/60 bg-surface-soft text-text-muted hover:border-red-primary/40 hover:text-red-primary hover:shadow-red-glow transition-all duration-200"
        >
          [ 03. Timeline ]
        </a>
        <a 
          href="#contact" 
          class="px-4 py-2 rounded border border-border-dark/60 bg-surface-soft text-text-muted hover:border-red-primary/40 hover:text-red-primary hover:shadow-red-glow transition-all duration-200"
        >
          [ 04. Contact ]
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import AnimatedTerminalBackground from '../interactive/AnimatedTerminalBackground.vue'
import { commandResponses } from '../../data/terminalLines'

interface HistoryLine {
  text: string
  type: 'input' | 'output' | 'error' | 'success'
}

const history = ref<HistoryLine[]>([
  { text: 'whoami', type: 'input' },
  { text: 'Samuele Poretti — Computer Science Student & Developer based in Milan, Italy.', type: 'output' }
])

const inputValue = ref('')
const commandInput = ref<HTMLInputElement | null>(null)
const terminalBody = ref<HTMLElement | null>(null)

const focusInput = () => {
  if (commandInput.value) {
    commandInput.value.focus()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const handleCommand = () => {
  const rawInput = inputValue.value.trim()
  inputValue.value = ''

  if (!rawInput) return

  // Add input to history
  history.value.push({ text: rawInput, type: 'input' })

  const parts = rawInput.toLowerCase().split(' ')
  const cmd = parts[0]
  const arg1 = parts[1]
  const arg2 = parts[2]

  if (cmd === 'clear') {
    history.value = []
    scrollToBottom()
    return
  }

  // Handle special compound commands like "go homelab" or "projects open ..."
  if (cmd === 'go' && arg1 === 'homelab') {
    history.value.push({ text: 'Navigating to /home-lab page...', type: 'success' })
    scrollToBottom()
    setTimeout(() => {
      window.location.href = '/home-lab'
    }, 800)
    return
  }

  if (cmd === 'projects' && arg1 === 'open') {
    if (!arg2) {
      history.value.push({ text: 'Please specify a project slug. E.g. "projects open le-tende-ad-arte"', type: 'error' })
    } else {
      history.value.push({ text: `Locating and opening workspace for ${arg2}...`, type: 'success' })
      scrollToBottom()
      setTimeout(() => {
        const element = document.getElementById('projects')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          // Dispatch custom event to let the project editor know to open this project
          const event = new CustomEvent('select-project', { detail: arg2 })
          window.dispatchEvent(event)
        }
      }, 500)
    }
    scrollToBottom()
    return
  }

  // Regular commands
  if (commandResponses[cmd]) {
    commandResponses[cmd].forEach(line => {
      history.value.push({ text: line, type: 'output' })
    })
  } else if (cmd === 'strait-of-messina') {
    history.value.push({ text: '🏊‍♂️ Entering training simulation for Strait of Messina crossing: 3.2 km of open-water current navigation...', type: 'success' })
    history.value.push({ text: 'Status: 78% conditioning completed. Targets set for summer 2026.', type: 'output' })
  } else if (cmd === 'sudo') {
    history.value.push({ text: 'samuele is not in the sudoers file. This incident will be reported.', type: 'error' })
  } else {
    history.value.push({ text: `command not found: ${cmd}. Type "help" for a list of commands.`, type: 'error' })
  }

  scrollToBottom()
}
</script>
