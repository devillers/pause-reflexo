//app/components/AvatarUploader.jsx
"use client";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

const MAX_SIZE_MB = 5;

export default function AvatarUploader({ value, onChange }) {
  const [preview, setPreview] = useState(value || null);
  const [progress, setProgress] = useState(0);

  function validate(file) {
    if (!file.type.startsWith("image/")) {
      alert("Seuls les fichiers image sont autorisés."); return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("Fichier trop volumineux (max 5 Mo)."); return false;
    }
    return true;
  }

  const handleFile = (file) => {
    if (!validate(file)) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);                     // transmet le File au parent
  };

  return (
    <section className="p-4 rounded space-y-4">
      <label htmlFor="avatar-upload" className="block text-sm font-light text-gray-900">
        Avatar
      </label>

      <div
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer?.files?.[0];
          if (file) handleFile(file);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="mt-2 flex justify-center rounded-lg border-2 border-dashed
                   border-gray-300 bg-white px-6 py-10 hover:border-gray-500 transition"
      >
        <div className="text-center">
          <FiImage className="mx-auto h-12 w-12 text-gray-300" />
          <div className="mt-4 flex text-sm text-gray-600 justify-center">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              <span>Choisir un fichier</span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                className="sr-only"
              />
            </label>
            <p className="pl-1">ou glissez-déposez</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP ≤ 5 Mo</p>
        </div>
      </div>

      {preview && (
        <div className=" rounded overflow-hidden">
          <img src={preview} alt="Prévisualisation" className="w-32 h-32 object-cover rounded-full mx-auto" />
        </div>
      )}

      {progress > 0 && progress < 100 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-center text-gray-600">Upload : {progress}%</p>
        </div>
      )}
    </section>
  );
}
