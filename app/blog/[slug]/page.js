//app/blog/[slug]/page.js

import { notFound } from "next/navigation";
import { connectDb } from "../../../lib/db.mjs";
import Post from "../../../models/Post.mjs";
import PostPageActions from "./actions.client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // pour autoriser HTML dans markdown si nécessaire

export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDb();
  const post = await Post.findOne({ slug });
  return { title: post?.title || "Post non trouvé" };
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  await connectDb();
  const post = await Post.findOne({ slug });
  if (!post) return notFound();

  return (
    <>
      <section
        className="relative h-[640px] bg-cover bg-center"
        style={{ backgroundImage: `url(${post.image || "/images/blog.webp"})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />
        <div className="relative z-20 max-w-[660px] h-full flex items-center p-6">
          <h1 className="text-4xl md:text-6xl text-white font-bold uppercase">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="p-8 max-w-4xl mx-auto space-y-6">
        <h3 className="text-4xl font-thin uppercase mb-4">
          {post.second_title || "Un titre secondaire"}
        </h3>

        <div className="prose prose-lg max-w-none text-justify text-[14px] text-gray-800 line-height-7">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]} // support HTML dans le contenu markdown
          >
            {post.description}
          </ReactMarkdown>
        </div>

        <PostPageActions slug={slug} />
      </article>
    </>
  );
}
