"use server";

import { getAllPosts, PostMeta } from "@/lib/mdx";
import { getAllProjects, ProjectMeta } from "@/lib/projects";

const POSTS_PER_PAGE = 10;
const PROJECTS_PER_PAGE = 9;

export async function getPaginatedPosts(
  locale: string,
  page: number,
): Promise<{ posts: PostMeta[]; hasMore: boolean }> {
  const allPosts = await getAllPosts(locale);
  const start = 0;
  const end = page * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, end);

  return {
    posts,
    hasMore: end < allPosts.length,
  };
}

export async function getPaginatedProjects(
  locale: string,
  page: number,
): Promise<{ projects: ProjectMeta[]; hasMore: boolean }> {
  const allProjects = await getAllProjects(locale);
  const start = 0;
  const end = page * PROJECTS_PER_PAGE;
  const projects = allProjects.slice(start, end);

  return {
    projects,
    hasMore: end < allProjects.length,
  };
}
