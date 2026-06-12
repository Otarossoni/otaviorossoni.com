import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/blog");

const postsCache = new Map<string, PostMeta[]>();
const slugsCache = new Map<string, string[]>();
const postContentCache = new Map<string, { data: PostData; content: string }>();

export interface PostData {
  title: string;
  description: string;
  date: string;
}

export function getPostBySlug(
  slug: string,
  locale: string
): { data: PostData; content: string } {
  const cacheKey = `${locale}/${slug}`;
  const cached = postContentCache.get(cacheKey);
  if (cached) return cached;

  const localeDir = path.join(postsDirectory, locale);
  const fullPath = path.join(localeDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const result = {
    data: data as PostData,
    content,
  };
  postContentCache.set(cacheKey, result);
  return result;
}

export function getAllPostSlugs(locale: string): string[] {
  const cached = slugsCache.get(locale);
  if (cached) return cached;

  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];

  const fileNames = fs.readdirSync(localeDir);
  const result = fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
  slugsCache.set(locale, result);
  return result;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export function getAllPosts(locale: string): PostMeta[] {
  const cached = postsCache.get(locale);
  if (cached) return cached;

  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];

  const fileNames = fs.readdirSync(localeDir);

  const result = fileNames
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

  postsCache.set(locale, result);
  return result;
}

export function getRecentPosts(locale: string, limit: number = 5): PostMeta[] {
  return getAllPosts(locale).slice(0, limit);
}
