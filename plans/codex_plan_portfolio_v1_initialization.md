# Codex Plan — Portfolio V1 Initialization

## Obiettivo

Inizializzare da una cartella vuota la repo del portfolio personale di Samuele Poretti.

Il progetto deve partire già con:

- Astro + Vue + Tailwind + shadcn-style components + GSAP;
- tema dark coding con accento rosso;
- font JetBrains Mono;
- homepage scroll-based V1;
- pagina dedicata Home Lab;
- struttura pulita e mantenibile;
- dati dei progetti separati dal layout;
- documentazione interna della repo;
- linee guida tecniche e grafiche già scritte.

Questa è la prima inizializzazione della repo, quindi è importante impostare fondamenta solide, non solo una demo visiva.

---

## Visione del sito

Il portfolio non deve sembrare un CV online classico.

Deve sembrare un piccolo ambiente digitale personale da developer:

```txt
terminal → editor/project explorer → timeline → contact
```

La homepage V1 deve funzionare come esperienza scroll-based:

1. **Terminal Landing**
   - schermata iniziale full-screen;
   - nome e cognome;
   - navbar minimale;
   - background animato tipo terminale;
   - righe di log, build output, easter egg e riferimenti ai progetti;
   - icona/elemento coding animato in stile terminale, ispirato a Ghostty.

2. **Projects Editor**
   - transizione smooth tipo alt-tab dal terminale all’editor;
   - sezione progetti come folder structure stile VS Code / Android Studio;
   - pannello dettagli del progetto selezionato;
   - link live/repo/details;
   - Home Lab presente come progetto e linkato a pagina dedicata.

3. **Timeline**
   - linea SVG animata collegata allo scroll;
   - eventi principali del percorso personale/coding;
   - stile tipo git log / commit history.

4. **Contact**
   - schermata finale minimale;
   - email, GitHub, LinkedIn, CV download placeholder;
   - microcopy professionale.

In più deve esistere una pagina `/home-lab` dedicata, visuale e ad alto impatto, con placeholder per architettura, servizi e dashboard.

---

## Tech stack obbligatorio

```txt
Astro
Vue
TypeScript
Tailwind CSS
shadcn-style components
GSAP
JetBrains Mono
```

Dipendenze consigliate:

```txt
astro
@astrojs/vue
@astrojs/tailwind
vue
typescript
tailwindcss
gsap
lucide-vue-next
clsx
tailwind-merge
class-variance-authority
```

Se utile per qualità progetto:

```txt
prettier
prettier-plugin-astro
eslint
```

Non introdurre librerie pesanti non necessarie.

Non usare:

```txt
Blender assets
Rive
WebGL custom
Three.js
video AI scroll-based
framework UI pesanti
```

---

## Setup iniziale

Partendo da cartella vuota:

```bash
npm create astro@latest .
```

Scelte desiderate:

```txt
Template: minimal
TypeScript: yes
Install dependencies: yes
Git: yes, se possibile
```

Poi aggiungere:

```bash
npx astro add vue
npx astro add tailwind
npm install gsap lucide-vue-next clsx tailwind-merge class-variance-authority
npm install -D prettier prettier-plugin-astro
```

Verificare che:

```bash
npm run dev
npm run build
```

funzionino senza errori.

---

## Struttura repo richiesta

Creare una struttura ordinata e scalabile:

```txt
portfolio/
├─ public/
│  ├─ assets/
│  │  ├─ images/
│  │  │  ├─ projects/
│  │  │  ├─ homelab/
│  │  │  └─ profile/
│  │  └─ cv/
│  │     └─ samuele-poretti-cv-placeholder.pdf
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ common/
│  │  │  ├─ Badge.astro
│  │  │  ├─ Button.astro
│  │  │  ├─ Card.astro
│  │  │  ├─ Container.astro
│  │  │  └─ SectionLabel.astro
│  │  ├─ layout/
│  │  │  ├─ Footer.astro
│  │  │  ├─ Navbar.astro
│  │  │  └─ SiteShell.astro
│  │  ├─ sections/
│  │  │  ├─ TerminalLanding.vue
│  │  │  ├─ ProjectsEditor.vue
│  │  │  ├─ TimelineSection.vue
│  │  │  └─ ContactSection.astro
│  │  ├─ homelab/
│  │  │  ├─ HomeLabHero.astro
│  │  │  ├─ HomeLabArchitecture.vue
│  │  │  ├─ HomeLabServices.astro
│  │  │  └─ HomeLabDashboardMock.astro
│  │  └─ interactive/
│  │     ├─ AnimatedTerminalBackground.vue
│  │     ├─ TerminalIcon.vue
│  │     ├─ FakeWindow.astro
│  │     └─ ScrollSceneController.vue
│  ├─ data/
│  │  ├─ projects.ts
│  │  ├─ timeline.ts
│  │  ├─ terminalLines.ts
│  │  ├─ site.ts
│  │  └─ techStack.ts
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ lib/
│  │  ├─ utils.ts
│  │  └─ animations/
│  │     ├─ gsap.ts
│  │     └─ reducedMotion.ts
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ home-lab.astro
│  ├─ styles/
│  │  └─ globals.css
│  └─ types/
│     └─ project.ts
├─ docs/
│  ├─ PROJECT_GUIDELINES.md
│  ├─ DESIGN_SYSTEM.md
│  ├─ CONTENT_MODEL.md
│  ├─ ANIMATION_GUIDELINES.md
│  └─ DEPLOYMENT_NOTES.md
├─ .prettierrc
├─ astro.config.mjs
├─ tailwind.config.mjs
├─ package.json
└─ README.md
```

