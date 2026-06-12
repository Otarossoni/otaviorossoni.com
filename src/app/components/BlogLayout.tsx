"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { useTheme } from "@/lib/useTheme";
import { useSwitchLanguage } from "@/lib/useLocale";
import { localeFlag } from "@/lib/locale";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  locale: string;
}

const BlogLayout = ({ children, breadcrumbs = [], locale }: BlogLayoutProps) => {
  const t = useTranslations();
  const { isDarkMode, handleToggleTheme } = useTheme();
  const handleSwitchLanguage = useSwitchLanguage(locale);

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
        backgroundColor: isDarkMode ? "#000000" : "#ffffff",
        ...titleToggleStyle,
      }}
    >
      <div className="mx-8 sm:mx-0 sm:w-120 md:w-160">
        {/* Header */}
        <div className="animate-5">
          <div className="flex items-center justify-between pt-16 sm:pt-24 sm:pb-4">
            <nav className="flex items-center gap-1.5 text-sm font-semibold" style={titleToggleStyle}>
              <Link
                href={`/${locale}`}
                className="transition duration-200 ease-in-out hover:opacity-70"
              >
                <HouseIcon className="h-4 w-4" />
              </Link>
              {allBreadcrumbs.map((crumb, index) => {
                const isLast = index === allBreadcrumbs.length - 1;
                return (
                  <span key={index} className="flex items-center gap-1.5">
                    <span className="text-neutral-500">/</span>
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition duration-200 ease-in-out hover:opacity-70"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </span>
                );
              })}
            </nav>

            <div className="flex gap-3 select-none">
              <button
                onClick={handleToggleTheme}
                aria-label={t("toggleThemeTitle")}
                title={t("toggleThemeTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit"
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
              <button
                onClick={handleSwitchLanguage}
                aria-label={t("toggleLanguageTitle")}
                title={t("toggleLanguageTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit"
              >
                {localeFlag(locale)}
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
