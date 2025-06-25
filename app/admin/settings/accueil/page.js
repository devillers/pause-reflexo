//app/admin/settings/accueil/page.js

"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function SettingsPageAccueil() {
  const [data, setData] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  // Les clés EXACTES du modèle mongoose
  const [form, setForm] = useState({
    heroTitleLine1: "",
    heroTitleLine2: "",
    heroTitleLine3: "",
    heroTitleLine4: "",
    heroTitleLine5: "",
    heroImageUrl: "",
    subTitle1: "",
    subTitle2: "",
    subTitle3: "",
    aboutTitle: "",
    aboutParagraphs: [],
  });

  // ----- Chargement depuis l'API -----
  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/accueil-data", { cache: "no-store" });
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      const doc = await res.json();

      setData(doc);
      setForm({
        heroTitleLine1: doc.heroTitleLine1 || "",
        heroTitleLine2: doc.heroTitleLine2 || "",
        heroTitleLine3: doc.heroTitleLine3 || "",
        heroTitleLine4: doc.heroTitleLine4 || "",
        heroTitleLine5: doc.heroTitleLine5 || "",
        heroImageUrl: doc.heroImageUrl || "",
        subTitle1: doc.subTitle1 || "",
        subTitle2: doc.subTitle2 || "",
        subTitle3: doc.subTitle3 || "",
        aboutTitle: doc.aboutTitle || "",
        aboutParagraphs: Array.isArray(doc.aboutParagraphs) ? doc.aboutParagraphs : [],
      });
      setHeroImagePreview(doc.heroImageUrl || "");
    } catch (error) {
      console.error("❌ Erreur chargement accueil:", error);
      setData(null);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ----- Dropzone -----
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setHeroImagePreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, newHeroImage: file }));
    },
  });

  // ----- Handlers -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = new FormData();
    for (const key in form) {
      if (Array.isArray(form[key])) {
        form[key].forEach((val, i) => body.append(`${key}[${i}]`, val));
      } else {
        body.append(key, form[key]);
      }
    }

    const res = await fetch("/api/admin/update-accueil", {
      method: "POST",
      body,
    });

    if (res.ok) {
      alert("✅ Données mises à jour !");
      await loadData();
    } else {
      alert("❌ Erreur lors de la mise à jour.");
    }
  };

  const addParagraph = () => {
    setForm((prev) => ({
      ...prev,
      aboutParagraphs: [...prev.aboutParagraphs, ""],
    }));
  };

  const removeParagraph = (index) => {
    setForm((prev) => ({
      ...prev,
      aboutParagraphs: prev.aboutParagraphs.filter((_, i) => i !== index),
    }));
  };

  const updateParagraph = (index, value) => {
    const updated = [...form.aboutParagraphs];
    updated[index] = value;
    setForm((prev) => ({ ...prev, aboutParagraphs: updated }));
  };

  if (data === null)
    return <p className="p-6 text-red-500">❌ chargement en cours</p>;

  // ---------- Rendu ----------
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Modifier l'accueil</h1>
      {/* Hero Titles */}
      <div className="bg-white rounded p-6 shadow space-y-4">
        <h2 className="font-semibold">Lignes de titre</h2>
        {[1, 2, 3, 4, 5].map((n) => (
          <input
            key={n}
            name={`heroTitleLine${n}`}
            value={form[`heroTitleLine${n}`] || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
            placeholder={`Ligne ${n}`}
          />
        ))}
        {/* Image Hero */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Image actuelle</h3>
          {heroImagePreview && (
            <Image
              src={heroImagePreview}
              alt="Hero"
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
      </div>

      {/* Section Sous-titres */}
      <section className="bg-white rounded p-4 shadow space-y-2">
        <h2 className="text-lg font-semibold mb-2">Sous-titres</h2>
        <input
          name="subTitle1"
          value={form.subTitle1}
          onChange={handleChange}
          placeholder="Sous-titre 1"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="subTitle2"
          value={form.subTitle2}
          onChange={handleChange}
          placeholder="Sous-titre 2"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="subTitle3"
          value={form.subTitle3}
          onChange={handleChange}
          placeholder="Sous-titre 3"
          className="w-full p-2 border rounded text-sm"
        />
      </section>

      {/* Section Qui suis-je */}
      <section className="bg-white rounded p-4 shadow space-y-2">
        <h2 className="text-lg font-semibold mb-2">Présentation</h2>
        <input
          name="aboutTitle"
          value={form.aboutTitle}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full p-2 border rounded text-sm"
        />
        {form.aboutParagraphs.map((p, idx) => (
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
            >
              X
            </button>
          </div>
        ))}
        <button onClick={addParagraph} className="mt-2 text-sm text-[#009992]">
          + Ajouter un paragraphe
        </button>
      </section>

      <button
        onClick={handleSubmit}
        className="bg-[#009992] text-white px-6 py-2 rounded hover:bg-[#007c78]"
      >
        Enregistrer les modifications
      </button>
    </div>
  );
}