La struttura può essere leggermente adattata se Astro richiede differenze, ma mantenere questa logica:

- contenuti in `src/data`;
- componenti divisi per scopo;
- pagine minime;
- documentazione in `docs`;
- asset statici in `public/assets`.

---

## Design system iniziale

### Tema

Impostare dark theme globale.

Palette iniziale:

```txt
background: #09090B / #0A0A0A
surface: #111113 / #18181B
surface-soft: #131316
border: #27272A
text-main: #FAFAFA
text-muted: #A1A1AA
text-subtle: #71717A
red-primary: #EF4444
red-strong: #DC2626
red-dark: #991B1B
red-glow: rgba(239, 68, 68, 0.25)
```

Usare CSS variables in `globals.css`, poi mapparle in Tailwind se utile.

### Font

Usare JetBrains Mono come font principale.

Implementazione consigliata:

- import via Google Fonts o asset locale se già disponibile;
- fallback monospace;
- applicare su tutto il sito nella V1.

Nota:

```txt
Se il body tutto in mono risultasse pesante in futuro, si potrà introdurre un sans secondario.
Per ora la scelta progettuale è JetBrains Mono come identità forte.
```

### Regole UI

Documentare in `docs/DESIGN_SYSTEM.md`:

- rosso solo come accento;
- evitare look gaming;
- componenti ispirati a terminale/editor;
- bordi sottili;
- glow leggero;
- nessun grande blocco rosso pieno;
- animazioni pulite e tecniche;
- focus state accessibili.

---

## Data model

Creare tipi TypeScript chiari.

### `src/types/project.ts`

```ts
export type ProjectCategory =
  | "client"
  | "university"
  | "infrastructure"
  | "experiment";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "experimental";

export type Project = {
  title: string;
  slug: string;
  fileName: string;
  folder: string;
  year: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  links: {
    live?: string;
    github?: string;
    details?: string;
  };
  images: string[];
};
```

### Progetti da inserire subito

#### Le Tende ad Arte

```txt
title: Website Le Tende ad Arte
slug: le-tende-ad-arte
fileName: le-tende-ad-arte.astro
folder: client-work
year: 2026
category: client
status: completed
featured: true
role: Full stack developer
stack: Astro, Aruba Linux Hosting
live: https://www.letendeadarte.it/
github: https://github.com/DreoXDev/le-tende-ad-arte
summary: Real client website focused on presenting services clearly and using client-provided photo assets inside a clean animated experience.
```

#### Volontari Cittadini Website

```txt
title: Website Volontari Cittadini
slug: volontari-cittadini-website
fileName: volontari-cittadini.wix
folder: client-work
year: 2023
category: client
status: completed
featured: true
role: Website builder / full stack
stack: Wix.com
live: https://www.volontaricittadini.it/
summary: Website built for a Milan-based volunteer association to communicate its mission, activities and useful information in a clear and accessible way.
```

#### Volontari Cittadini Android App

```txt
title: Volontari Cittadini Android App
slug: voci-android-app
fileName: voci-android-app.kt
folder: university
year: 2024
category: university
status: completed
featured: true
role: UI/UX, data management, Firebase
stack: Kotlin, Jetpack Compose, Android, Firebase, Mapbox
github: https://github.com/SPoretti/Voci-App
summary: Android university project built with Kotlin and Jetpack Compose to support volunteer field work through structured reports, data management and a Mapbox-based map.
```

#### Personal Home Lab

