// app/admin/settings/blog/page.js


"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function SettingsPageBlog() {
  const [data, setData] = useState(null);
  const [headerImagePreview, setHeaderImagePreview] = useState(null);

  // Form state (doit correspondre au schéma BlogSettings côté back)
  const [form, setForm] = useState({
    headerImageUrl: "",
    title: "",
    subtitle: "",
    paragraphs: [],
  });

  // ----- Charger les données existantes -----
  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/blog/get", { cache: "no-store" });
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      const doc = await res.json();

      setData(doc);
      setForm({
        headerImageUrl: doc.headerImageUrl || "",
        title: doc.title || "",
        subtitle: doc.subtitle || "",
        paragraphs: Array.isArray(doc.paragraphs) ? doc.paragraphs : [],
      });
      setHeaderImagePreview(doc.headerImageUrl || "");
    } catch (error) {
      console.error("❌ Erreur chargement blog settings:", error);
      setData(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ----- Dropzone pour l'image header -----
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploadCoudinary", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, headerImageUrl: url }));
      setHeaderImagePreview(url);
    } else {
      alert("Erreur upload image");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      await handleImageUpload(file);
    },
  });

  // ----- Handlers form -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/blog/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Données blog mises à jour !");
      await loadData();
    } else {
      alert("❌ Erreur lors de la mise à jour du blog.");
    }
  };

  const addParagraph = () => {
    setForm((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));
  };

  const removeParagraph = (index) => {
    setForm((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  const updateParagraph = (index, value) => {
    const updated = [...form.paragraphs];
    updated[index] = value;
    setForm((prev) => ({ ...prev, paragraphs: updated }));
  };

  if (data === null)
    return <p className="p-6 text-red-500">❌ chargement en cours</p>;

  // ---------- Rendu ----------
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Paramètres du blog</h1>
      {/* Header image */}
      <div className="bg-white rounded p-6 shadow space-y-4">
        <h2 className="font-semibold">Image d’en-tête</h2>
        {headerImagePreview && (
          <Image
            src={headerImagePreview}
            alt="Header Blog"
            width={600}
            height={300}
            priority
            className="rounded h-auto"
          />
        )}
        <div
          {...getRootProps()}
          className="mt-4 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-600">
            Déposez une nouvelle image ici ou cliquez
          </p>
        </div>
      </div>

      {/* Titre et sous-titre */}
      <section className="bg-white rounded p-4 shadow space-y-2">
        <h2 className="text-lg font-semibold mb-2">Textes</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre du blog"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Sous-titre"
          className="w-full p-2 border rounded text-sm"
        />
      </section>

      {/* Paragraphes */}
      <section className="bg-white rounded p-4 shadow space-y-2">
        <h2 className="text-lg font-semibold mb-2">Paragraphes</h2>
        {form.paragraphs.map((p, idx) => (
          <div key={idx} className="flex gap-2">
            <textarea
              value={p}
              onChange={(e) => updateParagraph(idx, e.target.value)}
              className="w-full p-2 border rounded text-sm"
              rows={2}
            />
            <button
              onClick={() => removeParagraph(idx)}
              className="text-red-500 font-bold"
              type="button"
            >
              X
            </button>
          </div>
        ))}
        <button onClick={addParagraph} className="mt-2 text-sm text-[#009992]" type="button">
          + Ajouter un paragraphe
        </button>
      </section>

      <button
        onClick={handleSubmit}
        className="bg-[#009992] text-white px-6 py-2 rounded hover:bg-[#007c78]"
        type="button"
      >
        Enregistrer les modifications
      </button>
    </div>
  );
}
