// app/blog/[slug]/page.js
import { notFound }   from 'next/navigation'
import Link           from 'next/link'
import { connectDb }  from '../../../lib/db.mjs'
import Post           from '../../../models/Post.mjs'
import PostPageActions from './actions.client'

export const runtime = 'nodejs'

export async function generateMetadata({ params }) {
  // Next.js 15 : params est un Promise
  const { slug } = await params
  await connectDb()
  const post = await Post.findOne({ slug })
  return { title: post?.title || 'Post non trouvé' }
}

export default async function PostPage({ params }) {
  // Next.js 15 : attendre params avant destructuration
  const { slug } = await params

  await connectDb()
  const post = await Post.findOne({ slug })
  if (!post) return notFound()

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

      {/* Ces boutons n’apparaissent que pour un admin connecté */}
      <PostPageActions slug={slug} />
    </article>
  )
}
