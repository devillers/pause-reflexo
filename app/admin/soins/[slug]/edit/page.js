//app/admin/soins/[slug]/edit/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiImage } from "react-icons/fi";

function makeSlug(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditSoinAdminPage() {
  const router = useRouter();
  const { slug } = useParams();
  const MAX_SIZE_MB = 5;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    prix: "",
    duree: "",
    description: "",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/soins/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setForm({
          title: data.title,
          slug: data.slug,
          category: data.category || "",
          prix: data.prix || "",
          duree: data.duree || "",
          description: data.description,
          file: null,
        });
        setPreviewUrl(data.image || null);
      })
      .catch(() => alert("Impossible de charger le soin"))
      .finally(() => setLoading(false));
  }, [slug]);

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
    if (files?.[0]) {
      handleFile(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("slug", makeSlug(form.slug));
    fd.append("category", form.category);
    fd.append("prix", form.prix);
    fd.append("duree", form.duree);
    fd.append("description", form.description);
    if (form.file) fd.append("file", form.file);

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `/api/soins/${encodeURIComponent(slug)}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        router.push("/admin/soins");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    };

    xhr.onerror = () => {
      alert("Erreur réseau");
    };

    xhr.send(fd);
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <main className="p-8 mx-auto max-w-6xl">
      <h1 className="text-2xl font-light mb-6">Modifier le soin</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Colonne gauche : image */}
        <section className="p-4 rounded space-y-4">
          <label className="block text-sm font-light text-gray-900">
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
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-600 text-center">
                Upload : {uploadProgress}%
              </p>
            </div>
          )}
        </section>

        {/* Colonne droite : infos */}
        <section className="p-4 rounded space-y-4">
          {[
            ["title", "titre"],
            ["slug", "slug"],
            ["category", "catégorie"],
            ["prix", "prix"],
            ["duree", "durée"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm font-light text-gray-900 mb-2">
                {label}
              </label>
              <input
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-light text-gray-600 outline-1 -outline-offset-1 outline-gray-300 focus:outline-gray-600 sm:text-sm"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-light text-gray-900">
              description
            </label>
            <textarea
              name="description"
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = el.scrollHeight + "px";
                }
              }}
              value={form.description || ""}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
                handleChange(e);
              }}
              className="resize-none overflow-hidden mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-light text-gray-600 outline-1 -outline-offset-1 outline-gray-300 focus:outline-gray-600 sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-sm uppercase hover:bg-[#027771] hover:text-white transition"
            >
              Mettre à jour le soin
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
