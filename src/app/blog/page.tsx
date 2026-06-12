import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import BlogLayout from '../components/BlogLayout';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <BlogLayout breadcrumbs={[{ label: "Blog" }]}>
      <h1 className="text-5xl font-extrabold mb-8">Blog</h1>
      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex justify-between items-start gap-4 py-3 border-b border-neutral-800 transition duration-200 ease-in-out hover:border-neutral-500"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-semibold transition duration-200 ease-in-out group-hover:text-[#8A2BE2]">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-xs text-neutral-500">{post.description}</p>
              )}
            </div>
            <span className="text-xs text-neutral-500 whitespace-nowrap">
              {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </Link>
        ))}
      </div>
    </BlogLayout>
  );
}
