import { getAllPosts } from "./mdx";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://otaviorossoni.com";

function localePath(locale: string, path: string): string {
  if (locale === "pt") return path;
  return `/${locale}${path}`;
}

function formatPubDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toUTCString();
}

export interface RssTranslations {
  rssTitle: string;
  rssDescription: string;
}

export async function buildRssXml(
  locale: string,
  translations: RssTranslations,
): Promise<string> {
  const posts = await getAllPosts(locale);
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const feedUrl = `${baseUrl}${localePath(locale, "/rss.xml")}`;
  const lang = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US";

  const items = posts
    .map((post) => {
      const [year, month, day] = post.date.split("-");
      const postUrl = `${baseUrl}${localePath(locale, `/blog/${year}/${month}/${day}/${post.slug}`)}`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid>${escapeXml(postUrl)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${formatPubDate(post.date)}</pubDate>
${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(translations.rssTitle)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(translations.rssDescription)}</description>
    <language>${lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}
