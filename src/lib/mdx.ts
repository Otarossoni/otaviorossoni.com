import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";

const postsDirectory = path.join(process.cwd(), "src/blog");

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

export const getPostBySlug = unstable_cache(
  async (slug: string, locale: string): Promise<{ data: PostData; content: string }> => {
    const localeDir = path.join(postsDirectory, locale);
    const fullPath = path.join(localeDir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      data: data as PostData,
      content,
    };
  },
  ["post-by-slug"],
  { tags: ["blog"] }
);

export const getAllPostSlugs = unstable_cache(
  async (locale: string): Promise<string[]> => {
    const localeDir = path.join(postsDirectory, locale);
    if (!fs.existsSync(localeDir)) return [];

    const fileNames = fs.readdirSync(localeDir);
    return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
  },
  ["post-slugs"],
  { tags: ["blog"] }
);

export const getAllPosts = unstable_cache(
  async (locale: string): Promise<PostMeta[]> => {
    const localeDir = path.join(postsDirectory, locale);
    if (!fs.existsSync(localeDir)) return [];

    const fileNames = fs.readdirSync(localeDir);

    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(localeDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          date: data.date || "",
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  ["all-posts"],
  { tags: ["blog"] }
);

export async function getRecentPosts(locale: string, limit: number = 5): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.slice(0, limit);
}
