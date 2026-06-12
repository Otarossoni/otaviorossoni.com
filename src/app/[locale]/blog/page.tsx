import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getAllPosts } from "@/lib/mdx";
import { routing } from "@/i18n/routing";
import { localeDateString } from "@/lib/locale";
import BlogLayout from "@/app/components/BlogLayout";

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
  const posts = getAllPosts(locale);

  const dateLocale = localeDateString(locale);

  return (
    <BlogLayout
      locale={locale}
      breadcrumbs={[{ label: t("blogTitle"), href: `/${locale}/blog` }]}
    >
      <h1 className="text-xl sm:text-lg font-semibold mb-8">{t("blogTitle")}</h1>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 transition duration-200 ease-in-out"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold transition duration-200 ease-in-out group-hover:text-[#8A2BE2]">
                {post.title}
              </span>
              {post.description && (
                <p className="text-xs text-neutral-500">{post.description}</p>
              )}
            </div>
            <span className="text-xs text-neutral-500">
              {new Date(post.date + "T00:00:00").toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>
    </BlogLayout>
  );
}
