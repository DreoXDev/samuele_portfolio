<template>
  <section class="architecture-section">
    <div class="architecture-shell">
      <div class="section-heading">
        <div class="section-kicker">01 - Architecture</div>
        <h2>Infrastructure Architecture Map</h2>
        <p>
          Interactive map of the request path and service groups. Hover or click a node
          to inspect its role in the infrastructure.
        </p>
      </div>

      <div class="architecture-layout">
        <div class="architecture-panel" aria-label="Home lab infrastructure diagram">
          <svg viewBox="0 0 680 360" class="diagram" role="img" aria-labelledby="architecture-title">
            <title id="architecture-title">Home lab architecture diagram</title>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#71717a" />
              </marker>
            </defs>

            <path class="diagram-link" d="M 340 62 L 340 94" marker-end="url(#arrow)" />
            <path class="diagram-link" d="M 340 148 L 340 184" marker-end="url(#arrow)" />
            <path class="diagram-link" d="M 340 238 L 340 260 L 120 260 L 120 284" marker-end="url(#arrow)" />
            <path class="diagram-link" d="M 340 238 L 340 284" marker-end="url(#arrow)" />
            <path class="diagram-link" d="M 340 238 L 340 260 L 560 260 L 560 284" marker-end="url(#arrow)" />

            <g
              v-for="node in diagramNodes"
              :key="node.id"
              class="diagram-node"
              :class="{ 'is-selected': selectedNode === node.id }"
              tabindex="0"
              role="button"
              :aria-label="`Show ${node.label} details`"
              @mouseenter="selectedNode = node.id"
              @focus="selectedNode = node.id"
              @click="selectedNode = node.id"
            >
              <rect :x="node.x" :y="node.y" :width="node.width" :height="node.height" rx="6" />
              <text :x="node.x + node.width / 2" :y="node.y + node.height / 2 + 4" text-anchor="middle">
                {{ node.label }}
              </text>
            </g>
          </svg>
        </div>

        <aside class="details-panel" aria-live="polite">
          <div>
            <div class="details-kicker">// Node Details</div>
            <h3>{{ currentNode.title }}</h3>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{{ currentNode.role }}</dd>
              </div>
              <div>
                <dt>Why it matters</dt>
                <dd>{{ currentNode.description }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <div class="related-label">Related services</div>
            <div class="chip-list">
              <span v-for="tag in currentNode.related" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type NodeId = 'internet' | 'cloudflare' | 'traefik' | 'portfolio' | 'services' | 'monitoring'

interface DiagramNode {
  id: NodeId
  label: string
  x: number
  y: number
  width: number
  height: number
}

interface NodeInfo {
  title: string
  role: string
  description: string
  related: string[]
}

const selectedNode = ref<NodeId>('traefik')

const diagramNodes: DiagramNode[] = [
  { id: 'internet', label: 'Internet', x: 280, y: 22, width: 120, height: 40 },
  { id: 'cloudflare', label: 'Cloudflare Tunnel', x: 225, y: 98, width: 230, height: 50 },
  { id: 'traefik', label: 'Traefik Edge Router', x: 205, y: 188, width: 270, height: 50 },
  { id: 'portfolio', label: 'Web Portfolio', x: 44, y: 288, width: 152, height: 48 },
  { id: 'services', label: 'Self-hosted Apps', x: 254, y: 288, width: 172, height: 48 },
  { id: 'monitoring', label: 'Prometheus / Grafana', x: 484, y: 288, width: 172, height: 48 },
]

const nodeDetails: Record<NodeId, NodeInfo> = {
  internet: {
    title: 'Public Web Traffic',
    role: 'External requests entering the public layer',
    description: 'Traffic starts outside the lab and reaches only the intentionally published services, without direct access to private administration paths.',
    related: ['TLS', 'DNS', 'Public services'],
  },
  cloudflare: {
    title: 'Cloudflare Tunnel Daemon',
    role: 'Outbound-only ingress bridge',
    description: 'The local daemon creates a secure outbound connection to Cloudflare, avoiding router port forwarding for the exposed web services.',
    related: ['cloudflared', 'DNS', 'Tunnel'],
  },
  traefik: {
    title: 'Traefik Edge Router',
    role: 'Reverse proxy and routing layer',
    description: 'Traefik receives requests from the tunnel layer, matches host rules and routes traffic to the correct Docker service with a compact routing surface.',
    related: ['Docker', 'HTTPS', 'Middleware'],
  },
  portfolio: {
    title: 'Static Portfolio Container',
    role: 'Public static web application',
    description: 'The Astro portfolio can be served as optimized static output behind the same proxy pattern used for the rest of the public services.',
    related: ['Astro', 'Nginx', 'Docker'],
  },
  services: {
    title: 'Self-Hosted Application Stack',
    role: 'Private and utility services',
    description: 'Apps such as Seafile, Jellyfin and n8n run as isolated containers and are grouped by intended exposure and maintenance profile.',
    related: ['Seafile', 'Jellyfin', 'n8n'],
  },
  monitoring: {
    title: 'Monitoring Suite',
    role: 'Health and operations visibility',
    description: 'Prometheus and Grafana provide a static case-study view here, while the real dashboards remain private to avoid exposing operational details.',
    related: ['Prometheus', 'Grafana', 'Docker'],
  },
}

const currentNode = computed(() => nodeDetails[selectedNode.value])
</script>

<style scoped>
.architecture-section {
  border-bottom: 1px solid rgba(39, 39, 42, 0.55);
  background: rgba(9, 9, 11, 0.92);
  padding: 4rem 0;
}

.architecture-shell {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-heading {
  max-width: 48rem;
  margin-bottom: 2.5rem;
}

.section-kicker,
.details-kicker,
.related-label {
  color: #ef4444;
  font-size: 0.625rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.section-heading h2 {
  margin-top: 0.75rem;
  color: #fafafa;
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  font-weight: 700;
}

.section-heading p {
  margin-top: 0.75rem;
  color: #a1a1aa;
  font-size: 0.875rem;
  line-height: 1.7;
}

.architecture-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.75fr);
  gap: 1.5rem;
  align-items: stretch;
}

.architecture-panel,
.details-panel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
    #111113;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.32);
}

