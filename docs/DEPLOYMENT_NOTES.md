# Deployment Notes — Samuele Poretti Portfolio

This document describes how this Astro-based portfolio is built and deployed to a personal home server.

## 1. Build and Static Output

Because this portfolio uses Astro in static generation mode (SSG), the output of the build process is a folder of optimized HTML, CSS, JS, and asset files.

To build the site:
```bash
npm run build
```
The resulting files will be generated in the `dist/` directory.

## 2. Dockerized Serving (Nginx)

The recommended setup is to package the `dist/` output inside a lightweight Nginx web server using a multi-stage Dockerfile:

```dockerfile
# Stage 1: Build the project
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the files using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 3. Network Routing Setup

### Cloudflare Tunnel
A Cloudflare Tunnel (`cloudflared`) connects the local Docker host to the Cloudflare network.
1. The daemon runs as a companion Docker container in the host.
2. It forwards requests destined for `portfolio.samueleporetti.it` to the local reverse proxy.

### Traefik Reverse Proxy
Traefik acts as the gateway to the Docker network.
1. It intercepts requests from the Cloudflare Tunnel.
2. It matches the host `portfolio.samueleporetti.it`.
3. It routes the traffic to the port `80` of the Nginx portfolio container.
4. It manages headers to pass client IP and secure transport layers correctly.
