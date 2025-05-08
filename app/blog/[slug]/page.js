// app/blog/[slug]/page.js
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { connectDb } from '../../../lib/db.mjs';
import Post from '../../../models/Post.mjs';

export default async function PostPage(props) {
  const { slug } = await Promise.resolve(props.params); // ✅ Next 15 safe

  await connectDb();
  const post = await Post.findOne({ slug });

  if (!post) return notFound();

  return (
    <article className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={450}
          className="w-full mb-6 object-cover rounded"
        />
      )}
      <div className="prose prose-lg">
        <p className="text-gray-700">{post.description}</p>
        {/* Ajoutez ici le contenu complet si vous enregistrez un champ `content` */}
      </div>
    </article>
  );
}
