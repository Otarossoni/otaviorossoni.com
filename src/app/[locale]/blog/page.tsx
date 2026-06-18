import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/mdx";
import { routing } from "@/i18n/routing";
import BlogLayout from "@/app/components/BlogLayout";
import BlogPostList from "@/app/components/BlogPostList";

const POSTS_PER_PAGE = 10;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const allPosts = await getAllPosts(locale);

  const initialPosts = allPosts.slice(0, POSTS_PER_PAGE);
  const hasMore = allPosts.length > POSTS_PER_PAGE;

  return (
    <BlogLayout
      locale={locale}
      breadcrumbs={[{ label: t("blogTitle"), href: `/${locale}/blog` }]}
    >
      <h1 className="text-xl sm:text-lg font-semibold mb-8">{t("blogTitle")}</h1>
      <BlogPostList initialPosts={initialPosts} hasMore={hasMore} locale={locale} />
    </BlogLayout>
  );
}
