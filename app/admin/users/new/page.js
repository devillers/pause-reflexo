"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarUploader from "../../../components/AvatarUploader.jsx"; // Assurez-vous que le chemin est correct

export default function NewAdminUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "user"
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (avatarFile) fd.append("avatar", avatarFile);

    try {
      const res = await fetch("/api/users", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).message);
      router.push("/admin/users");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer un utilisateur</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <AvatarUploader value={null} onChange={setAvatarFile} />

        <section className="space-y-4">
          {["name", "email", "password"].map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium capitalize">{f}</label>
              <input
                name={f}
                type={f === "password" ? "password" : f === "email" ? "email" : "text"}
                value={form[f]}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium">Rôle</label>
            <select name="role" value={form.role} onChange={handleChange}
                    className="mt-1 w-full p-2 border rounded">
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
            {loading ? "Création…" : "Créer"}
          </button>
        </section>
      </form>
    </main>
  );
}
