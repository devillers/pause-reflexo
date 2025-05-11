// app/admin/posts/new/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function makeSlug(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function NewAdminPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    file: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(f => ({ ...f, file: files[0] }));
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
    if (form.file) fd.append('file', form.file);

    const res = await fetch('/api/posts', { method: 'POST', body: fd });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur serveur' }));
      alert(err.message);
      return;
    }
    router.push('/admin/posts');
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer un nouveau post</h1>
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
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Créer le post
        </button>
      </form>
    </main>
  );
}
