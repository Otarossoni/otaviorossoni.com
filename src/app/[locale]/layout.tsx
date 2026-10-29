import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Runs before the first paint so the saved theme (or the system preference)
// is applied without a flash. Mirrors the logic in useTheme.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: "Otávio Monteiro Rossoni",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = hasLocale(routing.locales, locale);
  if (!validLocale) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
