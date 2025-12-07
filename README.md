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
```

Then open http://localhost:3000 in your browser.

## Structure

- `src/app` - Next.js App Router pages
- `src/components` - UI components
  - `layout` - App shell layout
  - `notebooks` - Notebook list
  - `chat` - Chat panel
  - `ui` - Reusable primitives (Button, Input)
- `src/lib/cn.ts` - Simple className helper
```
