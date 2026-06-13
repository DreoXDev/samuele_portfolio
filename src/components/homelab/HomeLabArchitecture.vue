<template>
  <section class="py-16 border-b border-border-dark/30 bg-background-dark/50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-text-main font-mono mb-2">
          Infrastructure Architecture Map
        </h2>
        <p class="text-xs text-text-muted">
          Interactive diagram. Click or hover on nodes to learn more.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <!-- SVG Diagram Column (2/3 width) -->
        <div class="lg:col-span-2 border border-border-dark/60 bg-surface-dark/40 rounded-lg p-4 flex items-center justify-center min-h-[350px]">
          <svg viewBox="0 0 600 320" class="w-full max-w-lg h-auto text-text-main select-none font-mono">
            <!-- Definitions for markers and filters -->
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#71717A" />
              </marker>
            </defs>

            <!-- Node: Internet -->
            <g 
              class="cursor-pointer group" 
              @mouseenter="selectedNode = 'internet'"
              @click="selectedNode = 'internet'"
            >
              <rect x="250" y="10" width="100" height="40" rx="4" fill="#18181b" :stroke="selectedNode === 'internet' ? '#ef4444' : '#27272a'" stroke-width="1.5" class="transition-all duration-200" />
              <text x="300" y="35" text-anchor="middle" font-size="11" class="fill-text-main font-bold">Internet</text>
            </g>

            <!-- Connection 1 -->
            <line x1="300" y1="50" x2="300" y2="85" stroke="#27272a" stroke-width="1.5" marker-end="url(#arrow)" />

            <!-- Node: Cloudflare Tunnel -->
            <g 
              class="cursor-pointer group" 
              @mouseenter="selectedNode = 'cloudflare'"
              @click="selectedNode = 'cloudflare'"
            >
              <rect x="200" y="90" width="200" height="40" rx="4" fill="#18181b" :stroke="selectedNode === 'cloudflare' ? '#ef4444' : '#27272a'" stroke-width="1.5" class="transition-all duration-200" />
              <text x="300" y="114" text-anchor="middle" font-size="11" class="fill-text-main font-bold">Cloudflare Tunnel</text>
            </g>

            <!-- Connection 2 -->
            <line x1="300" y1="130" x2="300" y2="165" stroke="#27272a" stroke-width="1.5" marker-end="url(#arrow)" />

            <!-- Node: Traefik Reverse Proxy -->
            <g 
              class="cursor-pointer group" 
              @mouseenter="selectedNode = 'traefik'"
              @click="selectedNode = 'traefik'"
            >
              <rect x="180" y="170" width="240" height="40" rx="4" fill="#18181b" :stroke="selectedNode === 'traefik' ? '#ef4444' : '#27272a'" stroke-width="1.5" class="transition-all duration-200" />
              <text x="300" y="194" text-anchor="middle" font-size="11" class="fill-text-main font-bold">Traefik Reverse Proxy</text>
            </g>

            <!-- Branches from Traefik -->
            <path d="M 300 210 L 300 230 L 100 230 L 100 245" fill="none" stroke="#27272a" stroke-width="1.5" marker-end="url(#arrow)" />
            <path d="M 300 210 L 300 230 L 300 245" fill="none" stroke="#27272a" stroke-width="1.5" marker-end="url(#arrow)" />
            <path d="M 300 210 L 300 230 L 500 230 L 500 245" fill="none" stroke="#27272a" stroke-width="1.5" marker-end="url(#arrow)" />

            <!-- Sub Node: Portfolio -->
            <g 
              class="cursor-pointer group" 
              @mouseenter="selectedNode = 'portfolio'"
              @click="selectedNode = 'portfolio'"
            >
              <rect x="30" y="250" width="140" height="45" rx="4" fill="#18181b" :stroke="selectedNode === 'portfolio' ? '#ef4444' : '#27272a'" stroke-width="1.5" class="transition-all duration-200" />
              <text x="100" y="276" text-anchor="middle" font-size="10" class="fill-text-main">Web Portfolio</text>
            </g>

            <!-- Sub Node: Self Hosted Services -->
            <g 
              class="cursor-pointer group" 
              @mouseenter="selectedNode = 'services'"
              @click="selectedNode = 'services'"
            >
              <rect x="210" y="250" width="180" height="45" rx="4" fill="#18181b" :stroke="selectedNode === 'services' ? '#ef4444' : '#27272a'" stroke-width="1.5" class="transition-all duration-200" />
              <text x="300" y="276" text-anchor="middle" font-size="10" class="fill-text-main">Jellyfin / Seafile / n8n</text>
            </g>

            <!-- Sub Node: Monitoring -->
            <g 
              class="cursor-pointer group" 
              @mouseenter="selectedNode = 'monitoring'"
              @click="selectedNode = 'monitoring'"
            >
              <rect x="430" y="250" width="140" height="45" rx="4" fill="#18181b" :stroke="selectedNode === 'monitoring' ? '#ef4444' : '#27272a'" stroke-width="1.5" class="transition-all duration-200" />
              <text x="500" y="276" text-anchor="middle" font-size="10" class="fill-text-main">Prometheus / Grafana</text>
            </g>
          </svg>
        </div>

        <!-- Description Panel (1/3 width) -->
        <div class="border border-border-dark/60 bg-surface-dark/60 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div class="text-[10px] font-mono text-red-primary uppercase tracking-wider mb-2">// Node Details</div>
            <h3 class="text-base font-bold text-text-main font-mono mb-3 uppercase">
              {{ nodeDetails[selectedNode].title }}
            </h3>
            <p class="text-xs text-text-muted leading-relaxed">
              {{ nodeDetails[selectedNode].description }}
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-border-dark/30 text-[10px] font-mono text-text-subtle">
            Select another component to view its networking properties.
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedNode = ref<'internet' | 'cloudflare' | 'traefik' | 'portfolio' | 'services' | 'monitoring'>('traefik')

interface NodeInfo {
  title: string
  description: string
}

const nodeDetails: Record<string, NodeInfo> = {
  internet: {
    title: 'Public Web Traffic',
    description: 'Incoming requests originating from standard clients worldwide. Traffic is encrypted using SSL/TLS before leaving the client browser.'
  },
  cloudflare: {
    title: 'Cloudflare Tunnel daemon',
    description: 'Establishes a secure, outbound-only connection between the local machine and the nearest Cloudflare Edge server. Eliminates the need to open ports on the home router (no port forwarding required).'
  },
  traefik: {
    title: 'Traefik Edge Router',
    description: 'A modern, dynamic reverse proxy that receives incoming requests from the Cloudflare Tunnel. Automatically deciphers hostnames, handles internal DNS routing, manages SSL termination, and routes requests to the correct Docker container.'
  },
  portfolio: {
    title: 'Static Portfolio Container',
    description: 'A Docker container hosting this portfolio website. Built with Astro, generated as fully static optimized HTML, and served at minimal latency.'
  },
  services: {
    title: 'Self-Hosted Application Stack',
    description: 'A suite of containerized utilities running inside isolated Docker networks, including Seafile (private cloud storage), Jellyfin (media library streaming), and n8n (workflow automation).'
  },
  monitoring: {
    title: 'Monitoring Suite',
    description: 'Prometheus collects system metrics (CPU load, memory allocation, container statuses) at regular intervals, while Grafana visualizes the data via interactive dashboards.'
  }
}
</script>
