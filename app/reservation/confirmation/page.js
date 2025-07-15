"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Confirmation() {
  const params = useSearchParams();
  const [resa, setResa] = useState(null);

  useEffect(() => {
    if (params.get("session_id")) {
      fetch("/api/paiement/reservation?session_id=" + params.get("session_id"))
        .then(r => r.json())
        .then(setResa);
    }
  }, [params]);

  if (!resa) return <div className="p-10 text-center">Chargement confirmation...</div>;
  return (
    <div className="max-w-lg mx-auto p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Merci pour votre réservation !</h1>
      <p>Votre réservation est confirmée pour <b>{resa.sejourSlug}</b>.</p>
      <p>Vous avez réservé <b>{resa.nbPlaces} place(s)</b>.</p>
      <p>Un email de confirmation a été envoyé à <b>{resa.acheteur.email}</b>.</p>
    </div>
  );
}
