"use client";

import Link from "next/link";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import HeaderControls from "./HeaderControls";
import { ICON_BUTTON_CLASS, IconCircle } from "./IconButton";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  meta?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  locale: string;
  showRss?: boolean;
}

// Single centred column (680px). The header shares the column's edges; the
// page title sits on top, then the metadata (16px), then the content (32px).
const BlogLayout = ({ children, title, meta, breadcrumbs = [], locale, showRss = false }: BlogLayoutProps) => {
  const t = useTranslations();
  const rssHref = locale === "pt" ? "/rss.xml" : `/${locale}/rss.xml`;

  const allBreadcrumbs = [
    { label: t("homeTitle"), href: `/${locale}` },
    ...breadcrumbs,
  ];

  return (
    <div className="flex min-h-svh w-full flex-col">
      {/* Header */}
      <header className="animate-5 mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 pt-2 sm:px-6 sm:pt-6">
        <nav className="-ml-1 flex min-w-0 items-center gap-1 text-callout font-medium">
          <Link href={`/${locale}`} aria-label={t("homeTitle")} className={ICON_BUTTON_CLASS}>
            <IconCircle>
              <HouseIcon size={18} />
            </IconCircle>
          </Link>
          {allBreadcrumbs.map((crumb, index) => {
            const isLast = index === allBreadcrumbs.length - 1;
            const visibility = isLast ? "flex min-w-0" : index === 0 ? "hidden sm:flex shrink-0" : "hidden min-[400px]:flex shrink-0";
            return (
              <span key={index} className={`${visibility} items-center gap-1`}>
                {index > 0 && <span className="text-label-3">/</span>}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="flex h-hit items-center px-1 whitespace-nowrap text-label-2 transition-colors hover:text-accent"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="truncate px-1">{crumb.label}</span>
                )}
              </span>
            );
          })}
        </nav>

        <HeaderControls locale={locale} rssHref={showRss ? rssHref : undefined} />
      </header>

      {/* Content */}
      <main className="animate-7 mx-auto flex w-full max-w-page flex-col px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-32">
        <h1 className="m-0 text-title-mobile font-bold text-balance sm:text-title">{title}</h1>
        {meta && <div className="mt-4 flex flex-col gap-2">{meta}</div>}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
};

export default BlogLayout;
