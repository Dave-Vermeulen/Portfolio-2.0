# CLAUDE.md — Portfolio v3.0 (Space Theme + Indigo/Lavender)

## 🧠 TL;DR for Claude

This is a **React 18 + Vite portfolio** with a **pure-CSS animated starfield**, a PDF resume viewer, and a download button. The refactor from v2 → v3 is **complete**: react-bootstrap removed, CRA replaced with Vite, all CSS migrated to CSS Modules, all colors driven by design tokens. Operator has ADHD + right-brain dominance → give **visual, chunked, bullet-point answers** with emojis. No walls of text.

## 🎭 Project Vitals

| Property        | Value                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| Repo            | [Dave-Vermeulen/Portfolio](https://github.com/Dave-Vermeulen/Portfolio) |
| Deployed at     | [dawudvermeulen.vercel.app](https://dawudvermeulen.vercel.app/resume)   |
| Tech stack      | React 18, Vite 5, CSS Modules, react-router-dom v6, react-pdf v9        |
| Tooling         | ESLint, Prettier                                                        |
| Package manager | npm                                                                     |

## 🎨 Color Palette (Palette A — Indigo/Lavender)

All colors live as CSS custom properties in **`src/styles/tokens.css`**. Edit there to retheme.

| Role            | Hex       | Used for                        |
| --------------- | --------- | ------------------------------- |
| Body background | `#0A0F1A` | body, page bg                   |
| Surface         | `#111827` | cards, panels, footer           |
| Surface 2       | `#1a2236` | borders, hover bg               |
| Primary accent  | `#473bf0` | buttons, active links, focus    |
| Mid accent      | `#6665dd` | gradients, hover                |
| Secondary       | `#9b9ece` | hover text, accents, link hover |
| Muted           | `#acadbc` | dividers, citations             |
| Text primary    | `#F3F4F6` | headings, body                  |
| Text secondary  | `#9CA3AF` | meta, subtext                   |

🔒 **Do not change** any hex inside `src/Assets/avatar.svg` — the royal blue hoodie SVG is preserved exactly.

## ⭐ Must Preserve

- The pure-CSS animated starfield (`src/components/Stars.{jsx,module.css}`) — three layered drift animations, no JS.
- The PDF resume viewer + both download buttons — only swap the PDF file at `src/Assets/Dawūd_Vermeulen.pdf`.
- Responsive design: works at 320px width and up.
- Accessibility: skip-link, focus rings, reduced-motion support.

## 📂 Architecture

```text
src/
├── main.jsx                # ReactDOM.createRoot entry
├── App.jsx                 # BrowserRouter + layout
├── styles/
│   ├── tokens.css          # Design tokens (colors, spacing, shadows, motion)
│   └── global.css          # Resets, base styles, scrollbar, skip link
└── components/
    ├── Stars/              (Stars.jsx + Stars.module.css)
    ├── Navbar/             (custom hamburger, no react-bootstrap)
    ├── Footer/
    ├── Preloader/          (CSS spinner)
    ├── ScrollToTop.jsx
    ├── Home/               (Home, Home2, Type)
    ├── About/              (About, AboutCard, Github, Techstack, Toolstack)
    ├── Projects/           (Projects, ProjectCards)
    └── Resume/             (ResumeNew with PDF error handling)
```

## 🛠️ Common Operations

- **Change colors:** edit `src/styles/tokens.css`.
- **Swap resume PDF:** drop the new file at `src/Assets/Dawūd_Vermeulen.pdf` (same filename). No code change.
- **Add a project:** push a new entry to the `PROJECTS` array in `src/components/Projects/Projects.jsx`.
- **Add a tech icon:** push to the `TECH` or `TOOLS` array in `src/components/About/Techstack.jsx` / `Toolstack.jsx`.

## 🧪 Quality Gates

```bash
npm run lint     # ESLint — must pass
npm run format   # Prettier — must pass
npm run build    # Vite build — must succeed with zero warnings
```

## 🚫 Things to Avoid

- Do not reintroduce `react-bootstrap`, `bootstrap`, `react-tsparticles`, `axios`, `@react-pdf/renderer`.
- Do not add inline `style={{ color: 'purple' }}` — colors come from CSS Modules + tokens.
- Do not introduce TypeScript unless explicitly requested. Use JSDoc for typed props.
- Do not break the starfield animation or its layered drift speeds.

## 🧠 My Brain Preferences (non-negotiable)

- **Short summaries first** → details in bullets/tables.
- **Show before/after diffs** for big changes.
- **Use emojis** as visual anchors: ✅ 🚀 🎨 🐛 ⭐ 📦 🔍 📱 📄 🧹 🔒.
- **No long paragraphs** — break instructions into numbered steps.
- **Explain why** a change matters before showing how.

## 📚 Reference

`CLAUDE.md` is for **AI agents** (Claude Code).
`README.md` is for **humans** (project overview, install instructions).
Keep this file lean — under 250 lines — so it stays in Claude's context window.
