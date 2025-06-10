"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";

function makeSlug(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewAdminPostPage() {
  const router = useRouter();
  const MAX_SIZE_MB = 5;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFile = (file) => {
    if (!file || !(file instanceof File)) return;

    if (!file.type.startsWith("image/")) {
      alert("Seuls les fichiers image sont autorisés.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("Le fichier est trop volumineux (max 5 Mo).");
      return;
    }

    setForm((f) => ({ ...f, file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      handleFile(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("slug", makeSlug(form.slug || form.title)); // fallback slug
    fd.append("category", form.category);
    fd.append("description", form.description);
    if (form.file) fd.append("file", form.file);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({
        message: "Erreur serveur",
      }));
      alert(err.message);
      return;
    }

    router.push("/admin/posts");
  };

  return (
    <main className="p-8 mx-auto max-w-6xl">
      <h1 className="text-2xl font-light mb-6">Créer un nouveau post</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Colonne image */}
        <section className="p-4 rounded space-y-4">
          <label
            htmlFor="file-upload"
            className="block text-sm font-light text-gray-900"
          >
            Image
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-10 hover:border-gray-500 transition"
          >
            <div className="text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-300" />
              <div className="mt-4 flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span>Choisir un fichier</span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">ou glissez-déposez</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WEBP jusqu’à 5 Mo
              </p>
              {form.file && (
                <p className="mt-2 text-sm text-gray-700 font-medium">
                  {form.file.name}
                </p>
              )}
            </div>
          </div>

          {previewUrl && (
            <div className="border rounded overflow-hidden mt-4">
              <img
                src={previewUrl}
                alt="Prévisualisation"
                className="w-full object-cover max-h-64"
              />
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs mt-1 text-gray-600 text-center">
                Upload : {uploadProgress}%
              </p>
            </div>
          )}
        </section>

        {/* Colonne infos */}
        <section className="p-4 rounded space-y-4">
          <div>
            <label className="block text-sm font-light text-gray-900 mb-2">
              Titre
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-900 mb-2">
              Slug
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-900 mb-2">
              Catégorie
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-sm uppercase hover:bg-[#027771] hover:text-white transition"
          >
            Créer le post
          </button>
        </section>
      </form>
    </main>
  );
}
