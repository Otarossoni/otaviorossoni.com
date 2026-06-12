# Agent Guidance for otaviorossoni.com

## Project Overview
- Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Phosphor Icons.
- Personal portfolio site with a blog. No README exists.

## Key Commands
- `npm run dev` — dev server with Turbopack
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`)
- **No test suite exists.** `lint` is the only quality gate.

## Architecture
- **App Router** in `src/app/`. Home page (`src/app/page.tsx`) is a server component that fetches recent posts and passes them to `HomeContent` client component.
- **Path alias:** `@/` resolves to `src/` (configured in `tsconfig.json`).
- **Components** live in `src/app/components/` (not `src/components/`).
- **Fonts:** Geist and Geist_Mono loaded via `next/font/google`, exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).

## Tailwind v4
- **No `tailwind.config.js`** — Tailwind v4 uses CSS-first configuration.
- Config lives in `src/app/globals.css` via `@import "tailwindcss"` and `@theme inline { ... }`.
- PostCSS plugin is `@tailwindcss/postcss` (in `postcss.config.mjs`).
- **Typography plugin:** `@tailwindcss/typography` installed for blog prose styling. Prose overrides for dark mode are in `globals.css`.

## Blog (MDX)
- Posts are `.mdx` files in `src/blog/`. Frontmatter: `title` (string) and `date` (string).
- **MDX rendering:** Uses `next-mdx-remote/rsc` (NOT `next-mdx-remote/serialize`). Blog slug page passes raw MDX source directly to `<MDXRemote source={content} />`.
- **Blog data functions** in `src/lib/mdx.ts`:
  - `getAllPosts()` — returns all posts with metadata, sorted by date descending
  - `getRecentPosts(limit)` — returns N most recent posts
  - `getPostBySlug(slug)` — returns `{ data, content }` for a single post
  - `getAllPostSlugs()` — returns slug array (used for `generateStaticParams`)
- Blog slug page (`src/app/blog/[slug]/page.tsx`) uses `generateStaticParams()` for static generation.
- **Next.js 16:** params are async — must `await params` in page components.

## Blog Layout
- `BlogLayout` client component (`src/app/components/BlogLayout.tsx`) wraps all blog pages.
- Provides breadcrumb navigation: `🏠 / Home / Blog / {Post Title}`.
- Dark/light mode toggle using emojis (☀️/🌙), same pattern as homepage.
- Accepts `breadcrumbs` prop: `{ label: string; href?: string }[]`.

## Internationalization
- Client-side only. Language files in `src/app/languages/` (`pt.json`, `es.json`, `en.json`).
- Toggled via `useState` on the home page — no routing or middleware involved.

## Styling Conventions
- Tailwind utility classes throughout. Inline `style` prop used for theme-dependent colors (dark/light toggle).
- Custom animations in `globals.css`: `.animate-5`, `.animate-7`, `.animate-10`, `.animate-15` (staggered fade-in-up).
- Scrollbar is hidden globally via CSS in `globals.css`.
- **Dark mode default:** `html, body` set to `background-color: #000000; color: #ededed` in CSS to prevent flash on page load.

## Import Quirks
- Phosphor Icons: import icon components from `@phosphor-icons/react/dist/ssr` (SSR-safe). The `Icon` type can be imported from the root package `@phosphor-icons/react`.
- Blog layout uses emojis (☀️/🌙) for theme toggle. Home link uses Phosphor `HouseIcon`.
