// app/admin/page.js
'use client'

import { useEffect, useState } from 'react'
import { useSession }          from 'next-auth/react'
import { useRouter }           from 'next/navigation'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [soins, setSoins] = useState([])
  const [error, setError] = useState('')

  // Si pas admin, on redirige vers la connexion
  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.replace('/auth/signin')
    }
  }, [session, status, router])

  // Récupère posts et soins en tant qu’admin
  useEffect(() => {
    if (session?.user?.role !== 'admin') return

    fetch('/api/posts')
      .then(r => r.ok ? r.json() : Promise.reject(`Posts: ${r.status}`))
      .then(setPosts)
      .catch(err => {
        console.error(err)
        setError('Impossible de charger les posts')
      })

    fetch('/api/soins')
      .then(r => r.ok ? r.json() : Promise.reject(`Soins: ${r.status}`))
      .then(setSoins)
      .catch(err => {
        console.error(err)
        setError('Impossible de charger les soins')
      })
  }, [session])

  if (status === 'loading' || !session || session.user?.role !== 'admin') {
    return <p className="p-8">Chargement...</p>
  }

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Interface Admin</h1>
      {error && <p className="text-red-600">{error}</p>}

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Posts</h2>
          <button
            onClick={() => router.push('/admin/posts/new')}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Nouveau post
          </button>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <li key={post._id} className="border rounded p-4">
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{post.category}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/posts/${post.slug}/edit`)}
                  className="text-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={async () => {
                    await fetch(`/api/posts/${encodeURIComponent(post.slug)}`, { method: 'DELETE' })
                    setPosts(prev => prev.filter(p => p.slug !== post.slug))
                  }}
                  className="text-red-600"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Soins</h2>
          <button
            onClick={() => router.push('/admin/soins/new')}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Nouveau soin
          </button>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {soins.map(soin => (
            <li key={soin._id} className="border rounded p-4">
              <h3 className="font-semibold mb-2">{soin.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{soin.category}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/soins/${soin.slug}/edit`)}
                  className="text-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={async () => {
                    await fetch(`/api/soins/${encodeURIComponent(soin.slug)}`, { method: 'DELETE' })
                    setSoins(prev => prev.filter(s => s.slug !== soin.slug))
                  }}
                  className="text-red-600"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
