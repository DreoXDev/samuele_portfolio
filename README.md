# Samuele Poretti Portfolio

Personal portfolio built with Astro. The current version uses a dark terminal/editor language with animated app-like sections and a separate Home Lab case-study page.

## Overview

- `_home`: terminal-style introduction
- `_projects`: code editor and project explorer
- `_timeline`: horizontal timeline canvas
- `_contact`: Obsidian-style contact note
- `/home-lab`: technical case study for the personal home lab

## Tech Stack

- Astro static output
- Vue islands for interactive sections
- Tailwind CSS v4
- GSAP for UI transitions
- JetBrains Mono
- `@astrojs/sitemap` for sitemap generation

## Project Structure

```text
src/
  components/
    common/       Shared UI primitives
    hero/         Home terminal frame
    homelab/      Home Lab page sections
    interactive/  Frame controller and app switcher
    layout/       Shell, navbar, footer
    navigation/   Frame tabs
    sections/     Projects, timeline, contact
  data/           Site, projects and timeline content
  layouts/        Base metadata and document shell
  lib/            Animation helpers
  pages/          Astro routes
  styles/         Global CSS and Tailwind theme
  types/          Shared TypeScript types
public/
  assets/         Static images and icons
  cv/             Resume PDF location
```

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Content Updates

### CV

Place the resume PDF at:

```text
public/cv/samuele-poretti-cv.pdf
```

It will be served at:

```text
/cv/samuele-poretti-cv.pdf
```

When the file is missing, the contact note shows a non-clickable reminder instead of a broken link.

### Projects

Project entries live in:

```text
src/data/projects.ts
```

Project types live in:

```text
src/types/project.ts
```

### Timeline

Timeline entries live in:

```text
src/data/timeline.ts
```

### Contact Links

Global contact and profile links live in:

```text
src/data/site.ts
```

Current public links:

- Email: `samuele.poretti2003@gmail.com`
- GitHub: `https://github.com/DreoXDev`
- Institutional GitHub: `https://github.com/SPoretti`
- LinkedIn: `https://www.linkedin.com/in/samueleporetti/`

## SEO

Metadata is centralized in:

```text
src/layouts/BaseLayout.astro
src/data/site.ts
```

The site includes canonical URLs, Open Graph tags, Twitter card tags, a JSON-LD `Person` schema, `robots.txt`, generated sitemap output, favicon assets, Apple touch icon and a global OG image.

## Deployment

The project builds to static files in `dist/`. The repo includes:

- `Dockerfile` for building and serving the static output with Nginx
- `nginx.conf` for static hosting
- GitHub workflow files under `.github/`

Run `npm run build` before publishing.
