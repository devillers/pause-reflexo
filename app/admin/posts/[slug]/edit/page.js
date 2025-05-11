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

export default function EditPostAdminPage() {
  const router = useRouter();
  const { slug } = useParams();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setForm({
          title: data.title,
          slug: data.slug,
          category: data.category || '',
          description: data.description,
        });
        setPreview(data.image || '');
      })
      .catch(() => alert('Impossible de charger le post'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      const f = files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(f);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('slug', makeSlug(form.slug));
    fd.append('category', form.category);
    fd.append('description', form.description);
    if (file) fd.append('file', file);

    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, {
      method: 'PATCH',
      body: fd,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur' }));
      alert(err.message);
      return;
    }
    router.push('/admin/posts');
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier le post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Titre</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Catégorie</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-1"
          />
          {preview && <img src={preview} alt="Aperçu" className="mt-2 w-full rounded" />}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Mettre à jour
        </button>
      </form>
    </main>
  );
}
