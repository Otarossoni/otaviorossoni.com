import matter from "gray-matter";
import { unstable_cache } from "next/cache";

const GITHUB_REPO = "Otarossoni/content-otaviorossoni.com";
const GITHUB_BRANCH = "main";
const BLOG_PATH = "blog";
const CACHE_REVALIDATE = 180;

const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${BLOG_PATH}`;
const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_PATH}`;

interface GitHubFile {
  name: string;
  type: string;
  download_url: string;
}

export interface PostData {
  title: string;
  description: string;
  date: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

async function fetchGitHubDir(locale: string): Promise<GitHubFile[]> {
  const res = await fetch(`${API_BASE}/${locale}?ref=${GITHUB_BRANCH}`, {
    headers: { "User-Agent": "otaviorossoni-blog" },
    next: { revalidate: CACHE_REVALIDATE },
  });

  if (!res.ok) return [];

  const data: GitHubFile[] = await res.json();
  return data.filter(
    (item) => item.name.endsWith(".mdx") && item.type === "file",
  );
}

async function fetchFileContent(
  locale: string,
  slug: string,
): Promise<string | null> {
  const res = await fetch(`${RAW_BASE}/${locale}/${slug}.mdx`, {
    headers: { "User-Agent": "otaviorossoni-blog" },
    next: { revalidate: CACHE_REVALIDATE },
  });

  if (!res.ok) return null;
  return res.text();
}

export const getPostBySlug = unstable_cache(
  async (
    slug: string,
    locale: string,
  ): Promise<{ data: PostData; content: string }> => {
    const fileContent = await fetchFileContent(locale, slug);

    if (!fileContent) {
      throw new Error(`Post not found: ${locale}/${slug}`);
    }

    const { data, content } = matter(fileContent);

    return {
      data: data as PostData,
      content,
    };
  },
  [`post-by-slug-${GITHUB_BRANCH}`],
  { revalidate: CACHE_REVALIDATE },
);

export const getAllPostSlugs = unstable_cache(
  async (locale: string): Promise<string[]> => {
    const files = await fetchGitHubDir(locale);
    return files.map((file) => file.name.replace(/\.mdx$/, ""));
  },
  [`post-slugs-${GITHUB_BRANCH}`],
  { revalidate: CACHE_REVALIDATE },
);

export const getAllPosts = unstable_cache(
  async (locale: string): Promise<PostMeta[]> => {
    const files = await fetchGitHubDir(locale);

    const posts = await Promise.all(
      files.map(async (file) => {
        const slug = file.name.replace(/\.mdx$/, "");
        const content = await fetchFileContent(locale, slug);

        if (!content) return null;

        const { data } = matter(content);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          date: data.date || "",
        };
      }),
    );

    return posts
      .filter((post): post is PostMeta => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  [`all-posts-${GITHUB_BRANCH}`],
  { revalidate: CACHE_REVALIDATE },
);

export async function getRecentPosts(
  locale: string,
  limit: number = 5,
): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.slice(0, limit);
}
