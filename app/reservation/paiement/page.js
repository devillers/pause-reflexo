"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Paiement() {
  const params = useSearchParams();

  useEffect(() => {
    const pay = async () => {
      const body = {
        slug: params.get("slug"),
        nbPlaces: Number(params.get("nbPlaces")),
        nom: params.get("nom"),
        prenom: params.get("prenom"),
        email: params.get("email"),
      };
      // Appel backend pour créer la session Stripe
      const res = await fetch("/api/paiement/stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const { url } = await res.json();
      window.location = url;
    };
    pay();
  }, [params]);

  return (
    <div className="p-10 text-center">Redirection vers le paiement sécurisé...</div>
  );
}
