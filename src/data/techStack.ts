export interface TechItem {
  name: string
  category: 'frontend' | 'backend' | 'infrastructure' | 'languages' | 'tools'
}

export const techStack: TechItem[] = [
  { name: 'Astro', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML5 & CSS3', category: 'frontend' },
  
  { name: 'Node.js', category: 'backend' },
  { name: 'Firebase', category: 'backend' },
  
  { name: 'Docker', category: 'infrastructure' },
  { name: 'Docker Compose', category: 'infrastructure' },
  { name: 'Traefik', category: 'infrastructure' },
  { name: 'Cloudflare Tunnels', category: 'infrastructure' },
  { name: 'Tailscale', category: 'infrastructure' },
  { name: 'Prometheus & Grafana', category: 'infrastructure' },
  
  { name: 'Kotlin', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'Markdown', category: 'languages' },
  
  { name: 'Git & GitHub', category: 'tools' },
  { name: 'Obsidian', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Android Studio', category: 'tools' }
]
