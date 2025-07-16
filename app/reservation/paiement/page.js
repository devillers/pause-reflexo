// app/reservation/paiement/page.js

// app/reservation/paiement/page.js

"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Paiement() {
  const params = useSearchParams();

  useEffect(() => {
    const pay = async () => {
      const voyageursRaw = params.get("voyageurs");
      let voyageurs = [];

      try {
        voyageurs = JSON.parse(decodeURIComponent(voyageursRaw));
      } catch (err) {
        console.error("Erreur de parsing des voyageurs :", err);
      }

      const body = {
        slug: params.get("slug"),
        nbPlaces: Number(params.get("nbPlaces")),
        nom: params.get("nom"),
        prenom: params.get("prenom"),
        email: params.get("email"),
        telephone: params.get("telephone"),
        age: Number(params.get("age")),
        voyageurs,
      };

      const res = await fetch("/api/paiement/stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Erreur HTTP:", res.status, text);
      }

      const data = await res.json();
      if (data?.url) {
        window.location = data.url;
      } else {
        alert("Erreur lors de la création de la session de paiement.");
      }
    };

    pay();
  }, [params]);

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-50 shadow-md p-4 rounded-lg">
        Redirection vers le paiement sécurisé...
      </div>
    </div>
  );
}
