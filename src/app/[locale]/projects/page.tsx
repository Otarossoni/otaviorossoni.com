import { getTranslations } from "next-intl/server";
import { getAllProjects } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import BlogLayout from "@/app/components/BlogLayout";
import ProjectList from "@/app/components/ProjectList";

const PROJECTS_PER_PAGE = 9;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const allProjects = await getAllProjects(locale);

  const initialProjects = allProjects.slice(0, PROJECTS_PER_PAGE);
  const hasMore = allProjects.length > PROJECTS_PER_PAGE;

  return (
    <BlogLayout
      locale={locale}
      breadcrumbs={[{ label: t("projectsTitle"), href: `/${locale}/projects` }]}
    >
      <h1 className="text-xl sm:text-lg font-semibold mb-8">{t("projectsTitle")}</h1>
      <ProjectList initialProjects={initialProjects} hasMore={hasMore} locale={locale} />
    </BlogLayout>
  );
}
