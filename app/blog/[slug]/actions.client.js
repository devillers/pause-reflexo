// app/blog/[slug]/actions.client.js
'use client'

import { useSession } from 'next-auth/react'
import { useRouter }  from 'next/navigation'

export default function PostPageActions({ slug }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status !== 'authenticated' || session.user.role !== 'admin') {
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
      <button
        onClick={() => router.push(`/admin/posts/${slug}/edit`)}
         className="cursor-pointer  inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset"
      >
        Modifier ce post
      </button>
      <button
        onClick={handleDelete}
         className="cursor-pointer  inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-700/10 ring-inset"
      >
        Supprimer ce post
      </button>
    </div>
  )
}
