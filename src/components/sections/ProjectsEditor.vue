<template>
  <section id="projects" class="scroll-section projects-section" data-app="projects" data-frame="projects">
    <div class="projects-shell">
      <div class="editor-frame">
        <header class="editor-titlebar" data-editor-boot="chrome">
          <div class="window-controls" aria-hidden="true">
            <span class="control control-red"></span>
            <span class="control control-yellow"></span>
            <span class="control control-green"></span>
          </div>
          <nav aria-label="Portfolio sections" class="editor-global-tabs">
            <a href="#home" class="editor-global-tab" data-nav-target="home">_home</a>
            <a href="#projects" class="editor-global-tab editor-global-tab-active" data-nav-target="projects" aria-current="page">_projects</a>
            <a href="#timeline" class="editor-global-tab" data-nav-target="timeline">_timeline</a>
            <a href="#contact" class="editor-global-tab" data-nav-target="contact">_contact</a>
            <a href="/home-lab" class="editor-global-tab">_home_lab</a>
          </nav>
          <div class="editor-path">{{ activePath }}</div>
        </header>

        <div class="editor-layout">
          <aside class="editor-sidebar" data-editor-boot="tree" aria-label="Project explorer">
            <div class="sidebar-header">
              <span>Explorer</span>
              <span>v1.0.0</span>
            </div>

            <div class="file-tree">
              <div class="tree-root">
                <FolderOpen class="tree-icon tree-icon-root" aria-hidden="true" />
                <span>projects</span>
              </div>

              <button
                type="button"
                role="option"
                class="tree-file tree-readme"
                :class="{ 'tree-file-active': selectedItem === 'readme' }"
                :aria-selected="selectedItem === 'readme'"
                @click="openReadme"
              >
                <FileText class="file-icon" aria-hidden="true" />
                <span>README.md</span>
              </button>

              <div v-for="category in categories" :key="category.name" class="tree-group">
                <button
                  type="button"
                  class="tree-folder"
                  :aria-expanded="category.isOpen"
                  @click="category.isOpen = !category.isOpen"
                >
                  <ChevronRight class="folder-caret" :class="{ 'folder-caret-open': category.isOpen }" aria-hidden="true" />
                  <FolderOpen v-if="category.isOpen" class="tree-icon" aria-hidden="true" />
                  <Folder v-else class="tree-icon" aria-hidden="true" />
                  <span>{{ category.name }}</span>
                </button>

                <div v-show="category.isOpen" class="tree-files" role="listbox" :aria-label="`${category.name} projects`">
                  <button
                    v-for="proj in category.projects"
                    :key="proj.slug"
                    type="button"
                    role="option"
                    class="tree-file"
                    :class="{ 'tree-file-active': activeProject?.slug === proj.slug }"
                    :aria-selected="activeProject?.slug === proj.slug"
                    @click="selectProject(proj)"
                  >
                    <component :is="getFileIcon(proj.fileName)" class="file-icon" aria-hidden="true" />
                    <span>{{ proj.fileName }}</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main class="editor-main">
            <div class="editor-tabs" data-editor-boot="tabs">
              <div class="editor-tab" aria-current="true">
                <component :is="currentIcon" class="tab-icon" aria-hidden="true" />
                <span>{{ currentFileName }}</span>
              </div>
              <div class="editor-tab-meta">{{ editorMode }}</div>
            </div>

            <article v-if="selectedItem === 'readme'" key="readme" class="readme-panel" data-editor-boot="panel">
              <p class="readme-eyebrow" data-editor-boot="detail-item">README.md</p>
              <h2 data-editor-boot="detail-item">~/projects_explorer</h2>
              <p data-editor-boot="detail-item">
                Selected work, experiments and infrastructure projects organized like a workspace.
              </p>
              <div class="readme-note" data-editor-boot="detail-item">
                <p>
                  This section collects some of the things I have built or maintained: portfolio websites,
                  Android apps, self-hosted services and small experiments.
                </p>
                <p>Open a file from the explorer to inspect project details, role, stack and useful links.</p>
              </div>
            </article>

            <article v-else-if="activeProject" :key="activeProject.slug" class="project-panel" data-editor-boot="panel">
              <div class="project-meta" data-editor-boot="detail-item">
                <span>{{ activeProject.category }}</span>
                <span class="project-status">{{ activeProject.status }}</span>
              </div>

              <h3 data-editor-boot="detail-item">{{ activeProject.title }}</h3>
              <p class="project-summary" data-editor-boot="detail-item">{{ activeProject.description }}</p>

              <div class="project-section" data-editor-boot="detail-item">
                <h4>Role</h4>
                <p>{{ activeProject.role }}</p>
              </div>

              <div class="project-section" data-editor-boot="detail-item">
                <h4>Key highlights</h4>
                <ul>
                  <li v-for="highlight in activeProject.highlights" :key="highlight">
                    {{ highlight }}
                  </li>
                </ul>
              </div>

              <div class="project-section" data-editor-boot="detail-item">
                <h4>Stack</h4>
                <div class="stack-list">
                  <span v-for="tech in activeProject.stack" :key="tech">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div
                v-if="activeProject.links.live || activeProject.links.github || activeProject.links.details"
                class="project-actions"
                data-editor-boot="detail-item"
              >
                <a
                  v-if="activeProject.links.live"
                  :href="activeProject.links.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link project-link-primary"
                >
                  <Globe class="action-icon" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
                <a
                  v-if="activeProject.links.github"
                  :href="activeProject.links.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                >
                  <GitBranch class="action-icon" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  v-if="activeProject.links.details"
                  :href="activeProject.links.details"
                  class="project-link"
                >
                  <Terminal class="action-icon" aria-hidden="true" />
                  <span>Infrastructure Details</span>
                </a>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  ChevronRight,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Globe,
  Terminal,
} from '@lucide/vue'
import { projects } from '../../data/projects'
import type { Project } from '../../types/project'