```txt
title: Personal Home Lab
slug: personal-home-lab
fileName: personal-home-lab.docker
folder: infrastructure
year: 2025
category: infrastructure
status: in-progress
featured: true
role: server setup, container management, routing, monitoring
stack: Ubuntu Server, Docker, Docker Compose, Traefik, Cloudflare Tunnel, Tailscale, Prometheus, Grafana, Jellyfin, Seafile, n8n
details: /home-lab
summary: Personal Linux home server used to experiment with Docker, reverse proxy routing, secure tunnels, monitoring and self-hosted services.
```

#### AI/RAG University Projects

Inserire come progetto extra/experiment, non necessariamente featured.

```txt
title: AI/RAG University Knowledge Bases
slug: ai-rag-university
fileName: ai-rag-university.md
folder: experiments
year: 2026
category: experiment
status: experimental
featured: false
role: knowledge base design, AI-assisted study workflow
stack: Markdown, Obsidian, GitHub, AI-assisted development
summary: Experimental university knowledge bases and retrieval-oriented notes built to support exam preparation and structured study workflows.
```

---

## Timeline data

Creare `src/data/timeline.ts`.

Eventi iniziali:

```txt
2020 - First projects during high school
       Discord Bot, Tecri Nuoto website

2022 - First desktop tools
       Automation tool, Salary Calculator for Humanitas manager

2023 - First website for Volontari Cittadini

2024 - Android app for Volontari Cittadini

2025 - Home lab and self-hosted tools

2026 - AI/RAG projects for university, personal portfolio, Le Tende ad Arte
```

Aggiungere anche una voce opzionale/easter egg per il nuoto, ma non renderla centrale:

```txt
2026 - Next personal challenge: Strait of Messina open-water swim
```

Può essere nascosta dietro comando terminale o mostrata in piccolo.

---

## Terminal lines data

Creare `src/data/terminalLines.ts`.

Devono esserci linee miste:

1. informazioni reali;
2. build logs finti;
3. stack mentions;
4. progetti passati;
5. easter egg;
6. placeholder tecnici.

Esempi:

```txt
> whoami
samuele_poretti

> status
computer science student · frontend developer · homelab tinkerer

[astro] generating static routes...
[vue] mounting interactive islands...
[tailwind] scanning classes...
[gsap] timeline initialized...
[docker] building portfolio container...
[cloudflare] tunnel ready...
[flutter] compiling old experiments...
[tauri] loading desktop tools...

> projects --featured
le-tende-ad-arte
volontari-cittadini-website
voci-android-app
personal-home-lab

> next challenge
strait-of-messina
```

Implementare in modo che il componente possa ciclare/appendere righe.

---

## Componenti principali

## 1. `TerminalLanding.vue`

Responsabilità:

- full-screen landing;
- nome e cognome;
- navbar minimale;
- background terminale animato;
- elemento/icona coding animata;
- intro copy;
- CTA;
- reduced motion fallback.

Contenuti richiesti:

```txt
Samuele Poretti
Computer Science Student & Developer
I build web interfaces, Android apps and self-hosted tools.
```

CTA:

```txt
View Projects
Home Lab
Contact
Download CV
```

Per il CV usare placeholder:

```txt
/public/assets/cv/samuele-poretti-cv-placeholder.pdf
```

Se il PDF non esiste, il link può essere disabilitato o puntare a `#`.

---

## 2. `AnimatedTerminalBackground.vue`

Responsabilità:

- mostrare righe terminale/log che continuano a comparire;
- usare JetBrains Mono;
- mantenere leggibilità;
- non consumare troppe risorse;
- supportare reduced motion.

V1 accettabile:

- lista di righe che entrano con opacity/translate;
- loop controllato;
- nessun canvas necessario;
- GSAP o CSS animation.

---

## 3. `TerminalIcon.vue`

Responsabilità:

- piccolo elemento grafico animato in stile coding/Ghostty-inspired;
- può essere ASCII-like, cursor/block, brackets, prompt icon o simbolo astratto;
- usare caratteri e movimento leggero.

Non deve usare immagini esterne complesse.

---

## 4. `ScrollSceneController.vue`

Responsabilità:

- gestire transizioni scroll-based tra:
  - terminal;
  - editor;
  - timeline;
  - contact.

Nota importante:

Per la V1 non serve una perfetta animazione super complessa. Implementare una base solida:

- sezioni full-screen;
- transizioni verticali;
- GSAP ScrollTrigger se stabile;
- fallback semplice su mobile/reduced motion.

Se ScrollTrigger diventa troppo complesso, mantenere sezioni normali con reveal animation e documentare come migliorarlo in V1.1.

---

## 5. `ProjectsEditor.vue`

Responsabilità:

