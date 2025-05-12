// app/blog/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
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
      <section className="relative">
        <div
          className="relative z-10 mx-auto justify-center flex flex-col min-h-[540px] p-6 bg-cover bg-center"
          style={{
            backgroundImage: `url(${post.image || "/images/blog.webp"})`,
          }}
        >
          <h1 className="text-4xl font-bold">{post.title}</h1>
        </div>
      </section>
      <article className="p-8 max-w-3xl mx-auto space-y-6">
        <div className="prose prose-lg">
          <p>{post.description}</p>
        </div>

        {/* Ces boutons n’apparaissent que pour un admin connecté */}
        <PostPageActions slug={slug} />
      </article>
    </>
  );
}
