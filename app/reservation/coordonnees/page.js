// app/reservation/coordonnees/page.js


"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ReservationCoordonnees() {
  const params = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    age: "",
    voyageurs: [],
  });

  const nbPlaces = Number(params.get("nbPlaces") || 1);

  const updateVoyageur = (index, key, value) => {
    setForm((prev) => {
      const updated = [...(prev.voyageurs || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, voyageurs: updated };
    });
  };

  const handleNext = () => {
    const { nom, prenom, email, telephone, age, voyageurs } = form;
    if (!nom || !prenom || !email || !telephone || !age) {
      return alert("Merci de remplir tous les champs !");
    }

    for (let i = 0; i < nbPlaces - 1; i++) {
      const v = voyageurs[i];
      if (!v?.nom || !v?.prenom || !v?.email || !v?.telephone) {
        return alert(`Veuillez compléter les informations du voyageur ${i + 2}`);
      }
    }

    const queryParams = new URLSearchParams({
      slug: params.get("slug"),
      nbPlaces: nbPlaces.toString(),
      nom,
      prenom,
      email,
      telephone,
      age,
    });

    queryParams.set("voyageurs", encodeURIComponent(JSON.stringify(voyageurs)));

    router.push(`/reservation/paiement?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 mt-20  flex flex-col">
      
      <div className="my-6 bg-gray-50 shadow-md p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Vos coordonnées</h1>
        <p className="italic font-thin mt-2 mb-4 text-gray-700 text-xs leading-5">
          Veuillez renseigner vos informations ainsi que celles des personnes
          vous accompagnant si vous réservez plusieurs places.
        </p>
        <input
          className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
        />
        <input
          className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
          placeholder="Prénom"
          value={form.prenom}
          onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
        />
        <input
          className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <input
          className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
        />
        <input
          className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
          placeholder="Âge"
          type="number"
          value={form.age}
          onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
        />
      </div>

      {nbPlaces >= 2 &&
        Array.from({ length: nbPlaces - 1 }).map((_, i) => (
          <div className="my-6 bg-gray-50 shadow-md p-4 rounded-lg" key={i}>
            <h2 className="font-light uppercase italic mb-1">Voyageur {i + 2}</h2>
            <p className="italic font-thin text-pink-700 text-xs mb-2">
              Merci d’indiquer les informations du voyageur supplémentaire
            </p>
            <input
              className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
              placeholder="Nom"
              value={form.voyageurs[i]?.nom || ""}
              onChange={(e) => updateVoyageur(i, "nom", e.target.value)}
            />
            <input
              className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
              placeholder="Prénom"
              value={form.voyageurs[i]?.prenom || ""}
              onChange={(e) => updateVoyageur(i, "prenom", e.target.value)}
            />
            <input
              className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
              placeholder="Email"
              type="email"
              value={form.voyageurs[i]?.email || ""}
              onChange={(e) => updateVoyageur(i, "email", e.target.value)}
            />
            <input
              className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
              placeholder="Téléphone"
              value={form.voyageurs[i]?.telephone || ""}
              onChange={(e) => updateVoyageur(i, "telephone", e.target.value)}
            />
          </div>
        ))}

      <button
        onClick={handleNext}
        className="border-pink-700 border text-pink-600 px-4 py-2 rounded"
      >
        Continuer
      </button>
    </div>
  );
}
