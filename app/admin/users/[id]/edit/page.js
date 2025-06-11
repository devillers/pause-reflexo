"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AvatarUploader from "@/app/components/AvatarUploader";

export default function EditAdminUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((u) => {
        setForm({ name: u.name, email: u.email, role: u.role });
        setAvatarPreview(u.avatarUrl || null);
      })
      .catch(() => setError("Utilisateur non trouvé"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (avatarFile) fd.append("avatar", avatarFile);

    const res = await fetch(`/api/users/${id}`, { method: "PATCH", body: fd });
    if (!res.ok) {
      const { message } = await res.json();
      setError(message || "Erreur serveur");
      return;
    }
    router.push("/admin/users");
  };

  if (loading) return <p className="p-6">Chargement…</p>;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier l’utilisateur</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <AvatarUploader value={avatarPreview} onChange={setAvatarFile} />

        <section className="space-y-4 p-4">
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-light text-gray-900 mb-4"
            >
              Nom
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
              required
            />
          </div>
          <div>
               <label
              htmlFor="email"
              className="block text-sm font-light text-gray-900 mb-4"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
              required
            />
          </div>
          <div>
               <label
              htmlFor="nom"
              className="block text-sm font-light text-gray-900 mb-4"
            >
              Rôle
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 border border-gray-300 placeholder:text-gray-400 focus:outline-gray-600 sm:text-sm"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-sm uppercase hover:bg-[#027771] hover:text-white transition">
            Enregistrer
          </button>
        </section>
      </form>
    </main>
  );
}
