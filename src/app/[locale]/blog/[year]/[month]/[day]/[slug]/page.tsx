import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, PostData } from "@/lib/mdx";
import { localeDateString } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import BlogLayout from "@/app/components/BlogLayout";

export async function generateStaticParams() {
  const params: {
    locale: string;
    year: string;
    month: string;
    day: string;
    slug: string;
  }[] = [];

  for (const locale of routing.locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      const [year, month, day] = post.date.split("-");
      params.push({ locale, year, month, day, slug: post.slug });
    }
  }

  return params;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{
    locale: string;
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  let data: PostData;
  let content: string;

  try {
    const post = await getPostBySlug(slug, locale);
    data = post.data;
    content = post.content;
  } catch {
    notFound();
  }

  const dateLocale = localeDateString(locale);

  return (
    <BlogLayout
      locale={locale}
      breadcrumbs={[
        { label: t("blogTitle"), href: `/${locale}/blog` },
        { label: data.title },
      ]}
    >
      <h1 className="text-xl sm:text-lg font-semibold mb-4">{data.title}</h1>
      <p className="text-xs text-neutral-500 mb-8">
        {new Date(data.date + "T00:00:00").toLocaleDateString(dateLocale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <article className="prose prose-invert max-w-none">
        <div className="overflow-x-auto">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
      </article>
    </BlogLayout>
  );
}
