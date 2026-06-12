# Agent Guidance for otaviorossoni.com

## Project Overview
- Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, Phosphor Icons.
- Personal portfolio site with a blog. No README exists.

## Key Commands
- `npm run dev` — dev server with Turbopack
- `npm run build` — production build
- `npm run typecheck` — TypeScript check without emitting
- **No test suite exists.** `typecheck` is the only quality gate.
- Linting is broken — `next lint` parses "lint" as a directory (Next.js 16), and ESLint 9 crashes with `eslint-config-next` (circular ref). `typecheck` is the only quality gate.

## Architecture
- **App Router** in `src/app/[locale]/`. All pages require `locale` param.
- **Path alias:** `@/` resolves to `src/` (configured in `tsconfig.json`).
- **Components** live in `src/app/components/` (not `src/components/`).
- **Fonts:** Geist and Geist_Mono loaded via `next/font/google` in locale layout, exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).

## Tailwind v4
- **No `tailwind.config.js`** — Tailwind v4 uses CSS-first configuration.
- Config lives in `src/app/globals.css` via `@import "tailwindcss"` and `@theme inline { ... }`.
- PostCSS plugin is `@tailwindcss/postcss` (in `postcss.config.mjs`).
- **Typography plugin:** `@tailwindcss/typography` installed for blog prose styling. Prose overrides for dark mode are in `globals.css`.

## Blog (MDX)
- Posts are `.mdx` files in `src/blog/{locale}/` (e.g., `src/blog/pt/construcao.mdx`). Frontmatter: `title` (string), `description` (string), and `date` (string).
- **MDX rendering:** Uses `next-mdx-remote/rsc` (NOT `next-mdx-remote/serialize`). Blog slug page passes raw MDX source directly to `<MDXRemote source={content} />`.
- **Blog data functions** in `src/lib/mdx.ts` — all require `locale` parameter:
  - `getAllPosts(locale)` — returns all posts with metadata, sorted by date descending
  - `getRecentPosts(locale, limit)` — returns N most recent posts
  - `getPostBySlug(slug, locale)` — returns `{ data, content }` for a single post
  - `getAllPostSlugs(locale)` — returns slug array (used for `generateStaticParams`)
- Blog slug page (`src/app/[locale]/blog/[slug]/page.tsx`) uses `generateStaticParams()` for static generation across all locales.
- **Next.js 16:** params are async — must `await params` in page components.

## Blog Layout
- `BlogLayout` client component (`src/app/components/BlogLayout.tsx`) wraps all blog pages.
- Provides breadcrumb navigation with Phosphor `HouseIcon` for home link.
- Accepts `breadcrumbs` prop: `{ label: string; href?: string }[]` and `locale` prop.

## Internationalization (next-intl)
- **Locale routing:** `/pt`, `/en`, `/es` with `pt` as default. Prefix hidden for default locale (`as-needed`).
- **Config:** `src/i18n/routing.ts` and `src/i18n/request.ts`. Plugin configured in `next.config.ts`.
- **Messages:** `messages/pt.json`, `messages/en.json`, `messages/es.json` at project root.
- **Navigation helpers:** `src/i18n/navigation.ts` exports `Link`, `useRouter`, `usePathname` with locale-aware routing.
- **Usage in components:** `useTranslations()` hook for strings, `t.raw()` for arrays (projects, socialLinks).
- **Language switcher:** uses `router.replace(pathname, { locale })` to change locale without losing current path.
- **Proxy:** `src/proxy.ts` replaces deprecated `middleware.ts`. Configured with next-intl.

## Styling Conventions
- Tailwind utility classes throughout. Inline `style` prop used for theme-dependent colors (dark/light toggle).
- Custom animations in `globals.css`: `.animate-5`, `.animate-7`, `.animate-10`, `.animate-15` (staggered fade-in-up).
- Scrollbar is hidden globally via CSS in `globals.css`.
- **Dark mode default:** `html, body` set to `background-color: #000000; color: #ededed` in CSS to prevent flash on page load.

## Import Quirks
- Phosphor Icons: import icon components from `@phosphor-icons/react/dist/ssr` (SSR-safe). The `Icon` type can be imported from the root package `@phosphor-icons/react`.
- CSS imports (`*.css`) require `src/css.d.ts` for TypeScript to recognize them (Next.js only types `*.module.css`).
- Blog layout uses emojis (☀️/🌙) for theme toggle. Home link uses Phosphor `HouseIcon`.
