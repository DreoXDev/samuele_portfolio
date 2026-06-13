export interface TerminalLine {
  text: string
  type: 'input' | 'output' | 'system' | 'error' | 'success'
}

export const backgroundLogs: string[] = [
  'Initializing portfolio build pipeline...',
  '[astro] parsing package.json dependencies...',
  '[astro] active integrations: vue, tailwindcss-vite',
  '[vite] configuring server on http://localhost:4321',
  '[tailwind] scanning directory trees for tailwind syntax...',
  '[tailwind] compiled global styles in 124ms',
  '[docker] checking daemon connectivity...',
  '[docker] containers running: 12 (healthy)',
  '[traefik] reverse proxy route loaded for portfolio.samueleporetti.it',
  '[cloudflare] tunnel established securely (mil-edge-01)',
  '[git] HEAD points to commit 90a3c7f (init-v1)',
  '[flutter] caching legacy project dependencies...',
  '[android] gradle daemon running, compiler warmed up',
  '[obsidian] indexing vault: university-notes',
  '[gsap] registering scroll triggers and animation hooks...',
  '[system] memory usage: 2.1GB / 8.0GB',
  '[system] core temperature stable at 42°C',
  '[system] connection check: latency to 1.1.1.1 is 12ms',
  '[system] welcome back, Samuele.'
]

export const commandResponses: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  whoami     - Show identity information',
    '  status     - Show current student/dev status',
    '  projects   - List featured projects',
    '  homelab    - Details about self-hosted setup',
    '  neofetch   - Display system information and ASCII logo',
    '  clear      - Clear the screen'
  ],
  whoami: [
    'User: samuele_poretti',
    'Role: Computer Science Student & Developer',
    'Focus: Frontend architectures, Android mobile applications, Home Lab deployment',
    'Location: Milan, Italy'
  ],
  status: [
    'Current Status:',
    '  [Degree] BSc Computer Science Student (UniMi)',
    '  [Stack]  Astro, Vue, Kotlin, Docker, Python',
    '  [Swim]   Strait of Messina crossing 2026 (Training in progress)'
  ],
  projects: [
    'Featured Projects:',
    '  - le-tende-ad-arte: Custom business website built with Astro.',
    '  - voci-android-app: Kotlin & Compose application for field volunteers.',
    '  - personal-home-lab: Docker containers, Traefik, Cloudflare, Tailscale.',
    'Type "projects open <slug>" to view in editor, or scroll down to the Project Section.'
  ],
  homelab: [
    'Home Lab Infrastructure:',
    '  OS: Ubuntu Server LTS',
    '  Orchestration: Docker, Docker Compose',
    '  Network: Cloudflare Tunnel, Traefik Reverse Proxy, Tailscale VPN',
    '  Services: Prometheus/Grafana, Jellyfin, Seafile, n8n, Custom Dashboard',
    'Type "go homelab" to navigate to the /home-lab page.'
  ],
  neofetch: [
    '    .--.       samuele@poretti-portfolio',
    '   |o_o |      -------------------------',
    '   |:_/ |      OS: Astro Linux x86_64',
    '  //   \\ \\     Host: Self-Hosted HomeLab',
    ' (|     | )    Kernel: 6.1.0-astro-custom',
    '/\'\\_   _/`\\    Shell: bash 5.2.15',
    '\\___)=(___/    DE: JetBrains Mono / CSS Grid'
  ]
}
