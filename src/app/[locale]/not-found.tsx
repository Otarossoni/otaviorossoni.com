"use client";

import { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/lib/useTheme";

export default function NotFound() {
  const t = useTranslations();
  const { isDarkMode } = useTheme();

  const titleToggleStyle: CSSProperties = {
    color: isDarkMode ? "#ededed" : "#171717",
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4"
      data-theme={isDarkMode ? "dark" : "light"}
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#ffffff",
        ...titleToggleStyle,
      }}
    >
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-neutral-500">{t("notFoundTitle")}</p>
      <Link
        href="/"
        className="text-sm underline decoration-neutral-600 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
        style={titleToggleStyle}
      >
        {t("notFoundBackHome")}
      </Link>
    </div>
  );
}
