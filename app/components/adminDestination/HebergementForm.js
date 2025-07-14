"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function HebergementForm({
  hebergementTitre,
  setHebergementTitre,
  hebergementDescriptif,
  setHebergementDescriptif,
  hebergementPointsForts,
  setHebergementPointsForts,
  hebergementImages,
  setHebergementImages,
  uploadImage,
}) {
  // Upload d’image hébergement
  const onDrop = async (files) => {
    if (!files[0]) return;
    const url = await uploadImage(files[0]);
    setHebergementImages([...(hebergementImages || []), { url, alt: "" }]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  // Points forts hébergement dynamiques
  const addPoint = () =>
    setHebergementPointsForts([...(hebergementPointsForts || []), ""]);
  const removePoint = (i) =>
    setHebergementPointsForts(
      hebergementPointsForts.filter((_, idx) => idx !== i)
    );
  const changePoint = (i, val) => {
    const arr = [...hebergementPointsForts];
    arr[i] = val;
    setHebergementPointsForts(arr);
  };

  // Suppression image hébergement
  const removeImage = (i) =>
    setHebergementImages(
      hebergementImages.filter((_, idx) => idx !== i)
    );

  return (
    <div className="border rounded p-4 mb-4 bg-gray-50">
      <h3 className="font-semibold mb-2">Hébergement</h3>
      <input
        type="text"
        value={hebergementTitre}
        onChange={(e) => setHebergementTitre(e.target.value)}
        placeholder="Titre hébergement (ex: Chalet, Hôtel 4*)"
        className="w-full p-2 border rounded text-sm mb-2"
      />
      <textarea
        value={hebergementDescriptif}
        onChange={(e) => setHebergementDescriptif(e.target.value)}
        placeholder="Descriptif hébergement"
        className="w-full p-2 border rounded text-sm mb-2"
        rows={2}
      />

      {/* Points forts hébergement */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">
          Points forts hébergement
        </label>
        {(hebergementPointsForts || []).map((pt, i) => (
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
          + Ajouter un point fort hébergement
        </button>
      </div>

      {/* Images hébergement */}
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1">
          Images hébergement
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-3 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded"
        >
          <input {...getInputProps()} />
          <p className="text-xs text-gray-600">
            Déposez/ajoutez une image d’hébergement ici ou cliquez
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(hebergementImages || []).map((img, i) => (
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
                onClick={() => removeImage(i)}
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
                  const arr = [...hebergementImages];
                  arr[i].alt = e.target.value;
                  setHebergementImages(arr);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
