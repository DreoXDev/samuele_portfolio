# Samuele Poretti — Developer Portfolio (V1)

Welcome to the source repository of my personal portfolio. This website is built using **Astro**, **Vue 3**, **Tailwind CSS**, and **GSAP** for animations.

The site is designed to look like a developer's desktop environment: a terminal landing page, a simulated IDE code editor showing projects, and a git log timeline documenting history.

## 🚀 Technologies Used

- **Framework:** Astro (Static Site Generation for fast loading speeds)
- **UI Islands:** Vue.js (for the interactive terminal, editor tabs, and animations)
- **Styling:** Tailwind CSS (v4) & JetBrains Mono font
- **Animations:** GSAP & ScrollTrigger
- **Icons:** @lucide/vue

---

## 📂 Project Directory Structure

```text
portfolio/
├─ docs/                  # Project documentation guidelines
│  ├─ PROJECT_GUIDELINES.md
│  ├─ DESIGN_SYSTEM.md
│  ├─ CONTENT_MODEL.md
│  ├─ ANIMATION_GUIDELINES.md
│  └─ DEPLOYMENT_NOTES.md
├─ public/                # Static assets
│  ├─ assets/
│  │  ├─ images/
│  │  │  ├─ projects/      # Project screenshots placeholders
│  │  │  ├─ homelab/
│  │  │  └─ profile/
│  │  └─ cv/              # CV PDF download folder
├─ src/
│  ├─ components/
│  │  ├─ common/          # Reusable low-level widgets (Badge, Button, Card...)
│  │  ├─ layout/          # Global layout parts (Navbar, Footer, Shell...)
│  │  ├─ sections/        # Homepage landing and sections
│  │  ├─ homelab/         # Home Lab specific components
│  │  └─ interactive/     # Background animations and controllers
│  ├─ data/               # Separated content files (projects, logs, timeline)
│  ├─ layouts/            # Base HTML boilerplate (BaseLayout)
│  ├─ lib/                # Shared utilities and animation configuration
│  ├─ pages/              # Route entry points (index.astro, home-lab.astro)
│  ├─ styles/             # Global stylesheet (globals.css)
│  └─ types/              # TypeScript types
```

---

## 🧞 Local Development Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds your production static site to `./dist/` |
| `npm run preview` | Previews the build output locally |

---

## 📝 Internal Documentation Links

For details about extending the code, styling, or deployment:
- [Project Guidelines](file:///d:/Projects/dreox_portfolio/docs/PROJECT_GUIDELINES.md)
- [Design System](file:///d:/Projects/dreox_portfolio/docs/DESIGN_SYSTEM.md)
- [Content Model & Types](file:///d:/Projects/dreox_portfolio/docs/CONTENT_MODEL.md)
- [Animation & GSAP Guidelines](file:///d:/Projects/dreox_portfolio/docs/ANIMATION_GUIDELINES.md)
- [Self-Hosting & Deployment Notes](file:///d:/Projects/dreox_portfolio/docs/DEPLOYMENT_NOTES.md)

---

## 📌 TODO / Future Iterations (V1.1+)

- [ ] Replace placeholder project screenshots in `public/assets/images/projects/`
- [ ] Add the actual CV PDF under `public/assets/cv/`
- [ ] Add the real LinkedIn profile URL in `src/data/site.ts`
- [ ] Implement an automated Docker build and CI/CD workflow for the home server
- [ ] Design and hook up dynamic charts to the Home Lab page using real host statistics APIs
- [ ] Refine the alt-tab desktop workspace transition animations using GSAP
