// app/soin/[slug]/page.client.js
'use client'

import { useRouter } from 'next/navigation'

export default function SoinPageClient({ slug }) {
  const router = useRouter()

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
    router.push('/soin')
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Supprimer ce soin
    </button>
  )
}