interface CategoryFolder {
  name: string
  isOpen: boolean
  projects: Project[]
}

type SelectedItem = 'readme' | 'project'

const selectedItem = ref<SelectedItem>('readme')
const activeProject = ref<Project | null>(null)

const categories = ref<CategoryFolder[]>([
  {
    name: 'client-work',
    isOpen: true,
    projects: projects.filter((project) => project.folder === 'client-work'),
  },
  {
    name: 'university',
    isOpen: true,
    projects: projects.filter((project) => project.folder === 'university'),
  },
  {
    name: 'infrastructure',
    isOpen: true,
    projects: projects.filter((project) => project.folder === 'infrastructure'),
  },
  {
    name: 'experiments',
    isOpen: false,
    projects: projects.filter((project) => project.folder === 'experiments'),
  },
])

const selectProject = (project: Project) => {
  selectedItem.value = 'project'
  activeProject.value = project
}

const openReadme = () => {
  selectedItem.value = 'readme'
  activeProject.value = null
}

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.docker')) return Terminal
  if (fileName.endsWith('.md') || fileName.endsWith('.txt')) return FileText
  return FileCode
}

const currentFileName = computed(() => {
  return selectedItem.value === 'readme' ? 'README.md' : activeProject.value?.fileName ?? 'README.md'
})

const activePath = computed(() => {
  if (selectedItem.value === 'readme' || !activeProject.value) {
    return 'workspace/README.md'
  }

  return `workspace/${activeProject.value.folder}/${activeProject.value.fileName}`
})

const editorMode = computed(() => {
  return selectedItem.value === 'readme' ? 'markdown.preview' : 'project.details'
})

const currentIcon = computed(() => {
  return selectedItem.value === 'readme' ? FileText : getFileIcon(activeProject.value?.fileName ?? '')
})

onMounted(() => {
  window.addEventListener('select-project', (event: Event) => {
    const slug = (event as CustomEvent<string>).detail
    const found = projects.find((project) => project.slug === slug)

    if (found) {
      selectedItem.value = 'project'
      activeProject.value = found
      const category = categories.value.find((item) => item.name === found.folder)
      if (category) category.isOpen = true
    }
  })
})
</script>

