// app/admin/posts/[slug]/edit/page.js

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiImage } from "react-icons/fi";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

function makeSlug(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditPostAdminPage() {
  const router = useRouter();
  const { slug } = useParams();
  const MAX_SIZE_MB = 5;

  const [form, setForm] = useState({
    title: "",
    second_title: "",
    slug: "",
    category: "",
    description: "",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setForm({
          title: data.title,
          second_title: data.second_title || "",
          slug: data.slug,
          category: data.category || "",
          description: data.description || "",
          file: null,
        });
        setPreviewUrl(data.image || null);
      })
      .catch(() => alert("Impossible de charger le post"))
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
    fd.append("second_title", form.second_title);
    fd.append("slug", makeSlug(form.slug));
    fd.append("category", form.category);
    fd.append("description", form.description);
    if (form.file) fd.append("file", form.file);

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `/api/posts/${encodeURIComponent(slug)}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        router.push("/admin/posts");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    };

    xhr.onerror = () => alert("Erreur réseau");
    xhr.send(fd);
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <main className="p-8 mx-auto max-w-6xl">
      <h1 className="text-2xl font-light mb-6">Modifier le post</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="p-4 rounded space-y-4 col-span-2">
          {/* Image Upload */}
          <label htmlFor="file-upload" className="block text-sm font-light text-gray-900">
            Image
          </label>
          <div
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer?.files?.[0];
              if (file) handleFile(file);
            }}
            onDragOver={(e) => e.preventDefault()}
            className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-10 hover:border-gray-500 transition"
          >
            <div className="text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-300" />
              <div className="mt-4 flex text-sm text-gray-600 justify-center">
                <label htmlFor="file-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-semibold">
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
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP jusqu’à 5 Mo</p>
              {form.file && (
                <p className="mt-2 text-sm text-gray-700 font-medium">{form.file.name}</p>
              )}
            </div>
          </div>

          {previewUrl && (
            <div className="border rounded overflow-hidden mt-4">
              <img src={previewUrl} alt="Prévisualisation" className="w-full object-cover max-h-64" />
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <p className="text-xs mt-1 text-gray-600 text-center">Upload : {uploadProgress}%</p>
            </div>
          )}

          {/* Markdown Editor */}
          <label htmlFor="description" className="block text-sm font-light text-gray-900 mb-2">
            Description
          </label>
          <MdEditor
            id="description"
            value={form.description}
            style={{ height: "500px" }}
            renderHTML={(text) => text}
            onChange={({ text }) => setForm((f) => ({ ...f, description: text }))}
          />
        </section>

        {/* Autres champs */}
        <section className="p-4 rounded space-y-4">
          {["title", "second_title", "slug", "category"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-light text-gray-900 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                required={field !== "category"}
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-600 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
              />
            </div>
          ))}

          <div className="pt-2">
            <button
              type="submit"
              className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-sm uppercase hover:bg-[#027771] hover:text-white transition"
            >
              Mettre à jour
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
