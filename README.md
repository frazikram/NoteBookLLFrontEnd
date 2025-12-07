# Notebook LLM Frontend (v2)

A minimal Next.js + TypeScript + Tailwind starter for the NotebookLLM project,
using a tiny homegrown UI kit (no shadcn).

## Getting Started

```bash
npm install
npm run dev
# or
pnpm install
pnpm dev
**NotebookLLM Frontend**

An intentionally small Next.js + TypeScript + TailwindCSS prototype UI for the
NotebookLLM project. The repo is a frontend-only prototype that demonstrates a
notebook-centered workflow (list notebooks, open a notebook, ask questions
about the notebook via a chat panel). It focuses on simple, reusable
components and minimal dependencies so it's easy to extend.

**Key Goals**
- **Prototype** a notebook-first chat UI for interacting with document sources.
- **Lightweight**: no heavy UI frameworks; simple primitives and Tailwind for
  styling.
- **Starter**: useful as a base for integrating a backend LLM service.

**Tech Stack**
- **Framework**: `Next.js` (App Router)
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS`
- **Build tools**: `npm` / `node`

**Quick Start**
```
1. Install dependencies

bash
npm install


2. Run the development server

```bash
npm run dev
```

3. Open the app

Open `http://localhost:3000` in your browser.

Other useful commands

```bash
npm run build    # production build
npm start        # start the production server (after build)
npm run lint     # run Next/Eslint checks
```

**Repository Structure (high level)**

- `src/app/` : Next.js App Router root. Contains `layout.tsx`, the root
  `page.tsx`, and route folders such as `notebooks/[id]/page.tsx`.
- `src/components/` : UI components grouped by feature
  - `layout/AppShell.tsx` : basic two-column shell (sidebar + main content).
  - `notebooks/NotebookList.tsx` : sample notebook list with mock data.
  - `chat/ChatPanel.tsx` : client-side chat UI used inside a notebook.
  - `ui/button.tsx`, `ui/input.tsx` : small UI primitives used across the app.
- `src/lib/cn.ts` : tiny `className` helper (filters falsy values).
- `src/app/globals.css` : Tailwind + global styles.
- `next.config.mjs`, `tsconfig.json`, and `tailwind.config.ts` : project
  configuration files.

**What the app currently does**

- Renders a simple list of mock notebooks on the home page (`/`).
- Clicking a notebook navigates to `/notebooks/[id]` and opens a two-column
  view: sources on the left and a chat panel on the right.
- The chat panel is client-side and uses a mock response flow (no LLM
  integration yet).

**Important files to inspect**

- `src/app/page.tsx` — home page showing `NotebookList`.
- `src/components/notebooks/NotebookList.tsx` — mock data and card UI.
- `src/app/notebooks/[id]/page.tsx` — notebook page + `ChatPanel` usage.
- `src/components/chat/ChatPanel.tsx` — interactive chat UI (client component).
- `src/components/layout/AppShell.tsx` — application chrome / navigation.

**Styling & Design**

The project uses Tailwind CSS for styling and small utility classes in the
component files. A custom token palette is expected in `globals.css` (see
`src/app/globals.css`). UI primitives like `Button` and `Input` live in
`src/components/ui` and use the `cn` helper in `src/lib/cn.ts`.

**Extending / Integrating an LLM backend**

This frontend is intentionally decoupled from any LLM provider. Typical
integration steps:

1. Add a backend API route (e.g., `pages/api/` or an external server) that
   proxies requests to your chosen LLM provider (OpenAI, Anthropic, local
   server, etc.).
2. Replace the mock assistant response in `ChatPanel.tsx` with an async call
   to your API and stream or append assistant messages based on the response.
3. Persist notebooks and source documents in a database or object store and
   load them in `notebooks/[id]/page.tsx` instead of using the current
   `mockNotebook` object.

**Roadmap / TODOs**

- Replace mock data with real notebook storage (DB + API).
- Add authentication and per-user notebooks.
- Add source upload / ingestion workflow and vector store integration.
- Stream assistant responses into the chat panel for better UX.

**Contributing**

This repo is a small prototype; contributions are welcome. Suggested
workflow:

1. Fork and create a feature branch.
2. Keep changes focused and add a short description to your PR.

**License**

This repository does not include an explicit license file. If you plan to
share publicly, add a `LICENSE` file or let me know which license you prefer
and I can add one.


