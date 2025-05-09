// app/soin/new/page.js
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

export default function NewSoinPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    slug: '',
    prix: '',
    duree: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('⤴️ Envoi FormData:', {
      title: form.title,
      slug: makeSlug(form.slug),
      category: form.category,
      prix: form.prix,
      duree: form.duree,
      hasFile: !!form.file,
    });

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('category', form.category);
    data.append('slug', makeSlug(form.slug));
    data.append('prix', form.prix);
    data.append('duree', form.duree);
    data.append('file', form.file);

    const res = await fetch('/api/soins', {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      if (res.status === 409) {
        alert(payload.message || 'Ce slug est déjà utilisé. Veuillez en choisir un autre.');
      } else {
        console.error('API error', payload);
        alert(payload.message || 'Erreur serveur');
      }
      return;
    }

    const result = await res.json();
    alert(result.message || 'Soin créé');
    router.push('/soin');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-xl mx-auto space-y-4">
      <input
        name="title"
        placeholder="Titre"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        name="slug"
        placeholder="Slug (ex. mon-titre-de-soin)"
        value={form.slug}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        name="category"
        placeholder="Catégorie"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="prix"
        placeholder="Prix (ex. 50€)"
        value={form.prix}
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="duree"
        placeholder="Durée (ex. 1h)"
        value={form.duree}
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
        required
      />
      <button type="submit" className="px-4 py-2 bg-black text-white">
        Créer le soin
      </button>
    </form>
  );
}
