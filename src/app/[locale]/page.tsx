import { getRecentPosts } from "@/lib/mdx";
import { routing } from "@/i18n/routing";
import HomeContent from "../components/HomeContent";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const recentPosts = await getRecentPosts(locale, 3);

  return <HomeContent recentPosts={recentPosts} locale={locale} />;
}