<style scoped>
  .projects-section {
    min-height: 100svh;
    padding: clamp(0.75rem, 2vw, 1.5rem);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-sizing: border-box;
    background:
      radial-gradient(circle at 78% 10%, rgba(255, 59, 59, 0.06), transparent 30%),
      #09090b;
  }

  .projects-shell {
    width: 100%;
    height: calc(100svh - clamp(1.5rem, 4vw, 3rem));
    margin-inline: auto;
  }

  .editor-frame {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    background: #0c0d10;
    box-shadow:
      0 26px 90px rgba(0, 0, 0, 0.42),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .editor-titlebar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 1rem;
    min-height: 3.5rem;
    padding: 0.65rem 0.9rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    background: linear-gradient(180deg, rgba(28, 28, 34, 0.96), rgba(17, 17, 20, 0.96));
  }

  .window-controls {
    display: flex;
    gap: 0.5rem;
  }

  .control {
    width: 0.78rem;
    height: 0.78rem;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.22);
  }

  .control-red {
    background: #ff5f56;
  }

  .control-yellow {
    background: #ffbd2e;
  }

  .control-green {
    background: #27c93f;
  }

  .editor-global-tabs {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    contain: inline-size;
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
  }

  .editor-global-tabs::-webkit-scrollbar {
    display: none;
  }

  .editor-global-tab {
    flex: 0 0 auto;
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

  .editor-global-tab:hover,
  .editor-global-tab:focus-visible {
    color: #f4f4f5;
    border-color: rgba(255, 59, 59, 0.35);
    background: rgba(255, 59, 59, 0.09);
    box-shadow: 0 0 18px rgba(255, 59, 59, 0.12);
  }

  .editor-global-tab-active {
    color: #ff6b6b;
    border-color: rgba(255, 59, 59, 0.4);
    background: rgba(255, 59, 59, 0.12);
  }

  .editor-path {
    color: #71717a;
    font-size: 0.72rem;
    font-weight: 700;
    text-align: right;
  }

  .editor-layout {
    display: grid;
    grid-template-columns: 17rem minmax(0, 1fr);
    min-height: 0;
    flex: 1;
  }

  .editor-sidebar {
    display: flex;
    min-height: 0;
    min-width: 0;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid rgba(255, 255, 255, 0.09);
    background: #08080a;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 2.6rem;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    color: #71717a;
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .file-tree {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.9rem;
    color: #a1a1aa;
    font-size: 0.76rem;
    scrollbar-color: rgba(239, 68, 68, 0.42) rgba(255, 255, 255, 0.04);
    scrollbar-width: thin;
  }

  .tree-root,
  .tree-folder,
  .tree-file {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .tree-root {
    margin-bottom: 0.4rem;
    color: #fafafa;
    font-weight: 800;
  }

  .tree-group {
    margin-top: 0.2rem;
    padding-left: 0.65rem;
  }

  .tree-readme {
    margin: 0.25rem 0 0.45rem 1.1rem;
    width: calc(100% - 1.1rem);
  }

  .tree-folder,
  .tree-file {
    width: 100%;
    border: 0;
    color: inherit;
    background: transparent;
    font: inherit;
    text-align: left;
  }

  .tree-folder {
    min-height: 1.9rem;
    padding: 0.1rem 0.2rem;
    border-radius: 0.35rem;
    color: #c4c4ca;
    cursor: pointer;
  }

  .tree-folder:hover,
  .tree-file:hover {
    color: #fafafa;
    background: rgba(255, 255, 255, 0.045);
  }

  .folder-caret {
    width: 0.8rem;
    height: 0.8rem;
    color: #71717a;
    transition: transform 160ms ease;
  }

  .folder-caret-open {
    transform: rotate(90deg);
  }

  .tree-icon,
  .file-icon,
  .tab-icon,
  .action-icon {
    width: 0.95rem;
    height: 0.95rem;
    flex: 0 0 auto;
  }

  .tree-icon {
    color: #8b8b94;
  }

  .tree-icon-root {
    color: #ef4444;
  }

  .tree-files {
    margin: 0.15rem 0 0.4rem 0.45rem;
    padding-left: 0.85rem;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  .tree-file {
    min-height: 1.95rem;
    padding: 0.1rem 0.55rem;
    border-left: 2px solid transparent;
    border-radius: 0.35rem;
    color: #9ca3af;
    cursor: pointer;
  }

  .tree-file span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tree-file-active {
    border-left-color: #ef4444;
    color: #ff6b6b;
    background: rgba(239, 68, 68, 0.12);
    font-weight: 800;
  }

  .tree-file-active .file-icon {
    color: #ef4444;
  }

  .editor-main {
    display: flex;
    min-width: 0;
    min-height: 0;
    flex-direction: column;
    background:
      linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
      #050506;
    background-size: 100% 3px;
  }

  .editor-tabs {
    display: flex;
    align-items: stretch;
    min-height: 2.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    background: #0d0d0f;
  }

  .editor-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    max-width: min(100%, 22rem);
    padding: 0 1rem;
    border-top: 2px solid #ef4444;
    border-right: 1px solid rgba(255, 255, 255, 0.09);
    color: #ff6b6b;
    background: #050506;
    font-size: 0.76rem;
    font-weight: 800;
  }

  .editor-tab span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editor-tab-meta {
    margin-left: auto;
    padding: 0.9rem 1rem 0;
    color: #71717a;
    font-size: 0.68rem;
    font-weight: 800;
  }

  .project-panel {
    width: min(100%, 46rem);
    margin: auto;
    padding: clamp(1.5rem, 4vw, 3rem);
    animation: panel-enter 220ms ease both;
  }

  .readme-panel {
    width: min(100%, 48rem);
    margin: auto;
    padding: clamp(1.5rem, 5vw, 4rem);
    animation: panel-enter 220ms ease both;
  }

  .readme-eyebrow {
    margin: 0 0 1rem;
    color: #ff6b6b;
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .readme-panel h2 {
    margin: 0;
    color: #fafafa;
    font-size: clamp(2.2rem, 6vw, 4.6rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0;
  }

  .readme-panel > p {
    max-width: 42rem;
    margin: 1.4rem 0 0;
    color: #c4c4ca;
    font-size: clamp(0.98rem, 1.4vw, 1.15rem);
    line-height: 1.85;
  }

  .readme-note {
    display: grid;
    gap: 0.75rem;
    margin-top: 2rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.65rem;
    background: rgba(255, 255, 255, 0.035);
  }

  .readme-note p {
    margin: 0;
    color: #a1a1aa;
    font-size: 0.9rem;
    line-height: 1.75;
  }

  .project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .project-meta span,
  .stack-list span {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0 0.55rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.35rem;
    color: #a1a1aa;
    background: rgba(255, 255, 255, 0.035);
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .project-meta .project-status {
    border-color: rgba(239, 68, 68, 0.35);
    color: #ff6b6b;
    background: rgba(239, 68, 68, 0.1);
  }

  .project-panel h3 {
    margin: 0;
    color: #fafafa;
    font-size: clamp(1.75rem, 3.6vw, 2.8rem);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: 0;
  }

  .project-summary {
    margin: 1rem 0 0;
    color: #c4c4ca;
    font-size: 0.95rem;
    line-height: 1.8;
  }

  .project-section {
    margin-top: 1.35rem;
  }

  .project-section h4 {
    margin: 0 0 0.55rem;
    color: #71717a;
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .project-section p,
  .project-section li {
    color: #a1a1aa;
    font-size: 0.86rem;
    line-height: 1.7;
  }

  .project-section p {
    margin: 0;
  }

  .project-section ul {
    display: grid;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .project-section li {
    position: relative;
    padding-left: 1rem;
  }

  .project-section li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 999px;
    background: #ef4444;
  }

  .stack-list,
  .project-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .project-actions {
    margin-top: 1.6rem;
    padding-top: 1.4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.35rem;
    padding: 0 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 0.45rem;
    color: #c4c4ca;
    background: rgba(255, 255, 255, 0.035);
    font-size: 0.78rem;
    font-weight: 800;
    text-decoration: none;
    transition:
      color 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;
  }

  .project-link-primary {
    border-color: #ef4444;
    color: #ffffff;
    background: #ef4444;
  }

  .project-link:hover,
  .project-link:focus-visible {
    color: #ffffff;
    border-color: rgba(239, 68, 68, 0.45);
    background: rgba(239, 68, 68, 0.12);
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.12);
    transform: translateY(-1px);
  }

  .project-link-primary:hover,
  .project-link-primary:focus-visible {
    background: #dc2626;
  }

  @keyframes panel-enter {
    from {
      opacity: 0;
      transform: translateY(0.4rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-panel,
    .readme-panel {
      animation: none;
    }

    .folder-caret,
    .project-link {
      transition: none;
    }
  }

  @media (max-width: 860px) {
    .projects-section {
      min-height: 100svh;
      overflow: visible;
    }

    .projects-shell {
      height: auto;
      min-height: calc(100svh - 1.5rem);
    }

    .editor-frame {
      min-height: calc(100svh - 1.5rem);
      overflow: visible;
    }

    .editor-titlebar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 0.85rem;
      min-width: 0;
    }

    .editor-path {
      display: none;
    }

    .editor-global-tabs {
      order: 2;
      width: 100%;
      min-width: 0;
      padding-top: 0.55rem;
    }

    .editor-global-tab {
      min-height: 1.9rem;
      padding: 0 0.65rem;
      font-size: 0.68rem;
    }

    .editor-layout {
      grid-template-columns: 1fr;
      min-height: 0;
    }

    .editor-sidebar {
      max-height: min(19rem, 42svh);
      border-right: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    }

    .file-tree {
      flex: 1;
    }

    .editor-main {
      min-height: 0;
    }

    .project-panel,
    .readme-panel {
      margin: 0 auto;
    }
  }

  @media (max-width: 560px) {
    .projects-section {
      padding: 0;
    }

    .projects-shell {
      width: 100%;
      min-height: 100svh;
    }

    .editor-frame {
      min-height: 100svh;
      border-width: 0 0 1px;
      border-radius: 0;
    }

    .editor-titlebar {
      gap: 0.75rem;
      min-height: 3.2rem;
    }

    .editor-tab-meta {
      display: none;
    }

    .project-panel,
    .readme-panel {
      padding: 1.25rem;
    }

    .project-actions {
      flex-direction: column;
    }

    .project-link {
      justify-content: center;
      width: 100%;
    }
  }
</style>
