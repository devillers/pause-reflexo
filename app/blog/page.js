// app/blog/page.js
import Link         from 'next/link';
import Image        from 'next/image';
import { connectDb } from '../../lib/db.mjs';
import Post          from '../../models/Post.mjs';

export default async function BlogPage() {
  // 1) connect to Mongo
  await connectDb();

  // 2) fetch posts, sorted by category then date
  const posts = await Post.find()
    .sort({ category: 1, createdAt: -1 })
    .lean();

  // 3) group posts by category
  const byCategory = posts.reduce((acc, post) => {
    const cat = post.category || 'Non classé';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog par catégorie</h1>
      {Object.entries(byCategory).map(([category, catPosts]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {catPosts.map((post, i) => (
              <li
                key={post._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>                  
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      priority={i === 0}
                    />
                  )}

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
