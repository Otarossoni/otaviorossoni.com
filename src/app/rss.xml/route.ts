import { getTranslations } from "next-intl/server";
import { buildRssXml } from "@/lib/rss";

export const revalidate = 180;

export async function GET() {
  const t = await getTranslations({ locale: "pt" });
  const xml = await buildRssXml("pt", {
    rssTitle: t("rssTitle"),
    rssDescription: t("rssDescription"),
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
