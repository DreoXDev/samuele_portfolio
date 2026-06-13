import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    title: 'Website Le Tende ad Arte',
    slug: 'le-tende-ad-arte',
    fileName: 'le-tende-ad-arte.astro',
    folder: 'client-work',
    year: '2026',
    category: 'client',
    status: 'completed',
    featured: true,
    summary: 'Real client website focused on presenting services clearly and using client-provided photo assets inside a clean animated experience.',
    description: 'A fast, SEO-optimized, responsive website developed for an interior design and curtains craft business. Built using Astro to ensure great performance and deployed on a standard Linux hosting environment.',
    role: 'Full stack developer',
    stack: ['Astro', 'Tailwind CSS', 'Vanilla CSS', 'JavaScript'],
    highlights: ['Highly performant static generator', 'SEO friendly layout', 'Smooth scroll animations'],
    links: {
      live: 'https://www.letendeadarte.it/',
      github: 'https://github.com/DreoXDev/le-tende-ad-arte'
    },
    images: ['/assets/images/projects/le-tende-ad-arte-placeholder.svg']
  },
  {
    title: 'Website Volontari Cittadini',
    slug: 'volontari-cittadini-website',
    fileName: 'volontari-cittadini.wix',
    folder: 'client-work',
    year: '2023',
    category: 'client',
    status: 'completed',
    featured: true,
    summary: 'Website built for a Milan-based volunteer association to communicate its mission, activities and useful information in a clear and accessible way.',
    description: 'Created a website for a local volunteer organization in Milan. Focus was placed on making administrative information easily accessible to elderly citizens, displaying news, and optimizing page speed on drag-and-drop systems.',
    role: 'Website builder / full stack',
    stack: ['Wix.com'],
    links: {
      live: 'https://www.volontaricittadini.it/'
    },
    highlights: ['Accessibility improvements', 'Community news feed integration', 'Custom domains and DNS management'],
    images: ['/assets/images/projects/volontari-cittadini-placeholder.svg']
  },
  {
    title: 'Volontari Cittadini Android App',
    slug: 'voci-android-app',
    fileName: 'voci-android-app.kt',
    folder: 'university',
    year: '2024',
    category: 'university',
    status: 'completed',
    featured: true,
    summary: 'Android university project built with Kotlin and Jetpack Compose to support volunteer field work through structured reports, data management and a Mapbox-based map.',
    description: 'Mobile application designed for volunteers of "Volontari Cittadini". It includes structured reporting tools, persistent storage, real-time sync with Firebase, and map overlays via Mapbox to coordinate area cleanups and assistance.',
    role: 'UI/UX, data management, Firebase',
    stack: ['Kotlin', 'Jetpack Compose', 'Android', 'Firebase', 'Mapbox'],
    links: {
      github: 'https://github.com/SPoretti/Voci-App'
    },
    highlights: ['Jetpack Compose modern UI', 'Mapbox SDK implementation', 'Real-time Firebase database sync'],
    images: ['/assets/images/projects/voci-app-placeholder.svg']
  },
  {
    title: 'Personal Home Lab',
    slug: 'personal-home-lab',
    fileName: 'personal-home-lab.docker',
    folder: 'infrastructure',
    year: '2025',
    category: 'infrastructure',
    status: 'in-progress',
    featured: true,
    summary: 'Personal Linux home server used to experiment with Docker, reverse proxy routing, secure tunnels, monitoring and self-hosted services.',
    description: 'Self-hosted home server running containerized applications. Focuses on network configuration, reverse proxy setup using Traefik, secure external access via Cloudflare Tunnels, service isolation, Tailscale mesh networking, and custom dashboards.',
    role: 'Server setup, container management, routing, monitoring',
    stack: ['Ubuntu Server', 'Docker', 'Docker Compose', 'Traefik', 'Cloudflare Tunnel', 'Tailscale', 'Prometheus', 'Grafana', 'Jellyfin', 'Seafile', 'n8n'],
    links: {
      details: '/home-lab'
    },
    highlights: ['Container orchestration with Docker', 'Traefik automatic SSL & routing', 'Prometheus & Grafana infrastructure monitoring'],
    images: ['/assets/images/homelab/dashboard-placeholder.svg']
  },
  {
    title: 'AI/RAG University Knowledge Bases',
    slug: 'ai-rag-university',
    fileName: 'ai-rag-university.md',
    folder: 'experiments',
    year: '2026',
    category: 'experiment',
    status: 'experimental',
    featured: false,
    summary: 'Experimental university knowledge bases and retrieval-oriented notes built to support exam preparation and structured study workflows.',
    description: 'Setup of customized markdown vaults combined with AI-assisted vector indexing and Retrieval-Augmented Generation (RAG) tools to index lecture notes, textbooks, and past exams for university study workflows.',
    role: 'Knowledge base design, AI-assisted study workflow',
    stack: ['Markdown', 'Obsidian', 'GitHub', 'AI-assisted development'],
    links: {},
    highlights: ['Semantic vector search integration', 'Custom Obsidian templates', 'Syncing via Git version control'],
    images: ['/assets/images/projects/ai-rag-placeholder.svg']
  }
]
