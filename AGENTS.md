# Agent Guidance for otaviorossoni.com

## Project Overview
- Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, Phosphor Icons.
- Personal portfolio site with a blog and a projects showcase, both multilingual.
- `README.md` exists (human-facing, in English) — keep this file (AGENTS.md) as the authoritative AI/agent reference.

## Key Commands
- `npm run dev` — dev server with Turbopack
- `npm run build` — production build
- `npm run typecheck` — TypeScript check without emitting
- **No test suite exists.** `typecheck` is the only quality gate.
- Linting is broken — `next lint` parses "lint" as a directory (Next.js 16), and ESLint 9 crashes with `eslint-config-next` (circular ref). `typecheck` is the only quality gate.
- **Git policy:** Never commit or push without an explicit request from the user.

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

## Content Source (IMPORTANT — content is NOT local)
- Blog posts and project write-ups are **not** stored in this repo. They live in a separate content repo, `Otarossoni/content-otaviorossoni.com`, fetched at request/build time via the GitHub REST API + raw.githubusercontent.com.
- `src/lib/mdx.ts` fetches `blog/{locale}/*.mdx`; `src/lib/projects.ts` fetches `projects/{locale}/*.mdx`. Both hit `api.github.com/repos/.../contents/<path>/<locale>` to list files, then `raw.githubusercontent.com/.../<path>/<locale>/<file>.mdx` to fetch content.
- Both are wrapped in `unstable_cache` with `CACHE_REVALIDATE = 180` (seconds). To pick up new content, wait for revalidation or restart the dev server — editing local files does nothing.
- To add/edit a blog post or project, changes go in the **content repo**, not here.

## Blog (MDX)
- Frontmatter per post: `title`, `description`, `date` (string, `YYYY-MM-DD`), `tags` (space/comma-separated string or array — parsed, lowercased, leading `#` stripped by `parseTags()`).
- Filename convention: `YYYY-MM-DD-slug.mdx`; the date prefix is stripped to produce the slug (`cleanSlug()`), but the raw date still drives the URL.
- **URL structure is date-based:** `/blog/[year]/[month]/[day]/[slug]`, routed at `src/app/[locale]/blog/[year]/[month]/[day]/[slug]/page.tsx`. There is no flat `/blog/[slug]` route.
- **MDX rendering:** Uses `next-mdx-remote/rsc` (NOT `next-mdx-remote/serialize`), with `remarkGfm` + `rehypeHighlight`, and a custom `a` component (`MdxLink`) that opens external links in a new tab.
- **Blog data functions** in `src/lib/mdx.ts` — all require `locale`:
  - `getAllPosts(locale)` — all posts with metadata (incl. `tags`), sorted by date descending
  - `getRecentPosts(locale, limit = 5)` — N most recent posts
  - `getPostBySlug(slug, locale)` — `{ data, content }` for one post; throws if not found (caught with `notFound()` in the page)
  - `getAllPostSlugs(locale)` — slug array
- `generateStaticParams()` on the slug page iterates every locale × post, splitting `date` into `year/month/day` for the param set.
- **Next.js 16:** params are async — must `await params` in page components.

## Projects
- Mirrors the blog pattern in `src/lib/projects.ts`. Frontmatter: `title`, `description`, `href` (live site), `github`, `date`, `duration`, `tags`, `highlight` (boolean — shows a filled star badge on the card).
- Functions: `getAllProjects(locale)`, `getRecentProjects(locale, limit = 9)`, `getProjectBySlug(slug, locale)`, `getAllProjectSlugs(locale)`.
- Routes: `/projects` (list, `src/app/[locale]/projects/page.tsx`) and `/projects/[slug]` (detail, MDX-rendered, shows GitHub/Site links and `duration`).
- `ProjectCard` (`src/app/components/ProjectCard.tsx`) renders a card; `showTags`/`showDuration` props control what's shown (home page shows duration-less cards, `/projects` list shows tags).

## Tags
- `src/lib/tagColors.ts` exports `TAG_DOT_COLORS: Record<string, string>` mapping known tags (react, typescript, go, nextjs, tailwindcss, etc.) to a hex color. Unknown tags fall back to `#737373`.
- Used to color both the pill border and a small dot on tag chips in blog posts and project cards.
- New tags don't need code changes to render (fallback color applies) but won't get a bespoke color until added here.

## Pagination ("Load more")
- `src/lib/actions.ts` is a `"use server"` module exposing `getPaginatedPosts(locale, page)` and `getPaginatedProjects(locale, page)`. Both re-fetch the full list and slice `0..page*PER_PAGE` (not true offset pagination) — `POSTS_PER_PAGE = 10`, `PROJECTS_PER_PAGE = 9`.
- Client components `BlogPostList` and `ProjectList` hold `posts`/`projects` state, call the server action on "load more" click, and track `hasMore`.

## RSS
- `src/lib/rss.ts` builds RSS 2.0 XML (`buildRssXml(locale, translations)`) from `getAllPosts`, using date-based post URLs and per-locale `<language>` tags.
- Two routes: `src/app/rss.xml/route.ts` (root, hardcoded to `pt`) and `src/app/[locale]/rss.xml/route.ts` (locale-aware, 404s on invalid locale). Both set `revalidate = 180`.
- `SITE_URL` comes from `process.env.NEXT_PUBLIC_SITE_URL`, defaulting to `https://otaviorossoni.com`.
- RSS link only shown in the UI on the blog list page (`BlogLayout`'s `showRss` prop).

## Layout, Theme, and Locale Switching
- `BlogLayout` client component (`src/app/components/BlogLayout.tsx`) wraps blog/project pages. Accepts `breadcrumbs: { label; href? }[]`, `locale`, and `showRss`. The home page uses its own `HomeContent` component instead (not `BlogLayout`).
- `src/lib/useTheme.ts` — `useTheme()` hook. Defaults to dark; reads `localStorage["theme"]`, falls back to `prefers-color-scheme: light` media query. Persists on toggle.
- `src/lib/useLocale.ts` — `useSwitchLanguage(currentLocale)` **cycles** through `routing.locales` (pt → en → es → pt), it is not a simple two-way toggle.
- `src/lib/locale.ts` — `localeFlag(locale)` (emoji) and `localeDateString(locale)` (Intl locale string for `toLocaleDateString`).
- `not-found.tsx` (`src/app/[locale]/not-found.tsx`) is a standalone themed 404 page (uses `useTheme` directly, not `BlogLayout`).

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
- Theme toggle uses Phosphor `SunIcon`/`MoonIcon` (not emojis). Home link uses Phosphor `HouseIcon`. Locale switch uses `TranslateIcon`.

## Versioning
- `package.json` version is bumped automatically on every push to `main` by `.github/workflows/bump-version.yml` (`npm version patch`, commits `chore: bump version [skip ci]`, pushes with `GITHUB_TOKEN`). Don't hand-edit the version.
- `HomeContent` imports `version` from `../../../package.json` and displays it (`v{version}`) in the header — this is why the version bump commit exists on essentially every merge to `main`.
