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
import { TAG_DOT_COLORS } from "@/lib/tagColors";

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
      <h1 className="text-xl sm:text-lg font-semibold mb-2">{data.title}</h1>

      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
        <div className="flex flex-wrap gap-1.5">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="project-tag text-[10px] rounded-full px-2 py-0.5 text-neutral-500 border"
              style={{ borderColor: TAG_DOT_COLORS[tag] || "#737373" }}
            >
              <span
                className="project-tag-dot inline-block w-2 h-2 rounded-full mr-1 align-middle"
                style={{ backgroundColor: TAG_DOT_COLORS[tag] || "#737373" }}
              />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-neutral-500">
            {new Date(data.date + "T00:00:00").toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <article className="prose prose-invert max-w-none">
        <div className="overflow-x-auto">
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
