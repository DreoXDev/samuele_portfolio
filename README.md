# Samuele Poretti Portfolio

This repository contains the source code for my personal portfolio: a static website presenting my software projects, technical timeline, home lab work, contact links and downloadable CV.

Live site: [dreoxdev.it](https://dreoxdev.it)

## About Me

I am Samuele Poretti, a Computer Science student and developer based in Milan, Italy. My work focuses on web interfaces, Android applications, automation tools, self-hosted systems and clean developer workflows.

The portfolio is designed as a developer-environment-inspired experience: a terminal introduction, an editor-style project explorer, a timeline canvas and a markdown-like contact note.

## What Recruiters Can Find

- Selected software projects with live links, source links or deeper technical notes.
- A chronological timeline of education, development work and technical exploration.
- A dedicated home lab case study covering self-hosted infrastructure and tooling.
- Contact links for email, GitHub, institutional GitHub and LinkedIn.
- A downloadable CV at [`/cv/samuele-poretti-cv.pdf`](https://dreoxdev.it/cv/samuele-poretti-cv.pdf).

## Featured Areas

- **Web development:** Astro, Vue, responsive UI, static output and deployment workflows.
- **Mobile development:** Android coursework and Firebase-backed application work.
- **Infrastructure:** Linux server setup, Docker containers, Cloudflare Tunnels, Traefik and Tailscale.
- **Automation and tooling:** scripts, productivity utilities and developer-focused workflows.
- **AI exploration:** local LLM and RAG experiments for study and prototyping.

## Tech Stack

- Astro static site generation
- Vue islands for interactive sections
- Tailwind CSS v4
- GSAP for frame transitions and boot animations
- TypeScript
- Nginx-ready static deployment
- Sitemap, Open Graph metadata, canonical URLs and structured `Person` schema

## Site Sections

- `_home`: terminal-style introduction
- `_projects`: editor-style project explorer
- `_timeline`: technical and educational timeline
- `_contact`: contact note with links and CV
- `_home_lab`: infrastructure case study

## Running Locally

```bash
npm install
cp .env.example .env
npm run dev
npm run build
```

The production build is generated in `dist/`.

## Analytics And Privacy

Google Analytics is optional and disabled unless a GA4 Measurement ID is provided:

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The site uses an explicit analytics consent banner. Google Analytics is not loaded before the visitor accepts analytics cookies, and visitors can reopen the privacy control to reject analytics later.

## Contact

- Email: [samuele.poretti2003@gmail.com](mailto:samuele.poretti2003@gmail.com)
- GitHub: [DreoXDev](https://github.com/DreoXDev)
- Institutional GitHub: [SPoretti](https://github.com/SPoretti)
- LinkedIn: [Samuele Poretti](https://www.linkedin.com/in/samueleporetti/)
