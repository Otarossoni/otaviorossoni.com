import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, PostData } from "@/lib/mdx";
import { localeDateString } from "@/lib/locale";
import { routing } from "@/i18n/routing";
import BlogLayout from "@/app/components/BlogLayout";
import MdxLink from "@/app/components/MdxLink";
import { TagList } from "@/app/components/Tag";

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
      title={data.title}
      meta={
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-footnote text-label-3 tabular-nums">
            {new Date(data.date + "T00:00:00").toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {data.tags.length > 0 && <TagList tags={data.tags} />}
        </div>
      }
    >
      <article className="prose">
        <div className="mdx-body overflow-x-auto">
          <MDXRemote
            source={content}
            components={{ a: MdxLink }}
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
