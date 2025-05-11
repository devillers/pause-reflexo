'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSoinsPage() {
  const router = useRouter();
  const [soins, setSoins] = useState([]);

  useEffect(() => {
    fetch('/api/soins')
      .then(r => r.json())
      .then(setSoins)
      .catch(() => alert('Impossible de charger les soins'));
  }, []);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tous les soins</h1>
        <button
          onClick={() => router.push('/admin/soins/new')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Créer un soin
        </button>
      </div>

      <ul className="space-y-4">
        {soins.map(soin => (
          <li key={soin._id} className="border rounded p-4 flex justify-between">
            <div>
              <h2 className="font-semibold">{soin.title}</h2>
              <p className="text-sm text-gray-600">Catégorie : {soin.category || '—'}</p>
              {soin.prix && <p className="text-sm text-gray-600">Prix : {soin.prix}</p>}
              {soin.duree && <p className="text-sm text-gray-600">Durée : {soin.duree}</p>}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push(`/admin/soins/${soin.slug}/edit`)}
                className="text-blue-600 hover:underline"
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!confirm('Supprimer ce soin ?')) return;
                  await fetch(`/api/soins/${soin.slug}`, { method: 'DELETE' });
                  setSoins(soins.filter(s => s.slug !== soin.slug));
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
