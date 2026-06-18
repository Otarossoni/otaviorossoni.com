"use server";

import { getAllPosts, PostMeta } from "@/lib/mdx";

const POSTS_PER_PAGE = 10;

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
