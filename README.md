
# React Page Builder (Modular, Vite + TS + Zustand)

A minimal, modular page builder starter that mirrors an Unbounce-style layout editor with sections, columns, and widgets — built with React, TypeScript, Zustand, Tailwind classes, and Lucide icons.

## Quickstart

```bash
pnpm i     # or npm i / yarn
pnpm dev   # or npm run dev / yarn dev
```

Then open http://localhost:5173

## Notes

- State lives in `src/features/builder/store.ts` (Zustand)
- Types contract in `src/features/builder/types.ts`
- UI is split under `src/features/builder/components/**`
- Persistence via localStorage in `src/features/builder/services/persist.ts`
- Tailwind is preconfigured; we use utility classes only (no compile-time plugins required beyond default config)
```