- renderizzare folder tree;
- permettere apertura/chiusura cartelle;
- selezionare progetto;
- mostrare pannello dettagli;
- evidenziare file attivo in rosso;
- mostrare stack badges;
- link live/repo/details.

Layout desktop:

```txt
fake editor window
├─ sidebar explorer
└─ details panel
```

Mobile:

```txt
cards verticali o accordion
```

Folder tree desiderato:

```txt
projects/
├─ client-work/
│  ├─ le-tende-ad-arte.astro
│  └─ volontari-cittadini.wix
├─ university/
│  └─ voci-android-app.kt
├─ infrastructure/
│  └─ personal-home-lab.docker
└─ experiments/
   └─ ai-rag-university.md
```

---

## 6. `TimelineSection.vue`

Responsabilità:

- timeline verticale o curva;
- linea SVG;
- eventi collegati;
- animazione scroll-linked o reveal progressivo.

V1 accettabile:

- SVG line verticale;
- eventi che appaiono con scroll;
- progress line animata con GSAP.

Microcopy:

```txt
git log --oneline --samuele
```

---

## 7. `ContactSection.astro`

Responsabilità:

- finale semplice;
- link contatti;
- CV placeholder;
- microcopy professionale.

Contenuti:

```txt
Open to internships, collaborations and junior developer opportunities.
```

Link placeholder da mettere in `src/data/site.ts`:

```txt
email: da completare
github: https://github.com/DreoXDev
linkedin: da completare
cv: /assets/cv/samuele-poretti-cv-placeholder.pdf
location: Milan, Italy
```

---

## Pagina `/home-lab`

Creare `src/pages/home-lab.astro`.

Deve essere una pagina progetto visuale, non una seconda homepage enorme.

### Sezioni richieste

1. Hero
2. Architecture map
3. Services grid
4. Dashboard mock
5. Hosting stack
6. Security notes
7. Back to portfolio

### Copy placeholder

```txt
Personal Home Lab

A small Linux server where I experiment with Docker, reverse proxy routing,
secure tunnels, monitoring and self-hosted services.

The same infrastructure is planned to host this portfolio through a custom domain.
```

### Architettura visuale

```txt
Internet
  ↓
Cloudflare Tunnel
  ↓
Traefik Reverse Proxy
  ↓
Docker Network
  ├─ Portfolio
  ├─ Dashboard
  ├─ Monitoring
  ├─ File storage
  └─ Automation
```

### Servizi da mostrare

```txt
Ubuntu Server
Docker
Docker Compose
Traefik
Cloudflare Tunnel
Tailscale
Prometheus
Grafana
Jellyfin
Seafile
n8n
Personal Dashboard
Custom Domain
```

### Sicurezza

Inserire una card o nota:

```txt
This page intentionally avoids exposing sensitive infrastructure details such as IPs, private paths, credentials, tokens or full firewall configuration.
```

---

## Routing

Pagine V1:

```txt
/
└─ home-lab
```

Link futuri lasciati come placeholder:

```txt
/projects/[slug]
/uses
/blog
```

Non implementare troppe pagine ora.

---

## Animazioni

### File da creare

```txt
src/lib/animations/gsap.ts
src/lib/animations/reducedMotion.ts
docs/ANIMATION_GUIDELINES.md
```

### Regole

- supportare `prefers-reduced-motion`;
- non animare troppo su mobile;
- evitare layout shift;
- animazioni sempre progressive/fallback;
- niente WebGL/3D in V1.

### Priorità V1

1. terminal background continuo;
2. character/log animations;
3. coding icon animata;
4. transizione terminal → editor;
5. editor → timeline;
6. timeline SVG progress;
7. timeline → contact;
8. hover/focus states.

Se non è possibile completare tutte le animazioni in modo stabile nella prima passata, implementare:

- terminal background;
- projects editor;
- timeline reveal;
- base section transitions.

Poi documentare TODO.

---

## Documentazione da creare

## `README.md`

Deve contenere:

- descrizione progetto;
- stack;
- comandi;
- struttura repo;
- stato V1;
- note su deploy futuro;
- link docs.

Comandi:

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## `docs/PROJECT_GUIDELINES.md`

Contenuti:

- visione del portfolio;
- regole generali;
- cosa evitare;
- come aggiungere un nuovo progetto;
- come aggiornare timeline;
- come gestire asset;
- regole per contenuti sensibili home lab.

---

## `docs/DESIGN_SYSTEM.md`

Contenuti:

- palette;
- typography;
- uso del rosso;
- componenti base;
- spacing;
- border/glow;
- stile terminal/editor;
- accessibilità.

---

## `docs/CONTENT_MODEL.md`

Contenuti:

