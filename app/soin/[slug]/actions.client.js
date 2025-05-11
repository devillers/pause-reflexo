// app/soin/[slug]/Actions.client.js
'use client'

import { useSession } from 'next-auth/react'
import { useRouter }  from 'next/navigation'

export default function SoinPageActions({ slug }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading' || !session?.user?.role || session.user.role !== 'admin') {
    return null
  }

  const handleDelete = async () => {
    if (!confirm('Supprimer ce soin ?')) return
    const res = await fetch(`/api/soins/${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur' }))
      alert(err.message)
      return
    }
    alert('Soin supprimé')
    router.push('/admin/soins')
  }

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => router.push(`/admin/soins/${encodeURIComponent(slug)}/edit`)}
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
