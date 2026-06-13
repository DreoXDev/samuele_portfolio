<template>
  <section id="projects" class="scroll-section py-20 bg-background-dark border-b border-border-dark/30">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="mb-12">
        <div class="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-red-primary select-none mb-3">
          <span>[</span>
          <span class="text-red-primary">01</span>
          <span class="text-text-subtle">.</span>
          <span class="text-text-main uppercase">Projects Editor</span>
          <span>]</span>
          <div class="h-[1px] flex-grow bg-border-dark/60 ml-2"></div>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-text-main font-mono">
          ~/projects_explorer
        </h2>
        <p class="text-sm text-text-muted mt-2">
          Click on files in the directory explorer below to view project details in the editor.
        </p>
      </div>

      <!-- IDE Mockup Container -->
      <div class="w-full border border-border-dark/60 bg-surface-dark/95 rounded-lg overflow-hidden flex flex-col md:flex-row h-[520px] shadow-2xl">
        
        <!-- Sidebar Explorer (25% Width on Desktop) -->
        <div class="w-full md:w-64 border-r border-border-dark/60 bg-[#0c0c0e] flex flex-col select-none overflow-y-auto shrink-0">
          <div class="px-4 py-2 text-xs font-bold text-text-subtle uppercase border-b border-border-dark/30 flex items-center justify-between">
            <span>Workspace Explorer</span>
            <span class="text-[10px] text-red-primary font-mono font-normal">v1.0.0</span>
          </div>

          <!-- Tree Directory -->
          <div class="p-3 font-mono text-xs text-text-muted space-y-1.5">
            <!-- Root Folder: projects -->
            <div class="flex items-center gap-1.5 text-text-main font-semibold py-0.5">
              <component :is="FolderOpen" class="w-4.5 h-4.5 text-red-primary" />
              <span>projects</span>
            </div>

            <!-- Categories -->
            <div v-for="category in categories" :key="category.name" class="pl-4">
              <!-- Category Header -->
              <div 
                class="flex items-center gap-1.5 cursor-pointer py-1 hover:text-text-main transition-colors"
                @click="category.isOpen = !category.isOpen"
              >
                <component :is="category.isOpen ? FolderOpen : Folder" class="w-4 h-4 text-amber-500/80" />
                <span class="font-medium">{{ category.name }}</span>
              </div>

              <!-- Project Files -->
              <div v-show="category.isOpen" class="pl-4 border-l border-border-dark/40 ml-2 mt-0.5 space-y-0.5">
                <div 
                  v-for="proj in category.projects" 
                  :key="proj.slug"
                  :class="[
                    'flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded transition-all duration-150',
                    activeProject.slug === proj.slug 
                      ? 'bg-red-primary/10 text-red-primary font-bold border-l-2 border-red-primary' 
                      : 'hover:bg-surface-soft/40 text-text-muted hover:text-text-main'
                  ]"
                  @click="selectProject(proj)"
                >
                  <component :is="getFileIcon(proj.fileName)" class="w-3.5 h-3.5" :class="activeProject.slug === proj.slug ? 'text-red-primary' : 'text-text-subtle'" />
                  <span class="truncate">{{ proj.fileName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Editor (75% Width) -->
        <div class="flex-grow flex flex-col bg-[#08080a] overflow-hidden min-w-0">
          <!-- Editor Tabs Header -->
          <div class="flex border-b border-border-dark/60 bg-[#0d0d0f] text-xs font-mono select-none overflow-x-auto">
            <div class="flex items-center gap-2 px-4 py-2.5 bg-[#08080a] text-red-primary border-t-2 border-t-red-primary border-r border-border-dark/60 font-semibold shrink-0">
              <component :is="getFileIcon(activeProject.fileName)" class="w-3.5 h-3.5 text-red-primary" />
              <span>{{ activeProject.fileName }}</span>
            </div>
            <div class="flex-grow bg-[#0d0d0f]"></div>
          </div>

          <!-- Code Content Panel -->
          <div class="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col md:flex-row gap-6">
            
            <!-- Code representation (Left side of editor) -->
            <div class="w-full md:w-1/2 flex font-mono text-[11px] leading-relaxed text-text-muted border border-border-dark/30 p-4 rounded bg-[#0a0a0c] overflow-x-auto min-w-[240px]">
              <!-- Line Numbers -->
              <div class="text-text-subtle/40 select-none text-right pr-4 border-r border-border-dark/20 space-y-0.5 w-6 shrink-0">
                <div v-for="n in 18" :key="n">{{ n }}</div>
              </div>
              
              <!-- Syntaxy Content -->
              <div class="pl-4 whitespace-pre text-text-muted select-text">
<span class="text-amber-500">const</span> project = {
  title: <span class="text-emerald-400">"{{ activeProject.title }}"</span>,
  year: <span class="text-purple-400">{{ activeProject.year }}</span>,
  category: <span class="text-emerald-400">"{{ activeProject.category }}"</span>,
  role: <span class="text-emerald-400">"{{ activeProject.role }}"</span>,
  status: <span class="text-red-primary">"{{ activeProject.status }}"</span>,
  stack: [
    <span v-for="(tech, i) in activeProject.stack" :key="tech">    <span class="text-emerald-400">"{{ tech }}"</span>{{ i &lt; activeProject.stack.length - 1 ? ',' : '' }}
</span>  ],
  completed: <span class="text-amber-500">{{ activeProject.status === 'completed' }}</span>,
  featured: <span class="text-amber-500">{{ activeProject.featured }}</span>
}
              </div>
            </div>

            <!-- Details Render (Right side of editor) -->
            <div class="w-full md:w-1/2 flex flex-col justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[10px] font-mono border border-border-dark px-1.5 py-0.5 rounded uppercase text-text-subtle bg-surface-soft">{{ activeProject.category }}</span>
                  <span class="text-[10px] font-mono border border-red-primary/30 px-1.5 py-0.5 rounded uppercase text-red-primary bg-red-primary/5">{{ activeProject.status }}</span>
                </div>
                <h3 class="text-xl font-bold text-text-main font-mono mb-2">{{ activeProject.title }}</h3>
                <p class="text-xs text-text-muted leading-relaxed mb-4">
                  {{ activeProject.description }}
                </p>
                
                <!-- Highlights -->
                <div class="space-y-1 mb-4">
                  <div class="text-xs font-bold text-text-subtle font-mono uppercase">Key Highlights:</div>
                  <ul class="list-inside list-disc text-xs text-text-muted space-y-1 pl-1">
                    <li v-for="hl in activeProject.highlights" :key="hl" class="marker:text-red-primary">{{ hl }}</li>
                  </ul>
                </div>

                <!-- Technologies badges -->
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="tech in activeProject.stack" 
                    :key="tech"
                    class="px-2 py-0.5 bg-surface-soft border border-border-dark/60 rounded text-[10px] font-mono text-text-muted"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Project Links CTA -->
              <div class="flex flex-wrap gap-3 pt-4 border-t border-border-dark/30">
                <a 
                  v-if="activeProject.links.live" 
                  :href="activeProject.links.live" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-primary bg-red-primary text-white font-mono text-xs rounded hover:bg-red-strong shadow-sm hover:shadow-red-glow transition-all duration-200"
                >
                  <component :is="Globe" class="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
                <a 
                  v-if="activeProject.links.github" 
                  :href="activeProject.links.github" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-dark/60 bg-surface-soft text-text-muted font-mono text-xs rounded hover:border-red-primary/40 hover:text-text-main transition-all duration-200"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a 
                  v-if="activeProject.links.details" 
                  :href="activeProject.links.details" 
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-dark/60 bg-surface-soft text-text-muted font-mono text-xs rounded hover:border-red-primary/40 hover:text-text-main transition-all duration-200"
                >
                  <component :is="Terminal" class="w-3.5 h-3.5" />
                  <span>Infrastructure Details</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Folder, FolderOpen, FileCode, FileText, Globe, Terminal } from '@lucide/vue'
import { projects } from '../../data/projects'
import type { Project } from '../../types/project'

interface CategoryFolder {
  name: string
  isOpen: boolean
  projects: Project[]
}

const activeProject = ref<Project>(projects[0])

// Group projects by folders
const categories = ref<CategoryFolder[]>([
  {
    name: 'client-work',
    isOpen: true,
    projects: projects.filter(p => p.folder === 'client-work')
  },
  {
    name: 'university',
    isOpen: true,
    projects: projects.filter(p => p.folder === 'university')
  },
  {
    name: 'infrastructure',
    isOpen: true,
    projects: projects.filter(p => p.folder === 'infrastructure')
  },
  {
    name: 'experiments',
    isOpen: false,
    projects: projects.filter(p => p.folder === 'experiments')
  }
])

const selectProject = (project: Project) => {
  activeProject.value = project
}

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.astro') || fileName.endsWith('.wix')) return FileCode
  if (fileName.endsWith('.kt')) return FileCode
  if (fileName.endsWith('.docker')) return Terminal
  return FileText
}

onMounted(() => {
  // Listen for navigation trigger from terminal command line
  window.addEventListener('select-project', (e: any) => {
    const slug = e.detail
    const found = projects.find(p => p.slug === slug)
    if (found) {
      activeProject.value = found
      // Open the category folder if it was closed
      const cat = categories.value.find(c => c.name === found.folder)
      if (cat) cat.isOpen = true
    }
  })
})
</script>
