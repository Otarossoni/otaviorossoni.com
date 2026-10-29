"use client";

import {
  CodeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  AtIcon,
  UserIcon,
  XLogoIcon,
  NotePencilIcon,
  ArrowRightIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localeDateString } from "@/lib/locale";
import { version } from "../../../package.json";

import ProjectCard from "./ProjectCard";
import ExperienceSection from "./ExperienceSection";
import HeaderControls from "./HeaderControls";
import Pill, { PILL_LINK_CLASS } from "./Pill";
import { MORE_LINK_CLASS, MoreLinkContent, SECTION_LINK_CLASS } from "./MoreLink";
import { PostMeta } from "@/lib/mdx";
import { ProjectMeta } from "@/lib/projects";

interface SocialLink {
  href: string;
  text: string;
  icon?: typeof AtIcon;
}

interface HomeContentProps {
  recentPosts: PostMeta[];
  recentProjects: ProjectMeta[];
  locale: string;
}

export default function HomeContent({ recentPosts, recentProjects, locale }: HomeContentProps) {
  const t = useTranslations();

  const socialLinks = t.raw("socialLinks") as SocialLink[];

  const socialLinksWithIcons: SocialLink[] = socialLinks.map((link) => {
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

  return (
    <div className="flex min-h-svh w-full flex-col justify-center-safe">
      <div className="mx-auto grid w-full max-w-home grid-cols-1 gap-home-sections px-4 pt-home-pad-y pb-home-pad-bottom lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-24 lg:px-16">
        <aside className="flex flex-col gap-home-sections">
          {/* Controls, name and phrase */}
          <div className="animate-5 flex flex-col gap-home-stack">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 lg:gap-4">
                <a href={t("curriculumPdf")} download className={PILL_LINK_CLASS}>
                  <Pill variant="tint">
                    <DownloadSimpleIcon size={16} />
                    {t("curriculumTitle")}
                  </Pill>
                </a>
                <span className="font-mono text-footnote/5 text-label-3 tabular-nums">v{version}</span>
              </div>
              <HeaderControls locale={locale} />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="m-0 text-home-name font-bold text-balance">{t("title")}</h1>
              <p className="m-0 max-w-[30ch] text-home-lead text-balance text-label-2">{t("description")}</p>
            </div>
          </div>

          {/* Experience */}
          <div className="animate-7">
            <ExperienceSection locale={locale} />
          </div>

          {/* Blog */}
          <section className="animate-10 flex flex-col gap-1">
            <Link href="/blog" className={SECTION_LINK_CLASS}>
              <NotePencilIcon size={15} />
              <span>{t("blogTitle")}</span>
              <ArrowRightIcon size={13} />
            </Link>

            <div className="flex flex-col gap-2 rounded-card bg-surface p-2 shadow-card">
              {recentPosts.map((post) => {
                const [year, month, day] = post.date.split("-");
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${year}/${month}/${day}/${post.slug}`}
                    className="flex flex-col gap-1 rounded-inner p-3 transition-[background-color,transform] hover:bg-surface-2 active:scale-98"
                  >
                    <span className="font-mono text-footnote text-label-3 tabular-nums">
                      {new Date(post.date + "T00:00:00").toLocaleDateString(localeDateString(locale), {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-headline font-semibold text-balance">{post.title}</span>
                  </Link>
                );
              })}
            </div>

            <Link href="/blog" className={`${MORE_LINK_CLASS} self-start`}>
              <MoreLinkContent>{t("seeMorePosts")}</MoreLinkContent>
            </Link>
          </section>

          {/* Social Links */}
          <section className="animate-15 flex flex-col gap-1">
            <a
              href="https://links.otaviorossoni.com"
              target="_blank"
              rel="noopener noreferrer"
              className={SECTION_LINK_CLASS}
            >
              <UserIcon size={15} />
              <span>{t("socialTitle")}</span>
              <ArrowRightIcon size={13} />
            </a>

            <div className="flex flex-wrap gap-x-2">
              {socialLinksWithIcons.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PILL_LINK_CLASS}
                >
                  <Pill>
                    {link.icon && <link.icon size={16} />}
                    {link.text}
                  </Pill>
                </a>
              ))}
            </div>
          </section>
        </aside>

        {/* Projects */}
        <section className="animate-7 flex flex-col gap-1">
          <div className="flex h-hit items-center">
            <Link href="/projects" className={SECTION_LINK_CLASS}>
              <CodeIcon size={15} />
              <span>{t("projectsTitle")}</span>
              <ArrowRightIcon size={13} />
            </Link>
          </div>

          <div className="flex flex-col gap-home-card-gap">
            {recentProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} showDuration={false} />
            ))}
          </div>

          <Link href="/projects" className={`${MORE_LINK_CLASS} mt-1 self-start`}>
            <MoreLinkContent>{t("seeOlderProjects")}</MoreLinkContent>
          </Link>
        </section>
      </div>
    </div>
  );
}
