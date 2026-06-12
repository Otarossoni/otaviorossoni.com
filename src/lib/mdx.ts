import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/blog");

export interface PostData {
  title: string;
  description: string;
  date: string;
}

export function getPostBySlug(
  slug: string,
  locale: string
): { data: PostData; content: string } {
  const localeDir = path.join(postsDirectory, locale);
  const fullPath = path.join(localeDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    data: data as PostData,
    content,
  };
}

export function getAllPostSlugs(locale: string) {
  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];

  const fileNames = fs.readdirSync(localeDir);
  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export function getAllPosts(locale: string): PostMeta[] {
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
}

export function getRecentPosts(locale: string, limit: number = 5): PostMeta[] {
  return getAllPosts(locale).slice(0, limit);
}
