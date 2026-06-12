"use client";

import { CSSProperties } from "react";
import {
  CodeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  AtIcon,
  UserIcon,
  XLogoIcon,
  GoodreadsLogoIcon,
  ArticleIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/lib/useTheme";
import { useSwitchLanguage } from "@/lib/useLocale";
import { localeFlag } from "@/lib/locale";

import Project, { IProject } from "./Project";
import SocialLink, { ISocialLink } from "./SocialLink";
import { PostMeta } from "@/lib/mdx";

interface HomeContentProps {
  recentPosts: PostMeta[];
  locale: string;
}

export default function HomeContent({ recentPosts, locale }: HomeContentProps) {
  const t = useTranslations();
  const { isDarkMode, handleToggleTheme } = useTheme();
  const handleSwitchLanguage = useSwitchLanguage(locale);

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
      case "Goodreads":
        return { ...link, icon: GoodreadsLogoIcon };
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
      <div className="mx-8 sm:mx-0 sm:w-120 md:w-160">
        {/* Header */}
        <div className="animate-5">
          <div className="flex items-center justify-between pt-16 sm:pt-24 sm:pb-4">
            <h1 className="text-lg font-semibold">{t("title")}</h1>

            <div className="flex gap-3 select-none">
              <button
                onClick={handleToggleTheme}
                aria-label={t("toggleThemeTitle")}
                title={t("toggleThemeTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit"
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
              <button
                onClick={handleSwitchLanguage}
                aria-label={t("toggleLanguageTitle")}
                title={t("toggleLanguageTitle")}
                className="cursor-pointer bg-transparent border-none p-0 text-inherit"
              >
                {localeFlag(locale)}
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

          <div className="grid grid-cols-3 gap-x-8 gap-y-4 pb-12">
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
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[#8A2BE2]"
              >
                <span className="text-sm">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="animate-15">
          <div className="flex items-center gap-2 pb-6">
            <UserIcon className="h-3.5 w-3.5" />
            <h2 className="text-sm text-neutral-500">{t("socialTitle")}</h2>
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
