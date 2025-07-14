"use client";
import { useState } from "react";

export default function PrixForm({ prix, setPrix, prixDetail, setPrixDetail }) {
  // Champs dynamiques pour inclus/nonInclus/options
  const handleChangeList = (key, idx, val) => {
    const arr = [...(prixDetail?.[key] || [])];
    arr[idx] = val;
    setPrixDetail({ ...prixDetail, [key]: arr });
  };
  const addToList = (key) =>
    setPrixDetail({ ...prixDetail, [key]: [...(prixDetail?.[key] || []), ""] });
  const removeFromList = (key, idx) =>
    setPrixDetail({
      ...prixDetail,
      [key]: (prixDetail?.[key] || []).filter((_, i) => i !== idx),
    });

  return (
    <section className="border rounded p-3 mb-4 bg-gray-100">
      <h4 className="font-medium mb-2">Tarif et Détails</h4>
      <input
        type="number"
        value={prix || ""}
        onChange={(e) => setPrix(e.target.value)}
        placeholder="Prix de base du séjour (€)"
        className="w-full p-2 border rounded text-sm mb-2"
      />

      {/* Inclus */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Inclus dans le prix</label>
        {(prixDetail?.inclus || []).map((v, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <input
              value={v}
              onChange={(e) => handleChangeList("inclus", i, e.target.value)}
              className="w-full p-2 border rounded text-xs"
              placeholder={`Inclus ${i + 1}`}
            />
            <button
              onClick={() => removeFromList("inclus", i)}
              type="button"
              className="text-red-600 font-bold text-xs"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={() => addToList("inclus")}
          type="button"
          className="text-xs text-[#009992]"
        >
          + Ajouter un inclus
        </button>
      </div>

      {/* Non inclus */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Non inclus</label>
        {(prixDetail?.nonInclus || []).map((v, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <input
              value={v}
              onChange={(e) => handleChangeList("nonInclus", i, e.target.value)}
              className="w-full p-2 border rounded text-xs"
              placeholder={`Non inclus ${i + 1}`}
            />
            <button
              onClick={() => removeFromList("nonInclus", i)}
              type="button"
              className="text-red-600 font-bold text-xs"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={() => addToList("nonInclus")}
          type="button"
          className="text-xs text-[#009992]"
        >
          + Ajouter un non inclus
        </button>
      </div>

      {/* Options */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">Options (facultatif)</label>
        {(prixDetail?.options || []).map((v, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <input
              value={v}
              onChange={(e) => handleChangeList("options", i, e.target.value)}
              className="w-full p-2 border rounded text-xs"
              placeholder={`Option ${i + 1}`}
            />
            <button
              onClick={() => removeFromList("options", i)}
              type="button"
              className="text-red-600 font-bold text-xs"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={() => addToList("options")}
          type="button"
          className="text-xs text-[#009992]"
        >
          + Ajouter une option
        </button>
      </div>
    </section>
  );
}
