"use client";

import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

const BlogLayout = ({ children, breadcrumbs = [] }: BlogLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDarkMode(false);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const titleToggleStyle: CSSProperties = {
    color: isDarkMode ? "#ededed" : "#171717",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const allBreadcrumbs = [{ label: "Home", href: "/" }, ...breadcrumbs];

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
                href="/"
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

            <div
              style={{ cursor: "pointer" }}
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-7">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
