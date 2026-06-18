import { getTranslations } from "next-intl/server";
import { buildRssXml } from "@/lib/rss";
import { routing } from "@/i18n/routing";

export const revalidate = 180;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    return new Response("Not Found", { status: 404 });
  }

  const t = await getTranslations({ locale });
  const xml = await buildRssXml(locale, {
    rssTitle: t("rssTitle"),
    rssDescription: t("rssDescription"),
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
