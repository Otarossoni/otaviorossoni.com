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
import Pill, { PILL_LINK_CLASS } from "@/app/components/Pill";
import { TagList } from "@/app/components/Tag";

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
      title={data.title}
      meta={
        <>
          {data.tags.length > 0 && <TagList tags={data.tags} />}
          {(data.github || data.href || data.duration) && (
            <div className="flex flex-wrap items-center gap-3">
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className={PILL_LINK_CLASS}>
                  <Pill>
                    <GithubLogoIcon size={16} />
                    GitHub
                  </Pill>
                </a>
              )}
              {data.href && (
                <a href={data.href} target="_blank" rel="noopener noreferrer" className={PILL_LINK_CLASS}>
                  <Pill>
                    <GlobeIcon size={16} />
                    Site
                  </Pill>
                </a>
              )}
              {data.duration && (
                <span className="font-mono text-footnote text-label-3 tabular-nums">{data.duration}</span>
              )}
            </div>
          )}
        </>
      }
    >
      <article className="prose prose-project">
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
