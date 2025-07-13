"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// ---------- HEADER GÉNÉRAL (hero de la page /destination) ----------
const emptyHero = {
  heroTitleLines: ["", ""],
  heroImage: { url: "", alt: "" },
  heroDescription: "",
  heroCtaText: "",
  heroCtaLink: "",
};

function HeaderGeneralDestinationAdmin() {
  const [hero, setHero] = useState(emptyHero);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/settings-destination/get", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setHero({ ...emptyHero, ...data });
      }
      setLoading(false);
    })();
  }, []);

  // Upload image header
  const onDrop = async (files) => {
    const file = files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setHero((prev) => ({
        ...prev,
        heroImage: { ...prev.heroImage, url },
      }));
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ accept: { "image/*": [] }, onDrop });

  async function saveHero() {
    const res = await fetch("/api/admin/settings-destination/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
    });
    if (res.ok) alert("Header enregistré !");
    else alert("Erreur sauvegarde header");
  }

  if (loading) return <p className="p-4 text-gray-500">Chargement header…</p>;

  return (
    <section className="mb-10 p-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="font-semibold text-lg mb-4">Header général de la page Destination</h2>
      {[0, 1].map((idx) => (
        <input
          key={idx}
          type="text"
          value={hero.heroTitleLines?.[idx] || ""}
          onChange={e => {
            const lines = [...(hero.heroTitleLines || ["", ""])];
            lines[idx] = e.target.value;
            setHero((h) => ({ ...h, heroTitleLines: lines }));
          }}
          placeholder={`Ligne ${idx + 1}`}
          className="w-full p-2 border rounded text-sm mb-2"
        />
      ))}
      <textarea
        value={hero.heroDescription}
        onChange={e => setHero(h => ({ ...h, heroDescription: e.target.value }))}
        placeholder="Description (optionnelle)"
        className="w-full p-2 border rounded text-sm mb-2"
        rows={2}
      />
      <input
        type="text"
        value={hero.heroCtaText}
        onChange={e => setHero(h => ({ ...h, heroCtaText: e.target.value }))}
        placeholder="Texte bouton (optionnel)"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <input
        type="text"
        value={hero.heroCtaLink}
        onChange={e => setHero(h => ({ ...h, heroCtaLink: e.target.value }))}
        placeholder="Lien bouton (optionnel)"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <input
        type="text"
        value={hero.heroImage?.alt || ""}
        onChange={e =>
          setHero(h => ({ ...h, heroImage: { ...h.heroImage, alt: e.target.value } }))
        }
        placeholder="Alt de l'image"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <div {...getRootProps()} className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded">
        <input {...getInputProps()} />
        <p className="text-sm text-gray-600">
          Déposez l’image principale ici ou cliquez
        </p>
      </div>
      {hero.heroImage?.url && (
        <div className="my-3 flex flex-col items-center gap-2">
          <Image
            src={hero.heroImage.url}
            alt={hero.heroImage.alt || ""}
            width={400}
            height={200}
            className="rounded shadow"
            style={{ objectFit: "contain", maxHeight: 200 }}
          />
          <button
            className="text-sm text-red-600 underline mt-2"
            type="button"
            onClick={() =>
              setHero((prev) => ({
                ...prev,
                heroImage: { url: "", alt: "" },
              }))
            }
          >
            Supprimer l’image
          </button>
        </div>
      )}
      <button
        onClick={saveHero}
        className="bg-[#009992] text-white px-6 py-2 rounded hover:bg-[#007c78] mt-2"
      >
        Enregistrer le header
      </button>
    </section>
  );
}

// ---------- CRUD SÉJOURS ----------
const emptySejour = {
  titre: "",
  slug: "",
  destination: "",
  prix: "",
  resume: "",
  duree: "",
  sport: "",
  niveau: "",
  description: "",
  pointsForts: [],
  heroImage: { url: "", alt: "" },
  imagesMain: [],
  imagesGallery: [],
};

