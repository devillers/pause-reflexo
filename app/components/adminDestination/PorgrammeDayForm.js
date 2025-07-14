"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function ProgrammeDayForm({
  day,
  idx,
  onChange,
  onRemove,
  onAddImage,
  onRemoveImage,
}) {
  // Upload image pour ce jour
  const drop = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (files) => {
      if (!files[0]) return;
      await onAddImage(idx, files[0]);
    },
  });

  // Gestion points forts dynamiques
  const addPoint = () =>
    onChange(idx, "pointsForts", [...(day.pointsForts || []), ""]);
  const removePoint = (i) =>
    onChange(
      idx,
      "pointsForts",
      (day.pointsForts || []).filter((_, j) => j !== i)
    );
  const changePoint = (i, val) => {
    const arr = [...(day.pointsForts || [])];
    arr[i] = val;
    onChange(idx, "pointsForts", arr);
  };

  return (
    <div className="border rounded p-3 mb-4 bg-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Jour {idx + 1}</h4>
        <button
          type="button"
          className="text-xs text-red-600 underline"
          onClick={() => onRemove(idx)}
        >
          Supprimer ce jour
        </button>
      </div>
      <input
        type="text"
        value={day.titre || ""}
        onChange={(e) => onChange(idx, "titre", e.target.value)}
        placeholder="Titre du jour (ex : Jour 1 - Arrivée)"
        className="w-full p-2 border rounded text-xs mb-2"
      />
      <input
        type="text"
        value={day.resume || ""}
        onChange={(e) => onChange(idx, "resume", e.target.value)}
        placeholder="Résumé court (optionnel)"
        className="w-full p-2 border rounded text-xs mb-2"
      />
      <textarea
        value={day.description || ""}
        onChange={(e) => onChange(idx, "description", e.target.value)}
        placeholder="Description détaillée"
        className="w-full p-2 border rounded text-xs mb-2"
        rows={2}
      />
      <input
        type="text"
        value={day.petitDej || ""}
        onChange={(e) => onChange(idx, "petitDej", e.target.value)}
        placeholder="Petit-déjeuner (optionnel)"
        className="w-full p-2 border rounded text-xs mb-2"
      />
      <input
        type="text"
        value={day.dejeuner || ""}
        onChange={(e) => onChange(idx, "dejeuner", e.target.value)}
        placeholder="Déjeuner (optionnel)"
        className="w-full p-2 border rounded text-xs mb-2"
      />
      <input
        type="text"
        value={day.diner || ""}
        onChange={(e) => onChange(idx, "diner", e.target.value)}
        placeholder="Dîner (optionnel)"
        className="w-full p-2 border rounded text-xs mb-2"
      />

      {/* Points forts dynamiques */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">
          Points forts du jour
        </label>
        {(day.pointsForts || []).map((pt, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <input
              value={pt}
              onChange={(e) => changePoint(i, e.target.value)}
              className="w-full p-2 border rounded text-xs"
              placeholder={`Point fort ${i + 1}`}
            />
            <button
              onClick={() => removePoint(i)}
              type="button"
              className="text-red-600 font-bold text-xs"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={addPoint}
          type="button"
          className="text-xs text-[#009992] mt-1"
        >
          + Ajouter un point fort du jour
        </button>
      </div>

      {/* Images du jour */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">
          Images de la journée
        </label>
        <div
          {...drop.getRootProps()}
          className="border-2 border-dashed p-3 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
        >
          <input {...drop.getInputProps()} />
          <p className="text-xs text-gray-600">
            Déposez/ajoutez une image pour ce jour
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(day.images || []).map((img, i) => (
            <div key={i} className="relative">
              <Image
                src={img.url}
                alt={img.alt || ""}
                width={100}
                height={70}
                className="rounded shadow"
                style={{ width: 100, height: "auto" }}
              />
              <button
                onClick={() => onRemoveImage(idx, i)}
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
                onChange={(e) => {
                  const arr = [...day.images];
                  arr[i].alt = e.target.value;
                  onChange(idx, "images", arr);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
