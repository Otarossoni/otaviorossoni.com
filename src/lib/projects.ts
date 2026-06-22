import matter from "gray-matter";
import { unstable_cache } from "next/cache";

const GITHUB_REPO = "Otarossoni/content-otaviorossoni.com";
const GITHUB_BRANCH = "main";
const PROJECTS_PATH = "projects";
const CACHE_REVALIDATE = 180;

const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${PROJECTS_PATH}`;
const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents/${PROJECTS_PATH}`;

interface GitHubFile {
  name: string;
  type: string;
  download_url: string;
}

export interface ProjectData {
  title: string;
  description: string;
  github: string;
  date: string;
  duration: string;
  tags: string[];
  highlight: boolean;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  github: string;
  date: string;
  duration: string;
  tags: string[];
  highlight: boolean;
}

function cleanSlug(fileName: string): string {
  return fileName.replace(/\.mdx$/, "");
}

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw !== "string") return [];
  return raw
    .split(/[\s,]+/)
    .map((t) => t.replace(/^#+/, "").trim().toLowerCase())
    .filter(Boolean);
}

async function fetchGitHubDir(locale: string): Promise<GitHubFile[]> {
  const res = await fetch(`${API_BASE}/${locale}?ref=${GITHUB_BRANCH}`, {
    headers: { "User-Agent": "otaviorossoni-projects" },
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
  fileName: string,
): Promise<string | null> {
  const res = await fetch(`${RAW_BASE}/${locale}/${fileName}.mdx`, {
    headers: { "User-Agent": "otaviorossoni-projects" },
    next: { revalidate: CACHE_REVALIDATE },
  });

  if (!res.ok) return null;
  return res.text();
}

export const getAllProjects = unstable_cache(
  async (locale: string): Promise<ProjectMeta[]> => {
    const files = await fetchGitHubDir(locale);

    const projects = await Promise.all(
      files.map(async (file) => {
        const slug = cleanSlug(file.name);
        const fileName = file.name.replace(/\.mdx$/, "");
        const content = await fetchFileContent(locale, fileName);

        if (!content) return null;

        const { data } = matter(content);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          github: data.github || "",
          date: data.date || "",
          duration: data.duration || "",
          tags: parseTags(data.tags),
          highlight: data.highlight === true,
        };
      }),
    );

    return projects
      .filter((project): project is ProjectMeta => project !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  [`all-projects-${GITHUB_BRANCH}`],
  { revalidate: CACHE_REVALIDATE },
);

export async function getRecentProjects(
  locale: string,
  limit: number = 9,
): Promise<ProjectMeta[]> {
  const projects = await getAllProjects(locale);
  return projects.slice(0, limit);
}
