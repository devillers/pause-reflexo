"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminSoinsPage() {
  const router = useRouter();
  const [soins, setSoins] = useState([]);

  useEffect(() => {
    fetch("/api/soins")
      .then((r) => r.json())
      .then(setSoins)
      .catch(() => alert("Impossible de charger les soins"));
  }, []);

  // Regrouper les soins par catégorie
  const soinsParCategorie = soins.reduce((acc, soin) => {
    const cat = soin.category || "Sans catégorie";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(soin);
    return acc;
  }, {});

  return (
    <main className="p-2 sm:p-4 max-w-5xl mx-auto">
      <div className="flex-cols items-center">
        <h1 className="text-3xl font-thin mb-6">Tous les soins</h1>
        <button
          onClick={() => router.push("/admin/posts/new")}
          className="mb-6 cursor-pointer inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset"
        >
          Créer un soin
        </button>
      </div>

      {/* Menu de catégories */}
      <nav className="mb-10 flex flex-wrap gap-4">
        {Object.keys(soinsParCategorie).map((cat) => (
          <a
            key={cat}
            href={`#cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-sm font-medium text-[#009992] hover:underline"
          >
            {cat}
          </a>
        ))}
      </nav>

      {/* Sections par catégorie */}
      {Object.entries(soinsParCategorie).map(([cat, liste]) => (
        <section key={cat} id={`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`} className="mb-10">
          <h2 className="text-lg font-thin mb-4 text-gray-600 border-b pb-1">{cat}</h2>
          <ul className="space-y-4">
            {liste.map((soin) => (
              <li
                key={soin._id}
                className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm rounded-lg bg-white"
              >
                {/* Infos */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  <div className="w-full sm:w-24 sm:h-24 h-40 relative flex-shrink-0">
                    {soin.image ? (
                      <Image
                        src={soin.image}
                        alt={soin.title}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full rounded flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-light text-sm uppercase">{soin.title}</h2>
                    <p className="text-xs font-thin text-gray-900">Catégorie : {soin.category || "—"}</p>
                    {soin.prix && (
                      <p className="text-xs font-thin text-gray-700">Prix : {soin.prix} €</p>
                    )}
                    {soin.duree && (
                      <p className="text-xs font-thin text-gray-700">Durée : {soin.duree} min</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 self-start sm:self-center">
                  <button
                    onClick={() => router.push(`/admin/soins/${soin.slug}/edit`)}
                    className="cursor-pointer inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm("Supprimer ce soin ?")) return;
                      await fetch(`/api/soins/${soin.slug}`, { method: "DELETE" });
                      setSoins((prev) => prev.filter((s) => s.slug !== soin.slug));
                    }}
                    className="cursor-pointer inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-700/10 ring-inset"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
