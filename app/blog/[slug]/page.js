// app/blog/[slug]/page.js
import { notFound } from "next/navigation";

import { connectDb } from "../../../lib/db.mjs";
import Post from "../../../models/Post.mjs";
import PostPageActions from "./actions.client";

export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  // Next.js 15 : params est un Promise
  const { slug } = await params;
  await connectDb();
  const post = await Post.findOne({ slug });
  return { title: post?.title || "Post non trouvé" };
}

export default async function PostPage({ params }) {
  // Next.js 15 : attendre params avant destructuration
  const { slug } = await params;

  await connectDb();
  const post = await Post.findOne({ slug });
  if (!post) return notFound();

  return (
    <>
      <section
        className="relative h-[540px] bg-cover bg-center"
        style={{ backgroundImage: `url(${post.image || "/images/blog.webp"})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />

        {/* Text content */}
        <div className="relative z-20 max-w-[660px]  h-full flex items-center p-6">
          <h1 className="text-4xl md:text-6xl text-white font-bold uppercase">
            {post.title}
          </h1>
        </div>
      </section>

    <article className="p-8 max-w-3xl mx-auto space-y-6">
<div
  className="prose prose-lg text-justify max-w-none"
  dangerouslySetInnerHTML={{
    __html: post.description
      .replace(/\n/g, '<br />')
      .replace(/- (.+)/g, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)+/g, match => `<ul>${match}</ul>`)
  }}
/>

  {/* Ces boutons n’apparaissent que pour un admin connecté */}
  <PostPageActions slug={slug} />
</article>

    </>
  );
}
