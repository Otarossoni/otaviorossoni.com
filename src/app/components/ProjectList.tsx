"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectMeta } from "@/lib/projects";
import { getPaginatedProjects } from "@/lib/actions";
import ProjectCard from "./ProjectCard";
import { MORE_LINK_CLASS, MoreLinkContent } from "./MoreLink";

interface ProjectListProps {
  initialProjects: ProjectMeta[];
  hasMore: boolean;
  locale: string;
}

export default function ProjectList({ initialProjects, hasMore, locale }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProjects, setHasMore] = useState(hasMore);
  const t = useTranslations();

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;

    const result = await getPaginatedProjects(locale, nextPage);

    setProjects(result.projects);
    setCurrentPage(nextPage);
    setHasMore(result.hasMore);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} showTags={true} />
        ))}
      </div>

      {hasMoreProjects && (
        <button type="button" onClick={handleLoadMore} disabled={loading} className={`${MORE_LINK_CLASS} self-start`}>
          <MoreLinkContent>{loading ? t("loading") : t("loadMore")}</MoreLinkContent>
        </button>
      )}
    </div>
  );
}
