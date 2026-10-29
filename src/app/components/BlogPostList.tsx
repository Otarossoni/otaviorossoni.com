"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PostMeta } from "@/lib/mdx";
import { getPaginatedPosts } from "@/lib/actions";
import { localeDateString } from "@/lib/locale";
import { MORE_LINK_CLASS, MoreLinkContent } from "./MoreLink";

interface BlogPostListProps {
  initialPosts: PostMeta[];
  hasMore: boolean;
  locale: string;
}

export default function BlogPostList({ initialPosts, hasMore, locale }: BlogPostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMore] = useState(hasMore);
  const t = useTranslations();

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;

    const result = await getPaginatedPosts(locale, nextPage);

    setPosts(result.posts);
    setCurrentPage(nextPage);
    setHasMore(result.hasMore);
    setLoading(false);
  };

  const dateLocale = localeDateString(locale);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 rounded-card bg-surface p-2 shadow-card">
        {posts.map((post) => {
          const [year, month, day] = post.date.split("-");
          return (
            <Link
              key={post.slug}
              href={`/blog/${year}/${month}/${day}/${post.slug}`}
              className="flex flex-col gap-1 rounded-inner p-3 transition-[background-color,transform] hover:bg-surface-2 active:scale-98"
            >
              <span className="font-mono text-footnote text-label-3 tabular-nums">
                {new Date(post.date + "T00:00:00").toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-title-3 font-bold text-balance">{post.title}</span>
              {post.description && (
                <span className="text-description text-pretty text-label-2">{post.description}</span>
              )}
            </Link>
          );
        })}
      </div>

      {hasMorePosts && (
        <button type="button" onClick={handleLoadMore} disabled={loading} className={`${MORE_LINK_CLASS} self-start`}>
          <MoreLinkContent>{loading ? t("loading") : t("loadMore")}</MoreLinkContent>
        </button>
      )}
    </div>
  );
}
