# Content Model — Samuele Poretti Portfolio

This document details the structure, properties, and validation rules for the static data files.

## 1. Projects Model

The type definition is declared in [src/types/project.ts](file:///d:/Projects/dreox_portfolio/src/types/project.ts).

### TypeScript Interface
```typescript
export type ProjectCategory =
  | 'client'
  | 'university'
  | 'infrastructure'
  | 'experiment';

export type ProjectStatus =
  | 'completed'
  | 'in-progress'
  | 'experimental';

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

### Conventions & Naming Rules
- **`slug`**: Kebab-case, matches the project name (e.g., `le-tende-ad-arte`).
- **`fileName`**: Simulates the code file representing the project. Use relevant extensions:
  - `.astro` for Astro web projects.
  - `.kt` for Kotlin Android projects.
  - `.docker` for system infrastructure configurations.
  - `.md` or `.txt` for documentation or experimental notes.
- **`folder`**: Grouping folder in the IDE tree structure. Must match category folder names: `client-work`, `university`, `infrastructure`, `experiments`.

---

## 2. Timeline Model

Located in [src/data/timeline.ts](file:///d:/Projects/dreox_portfolio/src/data/timeline.ts).

### TypeScript Interface
```typescript
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  hash: string;
  isEasterEgg?: boolean;
}
```

- **`hash`**: A unique 7-character hexadecimal string representing the commit ID (e.g., `a8f3b21`).
- **`isEasterEgg`**: Optional boolean. If true, indicates the milestone is a hidden event (like open-water swim records) and may be handled differently.
