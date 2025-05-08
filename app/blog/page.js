import Link  from 'next/link';
import Image from 'next/image';
import { connectDb } from '../../lib/db.mjs';
import Post          from '../../models/Post.mjs';

export default async function BlogPage() {
  // 1) connect to Mongo
  await connectDb();

  // 2) fetch posts, most recent first
  const posts = await Post.find().sort({ createdAt: -1 });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li
            key={post._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              {/* Cover image (if any) */}
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {post.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
