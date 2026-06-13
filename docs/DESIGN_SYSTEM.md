# Design System — Samuele Poretti Portfolio

This document defines the design language, color palette, typography, and styling tokens for the portfolio.

## 1. Color Palette

The project is built on a dark terminal aesthetic. The primary colors are managed via CSS variables and Tailwind v4 theme configurations:

- **Background:** `#09090B` (pure dark)
- **Surface:** `#111113` (slightly lighter charcoal)
- **Surface Soft:** `#18181B` (borders and panels)
- **Border:** `#27272A` (subtle gray lines)
- **Text Main:** `#FAFAFA` (off-white for high legibility)
- **Text Muted:** `#A1A1AA` (gray for descriptions)
- **Text Subtle:** `#71717A` (dimmed captions/timestamps)
- **Red Primary (Accent):** `#EF4444` (crimson red accent)
- **Red Strong:** `#DC2626` (hover states)
- **Red Dark:** `#991B1B` (background tint / borders)
- **Red Glow:** `rgba(239, 68, 68, 0.15)` (glow box shadows)

### Rule on Red Usage
> [!IMPORTANT]
> The red color is strictly an **accent**. Avoid large, solid red shapes. Use it for borders, hover states, selection lines, and small glow effects. This keeps the look clean and professional rather than looking like a gaming setup.

## 2. Typography

- **Primary Font:** `JetBrains Mono` (imported from Google Fonts)
- **Fallback:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- All body copy, headers, and UI elements use the monospaced font to reinforce the developer terminal feel.

## 3. UI Tokens

- **Borders:** Thin, semi-transparent borders (`border border-border-dark/60`) to create a structured grid feel.
- **Corners:** Rounded corners are kept small (`rounded-lg` / `rounded-md` / `0.5rem`) to maintain a clean digital box appearance.
- **Glow Effects:** Light, blurred shadows on interactive elements during active/hover states (`shadow-[0_0_15px_rgba(239,68,68,0.15)]`).

## 4. Accessibility & Responsive Rules

- **Focus States:** Custom outline on active focus (`outline: 2px solid #ef4444; outline-offset: 2px;`) to ensure full keyboard navigation accessibility.
- **Semantic HTML:** Main sections use `<section>`, links use `<a>` with descriptive text or labels, and lists use `<ul>`/`<li>` tags.
- **Reduced Motion:** Interactive elements check for system level `prefers-reduced-motion` preferences. When enabled, background logs freeze, and scroll transitions fall back to instant visibility.
