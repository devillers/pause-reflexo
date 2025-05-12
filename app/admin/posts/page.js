//app/admin/posts/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPostPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setPosts)
      .catch(() => alert('Impossible de charger les posts'));
  }, []);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tous les posts</h1>
        <button
          onClick={() => router.push('/admin/posts/new')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Créer un post
        </button>
      </div>

      <ul className="space-y-4">
        {posts.map(post => (
          <li
            key={post._id}
            className="border rounded p-4 flex items-center justify-between"
          >
            {/* Left: thumbnail + info */}
            <div className="flex items-center space-x-4">
              <div className="w-24 h-16 relative flex-shrink-0">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  Catégorie : {post.category || '—'}
                </p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex gap-4">
              <button
                onClick={() => router.push(`/admin/posts/${post.slug}/edit`)}
                className="text-blue-600 hover:underline"
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!confirm('Supprimer ce post ?')) return;
                  await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' });
                  setPosts(prev => prev.filter(p => p.slug !== post.slug));
                }}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
