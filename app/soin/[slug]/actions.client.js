// app/soin/[slug]/Actions.client.js
'use client'

import { useSession } from 'next-auth/react'
import { useRouter }  from 'next/navigation'

export default function SoinPageActions({ slug }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // only show for logged in admin
  if (status !== 'authenticated' || session.user.role !== 'admin') {
    return null
  }

  const handleDelete = async () => {
    if (!confirm('Supprimer ce soin ?')) return
    const res = await fetch(`/api/soins/${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      const { message } = await res.json().catch(() => ({ message: 'Erreur' }))
      alert(message)
      return
    }
    alert('Soin supprimé')
    router.push('/admin/soins')
  }

  return (
    <div className="flex space-x-4 mt-6">
      <button
        onClick={() => router.push(`/admin/soins/${slug}/edit`)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Modifier ce soin
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Supprimer ce soin
      </button>
    </div>
  )
}
