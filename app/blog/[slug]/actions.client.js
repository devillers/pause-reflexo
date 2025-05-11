// app/blog/[slug]/actions.client.js
'use client'

import { useSession } from 'next-auth/react'
import { useRouter }  from 'next/navigation'
import Link           from 'next/link'

export default function PostPageActions({ slug }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // si on n’est pas admin, on n’affiche rien
  if (status === 'loading' || session?.user?.role !== 'admin') {
    return null
  }

  const handleDelete = async () => {
    if (!confirm('Supprimer ce post ?')) return
    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({ message: 'Erreur' }))
      alert(message)
      return
    }
    alert('Post supprimé')
    router.push('/admin/posts')
  }

  return (
    <div className="flex space-x-4 mt-6">
      <Link
        href={`/admin/posts/${encodeURIComponent(slug)}/edit`}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Modifier ce post
      </Link>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Supprimer ce post
      </button>
    </div>
  )
}
