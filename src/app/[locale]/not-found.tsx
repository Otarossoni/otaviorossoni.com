"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/lib/useTheme";
import { MORE_LINK_CLASS, MoreLinkContent } from "@/app/components/MoreLink";

// No header: the three elements are centred on both axes of the visible area.
export default function NotFound() {
  const t = useTranslations();
  useTheme();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4 py-6 text-center sm:px-6">
      <h1 className="m-0 text-404-mobile font-bold tabular-nums sm:text-404">404</h1>
      <p className="m-0 mt-2 text-callout text-label-2 sm:mt-3 sm:text-message">{t("notFoundTitle")}</p>
      <Link href="/" className={`${MORE_LINK_CLASS} mt-5 px-2 sm:mt-6`}>
        <MoreLinkContent>{t("notFoundBackHome")}</MoreLinkContent>
      </Link>
    </main>
  );
}
