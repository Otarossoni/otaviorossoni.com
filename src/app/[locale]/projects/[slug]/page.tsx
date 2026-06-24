import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  ProjectData,
} from "@/lib/projects";
import { routing } from "@/i18n/routing";
import BlogLayout from "@/app/components/BlogLayout";
import MdxLink from "@/app/components/MdxLink";
import { TAG_DOT_COLORS } from "@/lib/tagColors";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const slugs = await getAllProjectSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });

  let data: ProjectData;
  let content: string;

  try {
    const project = await getProjectBySlug(slug, locale);
    data = project.data;
    content = project.content;
  } catch {
    notFound();
  }

  return (
    <BlogLayout
      locale={locale}
      breadcrumbs={[
        { label: t("projectsTitle"), href: `/${locale}/projects` },
        { label: data.title },
      ]}
    >
      <h1 className="text-xl sm:text-lg font-semibold mb-2">{data.title}</h1>

      <div className="flex items-center justify-between gap-2 mb-8">
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
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
            >
              <GithubLogoIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {data.href && (
            <a
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
            >
              <GlobeIcon className="h-3.5 w-3.5" />
              Site
            </a>
          )}
          {data.duration && (
            <>
              <span className="text-neutral-500">|</span>
              <span className="text-xs text-neutral-500">{data.duration}</span>
            </>
          )}
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
