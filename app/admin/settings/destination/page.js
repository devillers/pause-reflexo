//app/admin/settings/destination/page.js

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
  const method = isEditing ? "PUT" : "POST";
  const url = isEditing ? `/api/destination/${form.slug}` : "/api/destination";
  const formToSave = {
    ...form,
    dateDebut: form.dateDebut ? new Date(form.dateDebut) : null,
    dateFin: form.dateFin ? new Date(form.dateFin) : null,
  };
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
      dateDebut: sejour.dateDebut ? sejour.dateDebut.slice(0, 10) : "",
      dateFin: sejour.dateFin ? sejour.dateFin.slice(0, 10) : "",
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

  if (loading) return <p className="p-6 text-gray-500">Chargement…</p>;

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
        setSelected={setSelected}
      />
    </div>
  );
}