export default function AdminSettingsDestination() {
  const [sejours, setSejours] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptySejour);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---- Charger tous les séjours ----
  const loadSejours = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/destination", { cache: "no-store" });
      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      setSejours(data);
    } catch (e) {
      setSejours([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSejours();
  }, []);

  // ---- Form image upload ----
  // Pour heroImage
  const onDropHero = async (files) => {
    const file = files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => ({
        ...prev,
        heroImage: { ...prev.heroImage, url },
      }));
    }
  };
  const heroDrop = useDropzone({ accept: { "image/*": [] }, onDrop: onDropHero });

  // Pour imagesMain (miniatures)
  const onDropMain = async (files) => {
    const file = files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => ({
        ...prev,
        imagesMain: [...(prev.imagesMain || []), { url, alt: "" }],
      }));
    }
  };
  const mainDrop = useDropzone({ accept: { "image/*": [] }, onDrop: onDropMain });

  // Pour imagesGallery (galerie)
  const onDropGallery = async (files) => {
    const file = files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => ({
        ...prev,
        imagesGallery: [...(prev.imagesGallery || []), { url, alt: "" }],
      }));
    }
  };
  const galleryDrop = useDropzone({ accept: { "image/*": [] }, onDrop: onDropGallery });

  // ---- Form handlers ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleHeroAltChange = (e) => {
    setForm((prev) => ({ ...prev, heroImage: { ...prev.heroImage, alt: e.target.value } }));
  };

  const handlePointFortsChange = (i, value) => {
    const updated = [...(form.pointsForts || [])];
    updated[i] = value;
    setForm((prev) => ({ ...prev, pointsForts: updated }));
  };

  // ---- Submit/save ----
  const handleSave = async () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/destination/${form.slug}` : "/api/destination";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("✅ Séjour sauvegardé");
      setForm(emptySejour);
      setIsEditing(false);
      setSelected(null);
      await loadSejours();
    } else {
      alert("Erreur lors de la sauvegarde");
    }
  };

  // ---- Edit / Delete ----
  const editSejour = (sejour) => {
    setForm({ ...emptySejour, ...sejour });
    setSelected(sejour.slug);
    setIsEditing(true);
  };
  const deleteSejour = async (slug) => {
    if (!window.confirm("Confirmer la suppression du séjour ?")) return;
    const res = await fetch(`/api/destination/${slug}`, { method: "DELETE" });
    if (res.ok) {
      await loadSejours();
      if (selected === slug) setForm(emptySejour);
    } else {
      alert("Erreur suppression séjour");
    }
  };

  // ---- Remove images ----
  const removeMainImage = (i) =>
    setForm((prev) => ({
      ...prev,
      imagesMain: prev.imagesMain.filter((_, idx) => idx !== i),
    }));
  const removeGalleryImage = (i) =>
    setForm((prev) => ({
      ...prev,
      imagesGallery: prev.imagesGallery.filter((_, idx) => idx !== i),
    }));

  // ---- Add/remove points forts ----
  const addPointFort = () =>
    setForm((prev) => ({
      ...prev,
      pointsForts: [...(prev.pointsForts || []), ""],
    }));
  const removePointFort = (i) =>
    setForm((prev) => ({
      ...prev,
      pointsForts: prev.pointsForts.filter((_, idx) => idx !== i),
    }));

  // ---- Rendu ----
  if (loading) return <p className="p-6 text-gray-500">Chargement…</p>;

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      {/* HEADER GENERAL DE LA PAGE */}
      <HeaderGeneralDestinationAdmin />

      <h1 className="text-2xl font-bold mb-4">Gestion des séjours</h1>

      {/* Liste des séjours */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="font-semibold mb-2">Séjours existants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sejours.map((s) => (
            <div key={s.slug} className="border rounded p-3 bg-gray-50 flex flex-col gap-2">
              <span className="font-bold">{s.titre}</span>
              {s.heroImage?.url && (
                <img
                  src={s.heroImage.url}
                  alt={s.heroImage.alt}
                  className="h-24 object-cover rounded"
                />
              )}
              <span className="text-xs text-gray-600">{s.destination}</span>
              <div className="flex gap-2 mt-1">
                <button
                  className="text-sm text-blue-700 underline"
                  onClick={() => editSejour(s)}
                >
                  Modifier
                </button>
                <button
                  className="text-sm text-red-700 underline"
                  onClick={() => deleteSejour(s.slug)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire création/édition */}
      <div className="bg-white rounded shadow p-6 space-y-4 max-w-2xl">
        <h2 className="font-semibold mb-2">
          {isEditing ? "Modifier le séjour" : "Ajouter un séjour"}
        </h2>
        <input
          name="titre"
          value={form.titre}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug (unique, ex: yoga-alpes)"
          className="w-full p-2 border rounded text-sm"
          disabled={isEditing}
        />
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="prix"
          value={form.prix}
          onChange={handleChange}
          placeholder="Prix (€)"
          className="w-full p-2 border rounded text-sm"
          type="number"
        />
        <input
          name="resume"
          value={form.resume}
          onChange={handleChange}
          placeholder="Résumé"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="duree"
          value={form.duree}
          onChange={handleChange}
          placeholder="Durée"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="sport"
          value={form.sport}
          onChange={handleChange}
          placeholder="Sport"
          className="w-full p-2 border rounded text-sm"
        />
        <input
          name="niveau"
          value={form.niveau}
          onChange={handleChange}
          placeholder="Niveau"
          className="w-full p-2 border rounded text-sm"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded text-sm"
          rows={3}
        />

        {/* Points forts */}
        <div>
          <label className="font-semibold mb-2">Points forts</label>
          {(form.pointsForts || []).map((pt, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                value={pt}
                onChange={(e) => handlePointFortsChange(i, e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder={`Point fort ${i + 1}`}
              />
              <button
                onClick={() => removePointFort(i)}
                type="button"
                className="text-red-600 font-bold"
              >
                X
              </button>
            </div>
          ))}
          <button
            onClick={addPointFort}
            type="button"
            className="text-sm text-[#009992]"
          >
            + Ajouter un point fort
          </button>
        </div>

        {/* Hero Image */}
        <div>
          <label className="font-semibold">Image Header (hero)</label>
          <div {...heroDrop.getRootProps()} className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded">
            <input {...heroDrop.getInputProps()} />
            <p className="text-sm text-gray-600">
              Déposez l’image principale ici ou cliquez
            </p>
          </div>
          {form.heroImage?.url && (
            <div className="mt-2 flex flex-col items-center gap-2">
              <Image
                src={form.heroImage.url}
                alt={form.heroImage.alt || ""}
                width={400}
                height={200}
                className="rounded shadow"
                style={{ objectFit: "contain", maxHeight: 200 }}
              />
              <input
                type="text"
                placeholder="Texte alternatif"
                value={form.heroImage.alt}
                onChange={handleHeroAltChange}
                className="w-full p-2 border rounded text-sm"
              />
              <button
                className="text-sm text-red-600 underline mt-2"
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    heroImage: { url: "", alt: "" },
                  }))
                }
              >
                Supprimer l’image
              </button>
            </div>
          )}
        </div>

        {/* Images miniatures */}
        <div>
          <label className="font-semibold">Images miniatures (liste)</label>
          <div {...mainDrop.getRootProps()} className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded">
            <input {...mainDrop.getInputProps()} />
            <p className="text-sm text-gray-600">
              Déposez une image miniature ici ou cliquez
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(form.imagesMain || []).map((img, i) => (
              <div key={i} className="relative">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={100}
                  height={70}
                  className="rounded shadow"
                />
                <button
                  onClick={() => removeMainImage(i)}
                  className="absolute top-0 right-0 text-red-600 bg-white rounded-full px-1"
                  type="button"
                  title="Supprimer"
                >
                  ×
                </button>
                <input
                  type="text"
                  placeholder="Texte alt"
                  value={img.alt}
                  className="block mt-1 text-xs w-full"
                  onChange={(e) =>
                    setForm((prev) => {
                      const arr = [...prev.imagesMain];
                      arr[i].alt = e.target.value;
                      return { ...prev, imagesMain: arr };
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Galerie */}
        <div>
          <label className="font-semibold">Galerie (détail)</label>
          <div {...galleryDrop.getRootProps()} className="mt-2 border-2 border-dashed p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded">
            <input {...galleryDrop.getInputProps()} />
            <p className="text-sm text-gray-600">
              Déposez une image de galerie ici ou cliquez
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(form.imagesGallery || []).map((img, i) => (
              <div key={i} className="relative">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={100}
                  height={70}
                  className="rounded shadow"
                />
                <button
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-0 right-0 text-red-600 bg-white rounded-full px-1"
                  type="button"
                  title="Supprimer"
                >
                  ×
                </button>
                <input
                  type="text"
                  placeholder="Texte alt"
                  value={img.alt}
                  className="block mt-1 text-xs w-full"
                  onChange={(e) =>
                    setForm((prev) => {
                      const arr = [...prev.imagesGallery];
                      arr[i].alt = e.target.value;
                      return { ...prev, imagesGallery: arr };
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Boutons */}
        <div className="flex mt-4">
          <button
            onClick={handleSave}
            className="bg-[#009992] text-white px-6 py-2 rounded hover:bg-[#007c78]"
            type="button"
          >
            {isEditing ? "Enregistrer les modifications" : "Créer le séjour"}
          </button>
          <button
            onClick={() => {
              setForm(emptySejour);
              setIsEditing(false);
              setSelected(null);
            }}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded border ml-4"
            type="button"
          >
            Réinitialiser le formulaire
          </button>
        </div>
      </div>
    </div>
  );
}