- tipi dati;
- struttura `projects.ts`;
- struttura `timeline.ts`;
- struttura `terminalLines.ts`;
- esempi;
- campi obbligatori;
- convenzioni nomi slug/file.

---

## `docs/ANIMATION_GUIDELINES.md`

Contenuti:

- GSAP usage;
- ScrollTrigger;
- reduced motion;
- performance;
- animazioni V1;
- animazioni da evitare.

---

## `docs/DEPLOYMENT_NOTES.md`

Contenuti:

- deploy target: home server personale;
- possibile hosting statico;
- possibile Docker/Nginx;
- Cloudflare Tunnel;
- reverse proxy;
- note sicurezza;
- TODO deploy reale.

Non inserire configurazioni sensibili.

---

## Styling e accessibilità

Implementare da subito:

- focus states visibili;
- link accessibili;
- `aria-label` dove necessario;
- contrasto sufficiente;
- responsive layout;
- fallback reduced motion;
- semantic HTML dove possibile;
- evitare click-only senza tastiera per elementi importanti.

---

## SEO base

Nel `BaseLayout.astro` prevedere:

```txt
title
description
og:title
og:description
og:type
twitter card
favicon
theme-color
```

Dati in `src/data/site.ts`.

Valori iniziali:

```txt
title: Samuele Poretti — Portfolio
description: Computer Science student building web interfaces, Android apps and self-hosted tools.
```

---

## Contenuti testuali principali

### Hero

```txt
Samuele Poretti
Computer Science Student & Developer
I build web interfaces, Android apps and self-hosted tools.
```

### About breve, se serve nel terminale o in metadata

```txt
I'm a Computer Science student focused on building clean web interfaces, Android apps and practical self-hosted tools. I like turning technical ideas into useful, organized and interactive software projects.
```

### Contact

```txt
Open to internships, collaborations and junior developer opportunities.
```

---

## Placeholder asset

Creare placeholder semplici per evitare broken UI:

```txt
/public/assets/images/projects/le-tende-ad-arte-placeholder.svg
/public/assets/images/projects/volontari-cittadini-placeholder.svg
/public/assets/images/projects/voci-app-placeholder.svg
/public/assets/images/homelab/dashboard-placeholder.svg
/public/assets/images/profile/avatar-placeholder.svg
```

Possono essere SVG semplici generati a mano con dark background, bordo rosso e testo.

---

## Qualità codice

Regole:

- TypeScript dove possibile;
- dati separati dai componenti;
- componenti piccoli e riutilizzabili;
- niente hardcoding ripetuto;
- niente CSS disordinato dentro componenti se può stare in utility/classi;
- nomi chiari;
- commenti solo quando utili;
- evitare overengineering.

---

## Definition of Done

La V1 initialization è completa quando:

- [ ] progetto Astro inizializzato;
- [ ] Vue configurato;
- [ ] Tailwind configurato;
- [ ] GSAP installato;
- [ ] JetBrains Mono integrato;
- [ ] tema dark rosso applicato;
- [ ] struttura repo creata;
- [ ] homepage `/` esiste;
- [ ] pagina `/home-lab` esiste;
- [ ] Terminal Landing implementata;
- [ ] terminal background animato implementato;
- [ ] Projects Editor implementato con dati reali;
- [ ] Timeline implementata con dati reali;
- [ ] Contact implementato;
- [ ] Home Lab page implementata con placeholder visuali;
- [ ] dati in `src/data`;
- [ ] tipi in `src/types`;
- [ ] documentazione in `docs`;
- [ ] README completo;
- [ ] build senza errori;
- [ ] responsive base;
- [ ] reduced motion base;
- [ ] nessun dettaglio sensibile;
- [ ] TODO chiari per V1.1.

---

## TODO espliciti da lasciare nel progetto

Creare una sezione TODO nel README o in `docs/PROJECT_GUIDELINES.md`:

```txt
- Replace placeholder project screenshots.
- Add real CV PDF.
- Add real LinkedIn URL.
- Improve scroll-based alt-tab transitions.
- Add final avatar or profile photo.
- Add final Home Lab dashboard mock.
- Prepare Docker/static deploy for home server.
- Add project detail pages if needed.
```

---

## Nota finale per Codex

Non cercare di completare il portfolio definitivo in una sola passata.

Questa task serve a creare una base V1 solida:

- repo pulita;
- struttura corretta;
- homepage funzionante;
- visual direction già riconoscibile;
- documentazione presente;
- contenuti iniziali inseriti;
- codice pronto per iterazioni future.

Meglio una foundation ordinata e stabile che una demo troppo complessa e fragile.
