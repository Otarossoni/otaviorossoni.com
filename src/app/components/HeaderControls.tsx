"use client";

import { MoonIcon, RssIcon, SunIcon, TranslateIcon } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { useTheme } from "@/lib/useTheme";
import { useSwitchLanguage } from "@/lib/useLocale";
import { ICON_BUTTON_CLASS, IconCircle } from "./IconButton";

interface HeaderControlsProps {
  locale: string;
  rssHref?: string;
}

// RSS (optional), theme and language buttons. The negative margin lines the
// visible circles up with the column edge.
export default function HeaderControls({ locale, rssHref }: HeaderControlsProps) {
  const t = useTranslations();
  const { handleToggleTheme } = useTheme();
  const handleSwitchLanguage = useSwitchLanguage(locale);

  return (
    <div className="-mr-1 flex shrink-0 select-none">
      {rssHref && (
        <a href={rssHref} aria-label={t("rssButtonTitle")} className={ICON_BUTTON_CLASS}>
          <IconCircle>
            <RssIcon size={18} />
          </IconCircle>
        </a>
      )}
      <button type="button" onClick={handleToggleTheme} aria-label={t("toggleThemeTitle")} className={ICON_BUTTON_CLASS}>
        <IconCircle>
          <MoonIcon size={18} className="theme-icon-dark" />
          <SunIcon size={18} className="theme-icon-light" />
        </IconCircle>
      </button>
      <button type="button" onClick={handleSwitchLanguage} aria-label={t("toggleLanguageTitle")} className={ICON_BUTTON_CLASS}>
        <IconCircle>
          <TranslateIcon size={18} />
        </IconCircle>
      </button>
    </div>
  );
}
