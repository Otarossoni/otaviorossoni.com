"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import { HouseIcon, SunIcon, MoonIcon, TranslateIcon, RssIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { useTheme } from "@/lib/useTheme";
import { useSwitchLanguage } from "@/lib/useLocale";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  locale: string;
  showRss?: boolean;
}

const BlogLayout = ({ children, breadcrumbs = [], locale, showRss = false }: BlogLayoutProps) => {
  const t = useTranslations();
  const { isDarkMode, handleToggleTheme } = useTheme();
  const handleSwitchLanguage = useSwitchLanguage(locale);
  const rssHref = locale === "pt" ? "/rss.xml" : `/${locale}/rss.xml`;

  const titleToggleStyle: CSSProperties = {
    color: isDarkMode ? "#ededed" : "#171717",
  };

  const allBreadcrumbs = [
    { label: t("homeTitle"), href: `/${locale}` },
    ...breadcrumbs,
  ];

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center pb-12"
      data-theme={isDarkMode ? "dark" : "light"}
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#faf7f0",
        ...titleToggleStyle,
      }}
    >
      <div className="w-full px-8 sm:w-120 sm:px-0 md:w-160">
        {/* Header */}
        <div className="animate-5">
          <div className="flex items-center justify-between pt-16 sm:pt-24 pb-4">
            <nav className="flex items-center gap-1.5 text-sm font-semibold min-w-0 overflow-hidden" style={titleToggleStyle}>
              <Link
                href={`/${locale}`}
                className="shrink-0 transition duration-200 ease-in-out hover:opacity-70"
              >
                <HouseIcon className="h-4 w-4" />
              </Link>
              {allBreadcrumbs.map((crumb, index) => {
                const isLast = index === allBreadcrumbs.length - 1;
                return (
                  <span key={index} className={`flex items-center gap-1.5 ${isLast ? "min-w-0" : index === 0 ? "hidden sm:flex shrink-0" : "hidden min-[480px]:flex shrink-0"}`}>
                    <span className="text-neutral-500">/</span>
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="shrink-0 transition duration-200 ease-in-out hover:opacity-70"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="truncate">{crumb.label}</span>
                    )}
                  </span>
                );
              })}
            </nav>

            <div className="flex gap-3 select-none">
              {showRss && (
                <a
                  href={rssHref}
                  aria-label={t("rssButtonTitle")}
                  className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
                >
                  <RssIcon className="h-5 w-5" />
                </a>
              )}
              <button
                onClick={handleToggleTheme}
                aria-label={t("toggleThemeTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
              >
                {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              </button>
              <button
                onClick={handleSwitchLanguage}
                aria-label={t("toggleLanguageTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
              >
                <TranslateIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-7">{children}</div>
      </div>
    </div>
  );
};

export default BlogLayout;
