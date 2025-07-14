// app/destination/page.js

import Link from "next/link";
import HeroHeader from "../components/HeroHeader";
import { GrYoga } from "react-icons/gr";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { IoTodayOutline } from "react-icons/io5";

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
                      {/* Icone bien centrée */}
                      <IoTodayOutline className="text-base mr-1" />
                      {/* Dates alignées */}
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
                        <span className="mx-1 font-light text-[#bdbdbd]">
                          —
                        </span>
                      )}
                      {sejour.dateFin && (
                        <span className="font-light">
                          {new Date(sejour.dateFin).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                <div className=" flex  items-center font-bold text-2xl my-5">
                  <div className="font-thin text-xl mb-2 mr-2">
                    {sejour.titre}
                  </div>

                  <div className="text-sm font-light text-orange-500 mb-1">
                    {sejour.destination}
                  </div>
                </div>

                <div className="flex flex-wrap justify-between gap-2 text-sm mb-2 text-gray-700">
                  <div className="flex items-center gap-x-2 text-sm">
                    <GrYoga className="text-lg" />
                    <span className="text-xs">{sejour.sport}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm">
                    <FaCalendarDays className="text-sm" />
                    <span className="text-xs">{sejour.duree}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm">
                    <SiLevelsdotfyi className="text-sm" />
                    <span className="text-xs">{sejour.niveau}</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-5 text-xs text-justify leading-5">
                  {sejour.resume}
                </p>
              </div>

              {/* Miniatures principales */}
              {/* {sejour.imagesMain?.length > 0 && (
                <div className="px-6 pt-2 pb-4 flex gap-2">
                  {sejour.imagesMain?.slice(0, 2).map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={img.alt || sejour.titre}
                      className="w-16 h-16 object-cover rounded-full border shadow-2xl"
                    />
                  ))}
                </div>
              )} */}

              {/* "Badges" Points forts */}
              {sejour.pointsForts && sejour.pointsForts.length > 0 && (
                <div className="px-6 pt-2 pb-4 flex flex-wrap gap-2">
                  {sejour.pointsForts.slice(0, 3).map((point, i) => (
                    <span
                      key={i}
                      className="inline-block bg-white-200 rounded-full px-3 py-1 text-xs font-light text-orange-500 shadow-sm "
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
