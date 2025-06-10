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

  return (
 <main className="p-2 sm:p-4 max-w-5xl mx-auto">
      <div className="flex-cols  items-center ">
        <h1 className="text-2xl font-bold mb-6">Tous les soins</h1>
         <button
          onClick={() => router.push("/admin/posts/new")}
          className=" mb-6 border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-[10px] uppercase hover:bg-[#027771] hover:text-white transition"
        >
          Créer un soin 
        </button>
      </div>

      <ul className="space-y-4">
        {soins.map((soin) => (
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
                <p className="text-xs font-thin text-gray-900">
                  Catégorie : {soin.category || "—"}
                </p>
                {soin.prix && (
                  <p className="text-xs font-thin text-gray-700">Prix : {soin.prix} €</p>
                )}
                {soin.duree && (
                  <p className="text-xs font-thin text-gray-700">Durée : {soin.duree} €</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 self-start sm:self-center">
              <button
                onClick={() => router.push(`/admin/soins/${soin.slug}/edit`)}
                 className="border border-[#009992] text-[#009992] px-4 py-2 rounded-full text-[10px] uppercase hover:bg-[#027771] hover:text-white transition"
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Supprimer ce soin ?")) return;
                  await fetch(`/api/soins/${soin.slug}`, { method: "DELETE" });
                  setSoins(soins.filter((s) => s.slug !== soin.slug));
                }}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-[10px] uppercase hover:bg-red-500 hover:text-white transition"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
