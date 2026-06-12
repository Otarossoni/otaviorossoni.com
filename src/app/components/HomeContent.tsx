"use client";

import Head from "next/head";
import Link from "next/link";
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
import { CSSProperties, useEffect, useState } from "react";

import pt from "../languages/pt.json";
import en from "../languages/en.json";
import es from "../languages/es.json";

import Project, { IProject } from "./Project";
import SocialLink, { ISocialLink } from "./SocialLink";
import { PostMeta } from "@/lib/mdx";

interface HomeContentProps {
  recentPosts: PostMeta[];
}

export default function HomeContent({ recentPosts }: HomeContentProps) {
  const [currentLang, setCurrentLang] = useState("pt");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDarkMode(false);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const languages = [
    { code: "pt", emoji: "🇧🇷", content: pt },
    { code: "en", emoji: "🇺🇸", content: en },
    { code: "es", emoji: "🇪🇸", content: es },
  ];

  const currentLanguageObject =
    languages.find((lang) => lang.code === currentLang) ?? languages[0];
  const content = currentLanguageObject.content;

  const socialLinksWithIcons = content.socialLinks.map((link: ISocialLink) => {
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

  const handleSwitchLanguage = () => {
    const currentIndex = languages.findIndex((lang) => lang.code === currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLang(languages[nextIndex].code);
  };

  const titleToggleStyle: CSSProperties = {
    color: isDarkMode ? "#ededed" : "#171717",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <meta property="og:title" content={content.title} />
        <meta property="og:site_name" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.otaviorossoni.com/" />
      </Head>

      <div
        className="flex min-h-screen w-full flex-col items-center pb-12"
        style={{
          backgroundColor: isDarkMode ? "#000000" : "#ffffff",
          ...titleToggleStyle,
        }}
      >
        <div className="mx-8 sm:mx-0 sm:w-120 md:w-160">
          {/* Header */}
          <div className="animate-5">
            <div className="flex items-center justify-between pt-16 sm:pt-24 sm:pb-4">
              <h1 className="text-lg font-semibold" style={titleToggleStyle}>
                {content.title}
              </h1>

              <div className="flex gap-3 select-none">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleToggleTheme}
                  aria-label={content.toggleThemeTitle}
                  title={content.toggleThemeTitle}
                >
                  {isDarkMode ? "🌙" : "☀️"}
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleSwitchLanguage}
                  aria-label={content.toggleLanguageTitle}
                  title={content.toggleLanguageTitle}
                >
                  {currentLanguageObject.emoji}
                </div>
              </div>
            </div>

            <p className="mt-4 text-base text-neutral-500 sm:mt-0 pb-12">
              {content.description}
            </p>
          </div>

          {/* Projects */}
          <div className="animate-7">
            <div className="flex items-center gap-2 pb-6">
              <CodeIcon className="h-3.5 w-3.5" style={titleToggleStyle} />
              <h2 className="text-sm text-neutral-500">
                {content.projectsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-x-8 gap-y-4 pb-12">
              {content.projects.map((project: IProject, index: number) => (
                <Project
                  key={index}
                  project={project}
                  style={titleToggleStyle}
                />
              ))}
            </div>
          </div>

          {/* Blog */}
          <div className="animate-10">
            <div className="flex items-center gap-2 pb-6">
              <ArticleIcon className="h-3.5 w-3.5" style={titleToggleStyle} />
              <h2 className="text-sm text-neutral-500">
                {content.blogTitle}
              </h2>
              <Link
                href="/blog"
                className="group text-neutral-500 transition duration-200 ease-in-out hover:text-[#8A2BE2]"
              >
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col gap-3 pb-12">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[#8A2BE2]"
                  style={titleToggleStyle}
                >
                  <span className="text-sm">{post.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="animate-15">
            <div className="flex items-center gap-2 pb-6">
              <UserIcon className="h-3.5 w-3.5" style={titleToggleStyle} />
              <h2 className="text-sm text-neutral-500">
                {content.socialTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {socialLinksWithIcons.map((link: ISocialLink, index: number) => (
                <SocialLink
                  key={index}
                  link={link}
                  style={titleToggleStyle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
