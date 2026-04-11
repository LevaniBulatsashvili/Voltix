# Voltix — agent context

Minimal notes for AI assistants; expand as the project grows.

## What this is

E‑commerce app focused on **electronics**: catalog, cart, checkout flows, and related user/admin features.

## Stack

| Area | Choice |
|------|--------|
| UI | React (Vite), Tailwind CSS |
| Icons | Lucide React |
| Server state / caching | TanStack React Query v5 |
| Client state | Redux + Redux Toolkit |
| Backend / auth / DB | Supabase (`@supabase/supabase-js`) |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |
| Notifications | React Toastify |
| Routing | React Router |
| Motion | GSAP — import from `src/lib/gsap.ts`; Vite aliases `gsap` to `node_modules/gsap/dist/gsap.min.js` (minified core). Add plugins via `gsap/dist/<Plugin>.min.js` only when needed. |

## Engineering principles

- **Clean, readable, well-structured code** that follows common best practices is the default: consistent formatting, clear module boundaries, and straightforward control flow.
- Prefer **SOLID** boundaries: small modules, clear responsibilities, dependency direction that stays easy to test and change.
- Favor **readability** over cleverness: obvious names, shallow nesting, consistent patterns.
- Organize by **feature** under `src/features/` (co-locate hooks, components, API, and slice logic per domain where it makes sense). Shared UI and cross-cutting code live in `src/components/`, `src/lib/`, `src/store/`, etc.
- **Browser compatibility**: rely on supported baseline features, test in major browsers (Chromium, Firefox, Safari), and avoid unnecessary polyfills.
- **SEO**: sensible routing and document metadata, semantic HTML where it matters for public pages, and performance habits (fast loads, stable layout) that help discoverability.
- **Bundle size**: prefer lazy routes and on-demand imports for heavy libraries; only import GSAP (and plugins) where animations run — avoid pulling unused GSAP plugins into the main chunk.

## Commands

```bash
npm run dev    # local dev (Vite)
npm run build  # typecheck + production build
npm run lint   # ESLint
```

## Environment / secrets

- Supabase URL and anon key (and any other secrets) belong in env files — **do not** commit real keys. Document required variables here when you stabilize them.

## TODO (for humans)

- Add runbooks, API shapes, RLS notes, and naming conventions as they solidify.
