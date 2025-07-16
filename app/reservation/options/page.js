//app/reservation/options/page.js

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ReservationOptions() {
//   const [sejours, setSejours] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [nbPlaces, setNbPlaces] = useState(1);
//   const router = useRouter();

//   useEffect(() => {
//     fetch("/api/paiement/sejours")
//       .then((r) => r.json())
//       .then(setSejours);
//   }, []);

//   const handleNext = () => {
//     if (!selected) return alert("Choisissez un séjour");
//     router.push(
//       `/reservation/coordonnees?slug=${selected.slug}&nbPlaces=${nbPlaces}`
//     );
//   };

//   return (
//      <div className="max-w-xl mx-auto px-4 py-10 text-center h-screen flex flex-col items-center justify-center">

//       <div className="my-6 bg-gray-50 shadow-md p-4 rounded-lg">
//      <h1 className="text-2xl font-bold mb-4">Confirmez votre séjour</h1>
//       <select
//         className="border-r-0 border-l-0 border-t-0 border-b-[1px] text-sm outline-0 p-2 w-full mb-2"
//         onChange={(e) =>
//           setSelected(sejours.find((s) => s.slug === e.target.value))
//         }
//       >
//         <option value="">Sélectionner</option>
//         {sejours.map((s) => (
//           <option key={s.slug} value={s.slug}>
//             {s.titre} ({s.capacity} places restantes)
//           </option>
//         ))}
//       </select>
//       <input
//         type="number"
//         min={1}
//         max={selected?.capacity || undefined} // ← limite au nombre dispo
//         className="border-r-0 border-l-0 border-t-0 border-b-[1px] text-sm outline-0 p-2 w-full mb-2"
//         value={nbPlaces}
//         onChange={(e) => setNbPlaces(Number(e.target.value))}
//         placeholder="Nombre de places"
//       />
//       <button
//         onClick={handleNext}
//          className="border-pink-700 border-[1px] text-pink-600 px-4 py-2 mt-6 rounded"
//       >
//         Continuer
//       </button>

//       </div>
 
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReservationOptions() {
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug");

  const [sejour, setSejour] = useState(null);
  const [nbPlaces, setNbPlaces] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSejour = async () => {
      try {
        const res = await fetch(`/api/destination/${slug}`);
        const data = await res.json();
        setSejour(data);
      } catch (error) {
        console.error("Erreur chargement séjour:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchSejour();
  }, [slug]);

  const handleSubmit = () => {
    if (!sejour || nbPlaces < 1 || nbPlaces > sejour.capacity) return;
    router.push(`/reservation/coordonnees?slug=${slug}&nbPlaces=${nbPlaces}`);
  };

  if (loading) {
    return <div className="p-10 text-center">Chargement...</div>;
  }

  if (!sejour) {
    return <div className="p-10 text-center text-red-500">Séjour introuvable</div>;
  }

  return (
    <div className=" mx-auto px-4 h-screen flex items-center justify-center py-20">
      <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Confirmez votre séjour</h1>
        <p className="text-lg font-semibold mb-1">{sejour.titre}</p>
        <p className="text-sm text-gray-600 mb-2">
          Du {new Date(sejour.dateDebut).toLocaleDateString()} au {new Date(sejour.dateFin).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {sejour.capacity} place{sejour.capacity > 1 ? "s" : ""} restante{sejour.capacity > 1 ? "s" : ""}
        </p>

        <label className="block text-left text-sm font-light mb-1">Nombre de participants :</label>
        <select
          value={nbPlaces}
          onChange={(e) => setNbPlaces(Number(e.target.value))}
              className="border-b border-gray-300 text-sm outline-0 p-2 w-full mb-2"
        >
          {Array.from({ length: Math.min(sejour.capacity, 10) }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="border-pink-600 border-[1px] text-pink-600 mt-4 px-4 py-2 rounded hover:bg-pink-700 hover:text-white transition-colors"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
