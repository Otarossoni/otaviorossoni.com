"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeFlag } from "./locale";

export function useSwitchLanguage(currentLocale: string) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitchLanguage = () => {
    const locales = routing.locales;
    const currentIndex = locales.indexOf(currentLocale as typeof locales[number]);
    const nextIndex = (currentIndex + 1) % locales.length;
    const nextLocale = locales[nextIndex];
    router.replace(pathname, { locale: nextLocale });
  };

  return handleSwitchLanguage;
}

export { localeFlag };
