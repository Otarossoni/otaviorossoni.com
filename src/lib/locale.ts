const localeFlags: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export function localeFlag(locale: string): string {
  return localeFlags[locale] || "🌐";
}

export function localeDateString(locale: string): string {
  return locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US";
}
