"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PostMeta } from "@/lib/mdx";
import { getPaginatedPosts } from "@/lib/actions";

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

  const dateLocale = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US";

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => {
        const [year, month, day] = post.date.split("-");
        return (
          <Link
            key={post.slug}
            href={`/blog/${year}/${month}/${day}/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 transition duration-200 ease-in-out"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold transition duration-200 ease-in-out group-hover:text-[#8A2BE2]">
                {post.title}
              </span>
              {post.description && (
                <p className="text-xs text-neutral-500">{post.description}</p>
              )}
            </div>
            <span className="text-xs text-neutral-500">
              {new Date(post.date + "T00:00:00").toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </Link>
        );
      })}

      {hasMorePosts && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="mt-4 text-xs text-neutral-500 hover:text-[#8A2BE2] transition duration-200 ease-in-out cursor-pointer bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t("loading") : t("loadMore")}
        </button>
      )}
    </div>
  );
}
