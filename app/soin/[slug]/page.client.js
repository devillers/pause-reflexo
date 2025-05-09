// app/soin/[slug]/page.client.js
'use client';

import { useRouter } from 'next/navigation';

export default function SoinPageClient({ soin }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm('Supprimer ce soin ?')) return;
    const res = await fetch(`/api/soins/${soin.slug}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur' }));
      alert(err.message);
      return;
    }
    alert('Supprimé');
    router.push('/soin');
  };
  return (
    <button
      onClick={handleDelete}
      className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
    >
      Supprimer ce soin
    </button>
  );
}
