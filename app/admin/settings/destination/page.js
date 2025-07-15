"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import HeaderGeneralDestinationAdmin from "../../../components/adminDestination/HeaderGeneralDestinationAdmin";
import SejourList from "../../../components/adminDestination/SejourList";
import SejourForm from "../../../components/adminDestination/SejourForm";

// Schéma vide du séjour
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
  dateDebut: "",
  dateFin: "",
  capacity: 0, // Capacité d'accueil (nombre !)
  pointsForts: [],
  heroImage: { url: "", alt: "" },
  imagesMain: [],
  imagesGallery: [],
  programmeDescriptif: "",
  programme: [],
  hebergementTitre: "",
  hebergementDescriptif: "",
  hebergementPointsForts: [],
  hebergementImages: [],
  sportDescriptif: "",
  encadrementSportif: "",
  niveauExplication: "",
  ageMini: "",
  prixDetail: { inclus: [], nonInclus: [], options: [] },
  aNoterText: "",
};

export default function AdminSettingsDestination() {
  const [sejours, setSejours] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptySejour);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Upload image vers Cloudinary et renvoie l'URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploadCloudinary", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      alert("Erreur lors de l'upload de l'image");
      return null;
    }
    const { url } = await res.json();
    return url;
  };

  // ---------- Handlers Images ----------
  const onDropHero = async (files) => {
    if (!files[0]) return;
    const url = await uploadImage(files[0]);
    if (url) {
      setForm((prev) => ({
        ...prev,
        heroImage: { ...prev.heroImage, url },
      }));
    }
  };

  const handleHeroAltChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      heroImage: { ...prev.heroImage, alt: value },
    }));
  };

  const onRemoveHeroImage = () => {
    setForm((prev) => ({ ...prev, heroImage: { url: "", alt: "" } }));
  };

  const onDropMain = async (files) => {
    const uploads = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) uploads.push({ url, alt: "" });
    }
    if (uploads.length > 0) {
      setForm((prev) => ({
        ...prev,
        imagesMain: [...(prev.imagesMain || []), ...uploads],
      }));
    }
  };

  const removeMainImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      imagesMain: prev.imagesMain.filter((_, i) => i !== idx),
    }));
  };

  const onDropGallery = async (files) => {
    const uploads = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) uploads.push({ url, alt: "" });
    }
    if (uploads.length > 0) {
      setForm((prev) => ({
        ...prev,
        imagesGallery: [...(prev.imagesGallery || []), ...uploads],
      }));
    }
  };

  const removeGalleryImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      imagesGallery: prev.imagesGallery.filter((_, i) => i !== idx),
    }));
  };

  // ---------- Reset du formulaire ----------
  const handleReset = () => {
    setForm(emptySejour);
    setIsEditing(false);
    setSelected(null);
  };

  // Charger tous les séjours
  const loadSejours = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/destination", { cache: "no-store" });
      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      setSejours(data);
    } catch {
      setSejours([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSejours();
  }, []);

  // CRUD actions
  const handleSave = async () => {
    if (!form.heroImage?.url) {
      alert("⚠️ Merci d’ajouter une image principale (hero) !");
      return;
    }
    if (!form.titre?.trim()) {
      alert("⚠️ Merci de renseigner un titre de séjour !");
      return;
    }
    if (!form.capacity || isNaN(form.capacity) || form.capacity < 1) {
      alert("⚠️ Merci de renseigner une capacité d'accueil valide !");
      return;
    }
    if (!form.dateDebut || !form.dateFin) {
      alert("⚠️ Merci de renseigner les dates de début et fin !");
      return;
    }

    // Conversion capacité en number (sécurité)
    const formToSave = {
      ...form,
      capacity: Number(form.capacity),
      dateDebut: form.dateDebut ? new Date(form.dateDebut).toISOString() : null,
      dateFin: form.dateFin ? new Date(form.dateFin).toISOString() : null,
    };

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/destination/${form.slug}` : "/api/destination";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToSave),
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

  const editSejour = (sejour) => {
    setForm({
      ...emptySejour,
      ...sejour,
      dateDebut: sejour.dateDebut
        ? sejour.dateDebut.slice(0, 10)
        : "",
      dateFin: sejour.dateFin
        ? sejour.dateFin.slice(0, 10)
        : "",
      capacity: sejour.capacity ?? 0,
    });
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

  if (loading)
    return <p className="p-6 text-gray-500">Chargement…</p>;

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      <HeaderGeneralDestinationAdmin />
      <h1 className="text-2xl font-bold mb-4">Gestion des séjours</h1>

      <SejourList
        sejours={sejours}
        editSejour={editSejour}
        deleteSejour={deleteSejour}
      />

      <SejourForm
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        emptySejour={emptySejour}
        handleSave={handleSave}
        handleReset={handleReset}
        onDropHero={onDropHero}
        handleHeroAltChange={handleHeroAltChange}
        onRemoveHeroImage={onRemoveHeroImage}
        onDropMain={onDropMain}
        removeMainImage={removeMainImage}
        onDropGallery={onDropGallery}
        removeGalleryImage={removeGalleryImage}
        setSelected={setSelected}
      />
    </div>
  );
}
