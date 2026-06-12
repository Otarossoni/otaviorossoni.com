import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import BlogLayout from '../../components/BlogLayout';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const { data, content } = getPostBySlug(slug);

  return (
    <BlogLayout breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: data.title }]}>
      <article className="prose prose-invert max-w-none">
        <h1 className="text-5xl font-extrabold mb-4">{data.title}</h1>
        <p className="text-neutral-500 mb-8">
          {new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </article>
    </BlogLayout>
  );
}
