// app/blog/[slug]/page.client.js
'use client'

import { useRouter } from 'next/navigation'

export default function BlogPageClient({ slug }) {
  const router = useRouter()

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
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Supprimer ce post
    </button>
  )
}
