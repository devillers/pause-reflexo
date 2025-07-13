// app/destination/page.js

import Link from "next/link";
import HeroHeader from "../components/HeroHeader";
import { GrYoga } from "react-icons/gr";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";

// Helper pour URL API compatible server/client
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

// Fetch header config
async function getDestinationHeader() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/admin/settings-destination/get`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// Fetch séjours
async function getSejours() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destination`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function DestinationPage() {
  const [header, sejours] = await Promise.all([
    getDestinationHeader(),
    getSejours(),
  ]);

  return (
    <>
      {/* Header full width */}
      {header?.heroImage?.url && (
        <HeroHeader
          titleLines={header.heroTitleLines || []}
          imageUrl={header.heroImage.url}
          description={header.heroDescription}
          ctaText={header.heroCtaText}
          ctaLink={header.heroCtaLink}
        />
      )}

      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          {sejours.map((sejour) => (
            <Link
              key={sejour.slug}
              href={`/destination/${sejour.slug}`}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition block mx-auto"
            >
              {/* Hero Image */}
              <div className="relative">
                {sejour.heroImage?.url && (
                  <img
                    className="w-full max-w-full h-48 object-cover rounded-t-lg"
                    src={sejour.heroImage.url}
                    alt={sejour.heroImage.alt || sejour.titre}
                  />
                )}
                {/* Prix */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-white text-black px-4 py-2  rounded text-sm font-bold shadow-md">
                    À partir de {sejour.prix}€
                  </span>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="font-thin text-xl mb-2">{sejour.titre}</div>

                {/* Dates séjour */}
                {(sejour.dateDebut || sejour.dateFin) && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e7f2fc] text-[#165ba9] text-xs font-semibold shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {sejour.dateDebut && (
                        <span>
                          Début&nbsp;:{" "}
                          <span className="font-bold">
                            {new Date(sejour.dateDebut).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </span>
                      )}
                      {sejour.dateDebut && sejour.dateFin && (
                        <span className="mx-1 font-bold text-[#bdbdbd]">—</span>
                      )}
                      {sejour.dateFin && (
                        <span>
                          <span className="font-bold">
                            {new Date(sejour.dateFin).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </span>
                      )}
                    </span>
                  </div>
                )}

                <div className="text-sm text-orange-500 mb-1">
                  {sejour.destination}
                </div>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  <div className="flex items-center gap-x-2 text-sm">
                    <GrYoga className="text-sm" />
                    <span>{sejour.sport}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm">
                    <FaCalendarDays className="text-sm" />
                    <span>{sejour.duree}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm">
                    <SiLevelsdotfyi className="text-sm" />
                    <span>{sejour.niveau}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-xs text-justify">
                  {sejour.resume}
                </p>
              </div>

              {/* Miniatures principales */}
              {sejour.imagesMain?.length > 0 && (
                <div className="px-6 pt-2 pb-4 flex gap-2">
                  {sejour.imagesMain?.slice(0, 2).map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={img.alt || sejour.titre}
                      className="w-16 h-16 object-cover rounded-full border"
                    />
                  ))}
                </div>
              )}

              {/* "Badges" Points forts */}
              {sejour.pointsForts && sejour.pointsForts.length > 0 && (
                <div className="px-6 pt-2 pb-4 flex flex-wrap gap-2">
                  {sejour.pointsForts.slice(0, 3).map((point, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
