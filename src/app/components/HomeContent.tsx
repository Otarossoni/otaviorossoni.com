"use client";

import { CSSProperties } from "react";
import {
  CodeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  AtIcon,
  UserIcon,
  XLogoIcon,
  ArticleIcon,
  ArrowRightIcon,
  FileTextIcon,
  RssIcon,
  SunIcon,
  MoonIcon,
  TranslateIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/lib/useTheme";
import { useSwitchLanguage } from "@/lib/useLocale";
import { version } from "../../../package.json";

import Project, { IProject } from "./Project";
import SocialLink, { ISocialLink } from "./SocialLink";
import { PostMeta } from "@/lib/mdx";

import { routing } from "@/i18n/routing";

interface HomeContentProps {
  recentPosts: PostMeta[];
  locale: string;
}

export default function HomeContent({ recentPosts, locale }: HomeContentProps) {
  const t = useTranslations();
  const { isDarkMode, handleToggleTheme } = useTheme();
  const handleSwitchLanguage = useSwitchLanguage(locale);

  const rssHref = locale === "pt" ? "/rss.xml" : `/${locale}/rss.xml`;
  const projects = t.raw("projects") as IProject[];
  const socialLinks = t.raw("socialLinks") as ISocialLink[];

  const socialLinksWithIcons: ISocialLink[] = socialLinks.map((link) => {
    switch (link.text) {
      case "Email":
        return { ...link, icon: AtIcon };
      case "LinkedIn":
        return { ...link, icon: LinkedinLogoIcon };
      case "GitHub":
        return { ...link, icon: GithubLogoIcon };
      case "X":
        return { ...link, icon: XLogoIcon };
      default:
        return link;
    }
  });

  const titleToggleStyle: CSSProperties = {
    color: isDarkMode ? "#ededed" : "#171717",
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center pb-12"
      data-theme={isDarkMode ? "dark" : "light"}
      style={{
        backgroundColor: isDarkMode ? "#000000" : "#ffffff",
        ...titleToggleStyle,
      }}
    >
      <div className="w-full px-8 sm:w-120 sm:px-0 md:w-160">
        {/* Header */}
        <div className="animate-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-16 sm:pt-24 sm:pb-4 gap-3 sm:gap-0">
            {/* Line 1 */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-3">
              <h1 className="text-lg font-semibold">{t("title")}</h1>
              <div className="flex gap-3 select-none items-center sm:hidden">
                <a
                  href={rssHref}
                  aria-label={t("rssButtonTitle")}
                  className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
                >
                  <RssIcon className="h-5 w-5" />
                </a>
                <button
                  onClick={handleToggleTheme}
                  aria-label={t("toggleThemeTitle")}
                  className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
                >
                  {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </button>
                <button
                  onClick={handleSwitchLanguage}
                  aria-label={t("toggleLanguageTitle")}
                  className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
                >
                  <TranslateIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Line 2 (mobile) */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <div className="flex items-center gap-1.5">
                <FileTextIcon className="h-3.5 w-3.5" />
                <a
                  href={t("curriculumPdf")}
                  download
                  className="text-xs text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
                >
                  {t("curriculumTitle")}
                </a>
              </div>
              <span className="text-neutral-500">|</span>
              <span className="text-xs text-neutral-500">v{version}</span>
            </div>

            {/* Desktop: all in one line */}
            <div className="hidden sm:flex gap-3 select-none items-center">
              <div className="flex items-center gap-1.5">
                <FileTextIcon className="h-3.5 w-3.5" />
                <a
                  href={t("curriculumPdf")}
                  download
                  className="text-xs text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
                >
                  {t("curriculumTitle")}
                </a>
              </div>
              <span className="text-neutral-500">|</span>
              <span className="text-xs text-neutral-500">v{version}</span>
              <span className="text-neutral-500">|</span>
              <a
                href={rssHref}
                aria-label={t("rssButtonTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
              >
                <RssIcon className="h-5 w-5" />
              </a>
              <button
                onClick={handleToggleTheme}
                aria-label={t("toggleThemeTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
              >
                {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              </button>
              <button
                onClick={handleSwitchLanguage}
                aria-label={t("toggleLanguageTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit transition duration-200 ease-in-out hover:text-[#8A2BE2]"
              >
                <TranslateIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-base text-neutral-500 sm:mt-0 pb-12">
            {t("description")}
          </p>
        </div>

        {/* Projects */}
        <div className="animate-7">
          <div className="flex items-center gap-2 pb-6">
            <CodeIcon className="h-3.5 w-3.5" />
            <h2 className="text-sm text-neutral-500">
              {t("projectsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 pb-12">
            {projects.map((project: IProject) => (
              <Project key={project.href} project={project} style={titleToggleStyle} />
            ))}
          </div>
        </div>

        {/* Blog */}
        <div className="animate-10">
          <div className="group flex items-center gap-2 pb-6">
            <ArticleIcon className="h-3.5 w-3.5" />
            <Link
              href="/blog"
              className="text-sm text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
            >
              {t("blogTitle")}
            </Link>
            <Link href="/blog">
              <ArrowRightIcon className="h-3.5 w-3.5 text-neutral-500 transition-all duration-200 ease-in-out group-hover:text-[#8A2BE2] group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 pb-12">
            {recentPosts.map((post) => {
              const [year, month, day] = post.date.split("-");
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${year}/${month}/${day}/${post.slug}`}
                  className="underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[#8A2BE2]"
                >
                  <span className="text-sm">{post.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Social Links */}
        <div className="animate-15">
          <div className="group flex items-center gap-2 pb-6">
            <UserIcon className="h-3.5 w-3.5" />
            <a
              href="https://links.otaviorossoni.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
            >
              {t("socialTitle")}
            </a>
            <a
              href="https://links.otaviorossoni.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 text-neutral-500 transition-all duration-200 ease-in-out group-hover:text-[#8A2BE2] group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {socialLinksWithIcons.map((link: ISocialLink) => (
              <SocialLink key={link.text} link={link} style={titleToggleStyle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
