// app/blog/[slug]/edit/page.js
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

export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    slug: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setForm({
          title: data.title,
          description: data.description,
          category: data.category || '',
          slug: data.slug,
        });
        setPreview(data.image || '');
      })
      .catch(() => alert('Impossible de charger la photo'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      const fileObj = files[0];
      setFile(fileObj);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(fileObj);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('category', form.category);
    fd.append('slug', makeSlug(form.slug));
    if (file) fd.append('file', file);

    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`, {
      method: 'PATCH',
      body: fd,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur serveur' }));
      alert(err.message);
      return;
    }
    router.push(`/blog/${makeSlug(form.slug)}`);
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-xl mx-auto space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Titre"
        required
        className="w-full p-2 border"
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        required
        className="w-full p-2 border"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Catégorie"
        className="w-full p-2 border"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full p-2 border"
      />

      <div>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleChange} className="block" />
        {preview && <img src={preview} alt="Aperçu" className="mt-2 w-full rounded" />}
      </div>

      <button type="submit" className="px-4 py-2 bg-black text-white">
        Mettre à jour
      </button>
    </form>
  );
}
