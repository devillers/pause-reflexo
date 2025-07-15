"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SportIcon } from "./SportIcon";
import { FiltreSejours } from "./FiltreSejours";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { IoTodayOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

export default function DestinationClient({ sejours }) {
  const [filters, setFilters] = useState({});

  // Filtrage dynamique
  const filtered = useMemo(() => {
    return sejours.filter((s) => {
      if (filters.sport && s.sport !== filters.sport) return false;
      if (filters.destination && s.destination !== filters.destination)
        return false;
      if (filters.niveau && s.niveau !== filters.niveau) return false;
      if (
        filters.dateDebut &&
        s.dateDebut &&
        new Date(s.dateDebut) < new Date(filters.dateDebut)
      )
        return false;
      return true;
    });
  }, [sejours, filters]);

  return (
    <main className="max-w-7xl mx-auto px-4">
      <FiltreSejours
        sejours={sejours}
        onChange={setFilters}
        className="z-10 mt-[-40px]"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[60px] max-w-5xl mx-auto">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-8">
            Aucun séjour ne correspond à vos critères.
          </div>
        )}
        {filtered.map((sejour) => (
          <Link
            key={sejour.slug}
            href={`/destination/${sejour.slug}`}
            className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition block mx-auto"
          >
            {/* Hero Image */}
            <div className="relative">
              {sejour.heroImage?.url && (
                <Image
                  className="w-full max-w-full h-48 object-cover rounded-t-lg"
                  src={sejour.heroImage.url}
                  alt={sejour.heroImage.alt || sejour.titre}
                  width={500} // Mets la largeur et la hauteur réelles de l'image si possible
                  height={192} // (Exemple : 500x192, adapte si besoin)
                  priority // ✅ Ajoute la prop ici !
                  style={{ objectFit: "cover" }} // Pour bien gérer le crop (optionnel avec Tailwind)
                />
              )}
              {/* Prix */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-white text-black px-4 py-2 rounded text-xs font-light shadow-md">
                  À partir de {sejour.prix} €
                </span>
              </div>
            </div>

            <div className="px-6 py-4">
              {/* Dates séjour */}
              {(sejour.dateDebut || sejour.dateFin) && (
                <div className="flex justify-center items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-x-2 px-3 py-1 rounded-full bg-white text-gray-900 text-xs font-light shadow-sm">
                    <IoTodayOutline className="text-base mr-1" />
                    {sejour.dateDebut && (
                      <span className="font-light">
                        {new Date(sejour.dateDebut).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    )}
                    {sejour.dateDebut && sejour.dateFin && (
                      <span className="mx-1 font-light text-[#bdbdbd]">—</span>
                    )}
                    {sejour.dateFin && (
                      <span className="font-light">
                        {new Date(sejour.dateFin).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </span>
                </div>
              )}

              <div className=" flex-col my-5">
                <div className="font-extrabold text-xl uppercase italic text-gray-800/60 ">
                  {sejour.titre}
                </div>
                <div className="text-sm font-bold uppercase italic text-pink-500 mb-1">
                  {sejour.destination}
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-2 text-sm mb-2 text-gray-700">
                <div className="flex items-center gap-x-2 text-xs">
                  <SportIcon
                    sport={sejour.sport}
                    size={18}
                    className="text-[#364054]"
                  />
                  <span>{sejour.sport}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm">
                  <FaCalendarDays className="text-sm" />
                  <span className="text-xs">{sejour.duree}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm">
                  <SiLevelsdotfyi className="text-sm" />
                  <span className="text-xs">{sejour.niveau}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm">
                  <IoPersonOutline className="text-sm" />
                  <span className="text-xs">{sejour.capacity}</span>
                </div>
              </div>
              <p className="text-gray-700 mt-5 text-[11px] text-justify leading-5">
                {sejour.resume}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
