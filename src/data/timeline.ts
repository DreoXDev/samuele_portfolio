export interface TimelineEvent {
  year: string
  title: string
  description: string
  hash: string
  isEasterEgg?: boolean
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2020',
    title: 'First projects during high school',
    description: 'Developed Python-based Discord bots for automated community moderation, and created the first static website for the local sports group "Tecri Nuoto".',
    hash: 'a8f3b21'
  },
  {
    year: '2022',
    title: 'First desktop tools',
    description: 'Built productivity scripts and automated data workflows, including a custom salary calculation utility developed specifically for a department head at Humanitas.',
    hash: 'c4d7e9b'
  },
  {
    year: '2023',
    title: 'First public website release',
    description: 'Designed and launched the official public website for the volunteer association "Volontari Cittadini", enabling improved accessibility for community initiatives.',
    hash: 'e2f91a5'
  },
  {
    year: '2024',
    title: 'Android app development',
    description: 'Coordinated and designed the "Voci-App" Android application for university coursework, featuring database synchronization via Firebase and custom Mapbox overlays.',
    hash: '8b4d1c3'
  },
  {
    year: '2025',
    title: 'Home Lab & Infrastructure deployment',
    description: 'Assembled a personal Linux server running Docker containers. Configured secure ingress routes using Cloudflare Tunnels, Traefik, and established internal mesh networking via Tailscale.',
    hash: 'fd5a8c2'
  },
  {
    year: '2026',
    title: 'AI/RAG exploration and freelance work',
    description: 'Experimented with local LLM integration and RAG pipelines for study. Built and launched "Le Tende ad Arte" website using Astro. Deployed this personal portfolio.',
    hash: '90a3c7f'
  },
  {
    year: '2026',
    title: 'Next personal challenge: Strait of Messina',
    description: 'Preparing for an open-water swim crossing the Strait of Messina. Translating endurance, planning, and focus from sports to software engineering.',
    hash: '7e11b8a',
    isEasterEgg: true
  }
]
