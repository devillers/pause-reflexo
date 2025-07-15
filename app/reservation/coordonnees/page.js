"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ReservationCoordonnees() {
  const params = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({ nom: "", prenom: "", email: "" });

  const handleNext = () => {
    if (!form.nom || !form.email) return alert("Remplissez vos coordonnées !");
    // Passer les infos via query pour la suite (ou stocker en context/localStorage pour plus complexe)
    router.push(`/reservation/paiement?slug=${params.get("slug")}&nbPlaces=${params.get("nbPlaces")}&nom=${form.nom}&prenom=${form.prenom}&email=${form.email}`);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Vos coordonnées</h1>
      <input className="border p-2 w-full mb-2" placeholder="Nom"
        value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
      <input className="border p-2 w-full mb-2" placeholder="Prénom"
        value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} />
      <input className="border p-2 w-full mb-2" placeholder="Email"
        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <button onClick={handleNext}
        className="bg-emerald-700 text-white px-4 py-2 rounded">
        Continuer
      </button>
    </div>
  );
}
