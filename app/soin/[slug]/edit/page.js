// app/soin/[slug]/edit/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

function makeSlug(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EditSoinPage() {
  const router = useRouter();
  const { slug } = useParams();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    slug: '',
    prix: '',
    duree: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/soins/${encodeURIComponent(slug)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setForm({
          title: data.title,
          description: data.description,
          category: data.category || '',
          slug: data.slug,
          prix: data.prix || '',
          duree: data.duree || ''
        });
        setPreview(data.image || '');
      })
      .catch(() => alert('Impossible de charger'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleFile = e => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(f);
    } else setPreview('');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('category', form.category);
    fd.append('slug', makeSlug(form.slug));
    fd.append('prix', form.prix);
    fd.append('duree', form.duree);
    if (file) fd.append('file', file);

    const res = await fetch(`/api/soins/${encodeURIComponent(slug)}`, { method: 'PATCH', body: fd });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur serveur' }));
      alert(err.message);
      return;
    }
    router.push(`/soin/${makeSlug(form.slug)}`);
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-xl mx-auto space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" required className="w-full p-2 border" />
      <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" required className="w-full p-2 border" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Catégorie" className="w-full p-2 border" />
      <input name="prix" value={form.prix} onChange={handleChange} placeholder="Prix (ex. 50€)" className="w-full p-2 border" />
      <input name="duree" value={form.duree} onChange={handleChange} placeholder="Durée (ex. 1h)" className="w-full p-2 border" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border" />

      <div>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleFile} className="block" />
        {preview && <img src={preview} alt="Aperçu" className="mt-2 w-full rounded" />}
      </div>

      <button type="submit" className="px-4 py-2 bg-black text-white">Mettre à jour</button>
    </form>
  );
}
