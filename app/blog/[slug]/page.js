// app/blog/[slug]/page.js
import { notFound }   from 'next/navigation';
import Link           from 'next/link';
import { connectDb }  from '../../../lib/db.mjs';
import Post           from '../../../models/Post.mjs';
import BlogPageClient from './page.client';

export const runtime = 'nodejs';

export async function generateMetadata({ params }) {
  // ⚠️ Next.js 15 : params est un Promise
  const { slug } = await params;
  await connectDb();
  const post = await Post.findOne({ slug });
  return { title: post?.title || 'Post non trouvé' };
}

export default async function PostPage({ params }) {
  // ⚠️ Next.js 15 : attendre params avant destructuration
  const { slug } = await params;

  await connectDb();
  const post = await Post.findOne({ slug });
  if (!post) return notFound();

  const data = JSON.parse(JSON.stringify(post));

  return (
    <article className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-lg"
        />
      )}
      <div className="prose prose-lg">
        <p>{post.description}</p>
      </div>

      <div className="flex space-x-4">
        <Link
          href={`/blog/${encodeURIComponent(slug)}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Modifier
        </Link>
        <BlogPageClient slug={slug} />
      </div>
    </article>
  );
}