.architecture-panel {
  min-height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: clamp(1rem, 3vw, 2rem);
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 32px 32px;
}

.diagram {
  width: min(100%, 720px);
  height: auto;
  color: #fafafa;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  overflow: visible;
}

.diagram-link {
  fill: none;
  stroke: rgba(113, 113, 122, 0.68);
  stroke-width: 1.4;
}

.diagram-node {
  cursor: pointer;
  outline: none;
}

.diagram-node rect {
  fill: #18181b;
  stroke: rgba(255, 255, 255, 0.14);
  stroke-width: 1.4;
  transition: stroke 180ms ease, filter 180ms ease, fill 180ms ease;
}

.diagram-node text {
  fill: #fafafa;
  font-size: 0.72rem;
  font-weight: 700;
  pointer-events: none;
}

.diagram-node:hover rect,
.diagram-node:focus-visible rect,
.diagram-node.is-selected rect {
  fill: #1f1f23;
  stroke: #ef4444;
  filter: drop-shadow(0 0 14px rgba(239, 68, 68, 0.22));
}

.details-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.5rem;
}

.details-panel h3 {
  margin-top: 0.75rem;
  color: #fafafa;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.25;
  text-transform: uppercase;
}

.details-panel dl {
  margin-top: 1.5rem;
  display: grid;
  gap: 1.25rem;
}

.details-panel dt {
  margin-bottom: 0.35rem;
  color: #71717a;
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.details-panel dd {
  color: #a1a1aa;
  font-size: 0.78rem;
  line-height: 1.65;
}

.chip-list {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip-list span {
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.06);
  padding: 0.35rem 0.55rem;
  color: #fafafa;
  font-size: 0.68rem;
}

@media (max-width: 1000px) {
  .architecture-layout {
    grid-template-columns: 1fr;
  }

  .architecture-panel {
    min-height: 360px;
  }
}

@media (max-width: 700px) {
  .architecture-section {
    padding: 3rem 0;
  }

  .architecture-shell {
    padding: 0 1rem;
  }

  .architecture-panel {
    min-height: 280px;
    padding: 0.75rem;
  }

  .diagram-node text {
    font-size: 0.68rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .diagram-node rect {
    transition: none;
  }
}
</style>
