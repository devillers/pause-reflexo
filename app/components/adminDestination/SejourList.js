"use client";
import Image from "next/image";

/**
 * Liste les séjours existants pour édition/suppression
 * @param {Array} sejours - Liste des séjours
 * @param {Function} editSejour - Fonction pour éditer un séjour
 * @param {Function} deleteSejour - Fonction pour supprimer un séjour
 */
export default function SejourList({ sejours, editSejour, deleteSejour }) {
  if (!sejours?.length)
    return (
      <div className="text-gray-400 italic text-sm mb-2">
        Aucun séjour enregistré pour l’instant.
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sejours.map((s) => (
        <div
          key={s.slug}
          className="border rounded p-3 bg-gray-50 flex flex-col gap-2"
        >
          <span className="font-bold">{s.titre}</span>
          {s.heroImage?.url && (
            <Image
              src={s.heroImage.url}
              alt={s.heroImage.alt}
              width={320}
              height={120}
              style={{ width: "100%", height: "auto", maxHeight: 96 }}
              className="rounded shadow object-cover"
              unoptimized
            />
          )}
          <span className="text-xs text-gray-600">{s.destination}</span>
          <div className="flex gap-2 mt-1">
            <button
              className="text-sm text-blue-700 underline"
              onClick={() => editSejour(s)}
              type="button"
            >
              Modifier
            </button>
            <button
              className="text-sm text-red-700 underline"
              onClick={() => deleteSejour(s.slug)}
              type="button"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
