"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectMeta } from "@/lib/projects";
import { getPaginatedProjects } from "@/lib/actions";
import LinkText from "./LinkText";
import { useTheme } from "@/lib/useTheme";

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
  const { isDarkMode } = useTheme();

  const titleStyle = {
    color: isDarkMode ? "#ededed" : "#171717",
  };

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
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
        {projects.map((project) => (
          <div key={project.slug} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <LinkText href={project.href} style={titleStyle}>{project.title}</LinkText>
            </div>
            <p className="text-sm text-neutral-500">{project.description}</p>
          </div>
        ))}
      </div>

      {hasMoreProjects && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="text-xs text-neutral-500 hover:text-[#8A2BE2] transition duration-200 ease-in-out cursor-pointer bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t("loading") : t("loadMore")}
        </button>
      )}
    </div>
  );
}
