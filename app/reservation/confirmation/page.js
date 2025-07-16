//app/reservation/confirmation/page.js

"use client";

import { RiHome2Line } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!session_id);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!session_id) return;
    const fetchReservation = async () => {
      try {
        const res = await fetch(
          `/api/paiement/reservation?session_id=${session_id}`
        );
        if (!res.ok) throw new Error("Réservation introuvable");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [session_id]);

  if (!session_id) return <p>Session ID manquant</p>;
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  // Formatage des dates
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 text-center">
      {/* ✅ Titre centré au-dessus */}
      <h1 className="sm:text-2xl text-lg font-light text-gray-600 italic mb-8">
        <span className="capitalize">{data.acheteur?.prenom}</span>, Merci pour
        votre réservation !
      </h1>

      {/* ✅ Conteneur responsive centré */}
      <div className="sm:max-w-lg md:max-w-4xl w-full bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-center">
          {/* ➤ Colonne image */}

          <div className="flex justify-center items-center ">
            {data.sejourImage && (
              <img
                src={data.sejourImage}
                alt="Séjour"
                className="rounded-full md:h-70 md:w-70 h-40 w-40 object-cover mb-4 shadow-lg"
              />
            )}
          </div>

          {/* ➤ Colonne texte + boutons */}
          <div>
            <div className="mb-1  uppercase italic flex justify-center  font-extrabold sm:text-2xl">
              <p className="">Séminaire</p>
              <span className="ml-1 italic uppercase ">{data.sejourTitre}</span>
            </div>

            <div className=" font-light flex justify-center text-xs sm:text-sm mb-8">
              {data.dateDebut && data.dateFin && (
                <p>
                  Du{" "}
                  <span className="ml-1 capitalize">
                    {formatDate(data.dateDebut)} au {formatDate(data.dateFin)}
                  </span>
                </p>
              )}
            </div>

            <div className="mb-1  font-light flex justify-center text-sm">
              <p>
                {data.nbPlaces} {data.nbPlaces > 1 ? "places" : "place"}{" "}
                réservée{data.nbPlaces > 1 ? "s" : ""}
              </p>
            </div>

            <div className="mb-1 flex justify-center font-light text-sm">
              <span className="mr-1">Prix payé</span>
              <p>{data.montant} €</p>
            </div>

            <div className="mb-1 flex justify-center font-light">
              {Array.isArray(data.voyageurs) && data.voyageurs.length > 0 && (
                <div className=" w-full mt-2">
                  <p className="font-semibold mb-1 capitalize">
                    Voyageurs Supplémentaires
                  </p>
                  <ul className="list-inside capitalize ">
                    {data.voyageurs.map((v, index) => (
                      <li key={index}>
                        {v.prenom} {v.nom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
              {/* ➤ Bouton Facture */}
              <button
                disabled={!data || downloading}
                onClick={async () => {
                  setDownloading(true);
                  try {
                    const res = await fetch(
                      `/api/paiement/pdf?session_id=${session_id}`
                    );
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "recu_reservation.pdf";
                    a.click();
                  } catch (e) {
                    alert("Erreur lors du téléchargement du reçu.");
                  } finally {
                    setDownloading(false);
                  }
                }}
                className={`px-6 py-2 rounded transition flex items-center gap-2 ${
                  downloading
                    ? "bg-white border-[1px] border-pink-500 text-pink-500"
                    : "bg-white border-[1px] border-pink-500 hover:bg-pink-500 hover:text-white text-pink-500"
                }`}
              >
                {downloading ? (
                  "Téléchargement..."
                ) : (
                  <>
                    <HiOutlineDownload size={20} />
                    Facture
                  </>
                )}
              </button>

              {/* ➤ Bouton Retour accueil */}
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center gap-2 px-6 py-2 bg-white text-pink-500 rounded border-[1px] border-pink-500 hover:bg-pink-500 hover:text-white transition"
              >
                <RiHome2Line size={20} />
                Accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
