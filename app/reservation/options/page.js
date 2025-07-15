"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReservationOptions() {
  const [sejours, setSejours] = useState([]);
  const [selected, setSelected] = useState(null);
  const [nbPlaces, setNbPlaces] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/paiement/sejours")
      .then(r => r.json())
      .then(setSejours);
  }, []);

  const handleNext = () => {
    if (!selected) return alert("Choisissez un séjour");
    router.push(`/reservation/coordonnees?slug=${selected.slug}&nbPlaces=${nbPlaces}`);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Choisissez votre séjour</h1>
      <select className="border p-2 w-full mb-2"
        onChange={e => setSelected(sejours.find(s => s.slug === e.target.value))}>
        <option value="">Sélectionner</option>
        {sejours.map(s => (
          <option key={s.slug} value={s.slug}>
            {s.titre} ({s.capacity} places restantes)
          </option>
        ))}
      </select>
      <input type="number" min={1}
        className="border p-2 w-full mb-4"
        value={nbPlaces}
        onChange={e => setNbPlaces(Number(e.target.value))}
        placeholder="Nombre de places" />
      <button onClick={handleNext}
        className="bg-emerald-700 text-white px-4 py-2 rounded">
        Continuer
      </button>
    </div>
  );
}
