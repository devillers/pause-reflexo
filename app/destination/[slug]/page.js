// app/destination/[slug]/page.js

import Image from "next/image";

import { FaPeopleArrows } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";
import { IoTodayOutline } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import { SportIcon } from "../../components/adminDestination/SportIcon";

import { notFound } from "next/navigation";
import Link from "next/link";

// Helper universel pour base URL
const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

async function getSejour(slug) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/destination/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function SejourDetailPage(props) {
  const { slug } = await Promise.resolve(props.params);
  const sejour = await getSejour(slug);
  if (!sejour) return notFound();

  return (
    <>
      {sejour.heroImage?.url && (
        <div className="relative max-h-[32rem] overflow-hidden ">
          <Image
            src={sejour.heroImage.url}
            alt={sejour.heroImage.alt || sejour.titre}
            className="w-full h-auto max-h-[32rem] object-cover"
            width={1200}
            height={512}
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 max-h-[32rem] bg-gradient-to-bl from-transparent to-black/70 z-10" />

          {/* Bloc texte centré verticalement, aligné à gauche */}
          <div className="absolute inset-0 flex items-center pl-8 z-20">
            <div className="p-10">
              <h1 className="mt-16 md:mt-0 text-3xl md:text-7xl uppercase italic font-extrabold  text-white/55">
                {sejour.titre}
              </h1>
              <div className="text-pink-500 mb-1 text-xl italic md:text-5xl font-bold uppercase">
                {sejour.destination}
              </div>
            </div>
          </div>

          {/* PRIX en bas à droite */}
          <span className="absolute bottom-8 right-8 z-30 font-light italic uppercase text-gray-600 bg-white px-5 py-3 rounded md:text-sm text-xs shadow-2xl">
            À partir de {sejour.prix}€
          </span>
        </div>
      )}
      <main className="max-w-4xl mx-auto px-4 ">
        {/* Dates séjour */}

        <div className="flex justify-between  items-center gap-2 py-8">
          {(sejour.dateDebut || sejour.dateFin) && (
            <div className="flex justify-center md:justify-start items-center gap-2 py-8">
              <span className="inline-flex items-center gap-x-2 px-3 py-1 rounded-full bg-white text-pink-500 text-xs font-light shadow-sm">
                <IoTodayOutline className="text-base mr-1" />
                {sejour.dateDebut && (
                  <span className="font-light">
                    {new Date(sejour.dateDebut).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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

          <Link
            href={`/contact?sejour=${sejour.slug}`}
            className="hidden sm:block border-pink-500 border-[1px] text-pink-500 hover:bg-pink-700  hover:text-white font-bold uppercase px-3 py-1 rounded-xl transition shadow-sm  xl:w-auto  xl:mt-0 text-lg"
          >
            Réserver
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="inline-flex items-center gap-x-2 text-xs text-pink-500 uppercase">
            <IoTodayOutline className="text-base text-pink-500 " />
            {sejour.duree} jours
          </span>

          <div className="flex items-center gap-x-2 text-xs text-pink-500">
            <SportIcon
              sport={sejour.sport}
              size={18}
              
            />
            <span>{sejour.sport}</span>
          </div>
          <div className="flex items-center gap-x-2 text-sm text-pink-500">
            <SiLevelsdotfyi className="text-sm text-pink-500" />
            <span className="text-xs ">{sejour.niveau}</span>
          </div>
        </div>
        <div className="prose mb-6 text-xs leading-6 text-justify text-gray-900">
          {sejour.description}
        </div>

        {/* LES POINTS FORTS DU SÉJOUR */}
        {sejour.pointsForts?.length > 0 && (
          <>
            <h2 className="text-xl italic uppercase font-extrabold mt-4 text-gray-700/90 mb-6">
              Les points forts
            </h2>
            <div className=" flex justify-start gap-4 mb-8">
              {sejour.pointsForts.map((point, i) => (
                <a
                  className="bg-pink-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full"
                  key={i}
                >
                  {point}
                </a>
              ))}
            </div>
          </>
        )}

        {/* SECTION SPORT/NIVEAU/EXPERT */}
        {(sejour.sportDescriptif ||
          sejour.encadrementSportif ||
          sejour.niveauExplication ||
          sejour.ageMini) && (
          <section className="mt-12">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-3xl italic uppercase font-extrabold mb-6 text-gray-700/90 ">
                Infos sport / niveau
              </h2>
              {sejour.sportDescriptif && (
                <div className="text-gray-800 text-xs text-justify mb-6 leading-6">
                  {sejour.sportDescriptif}
                </div>
              )}
              {sejour.encadrementSportif && (
                <div className="mb-1 flex items-center gap-x-2 justify-start">
                  <span className="text-xl italic uppercase font-extrabold text-gray-700/90">
                    <FaPeopleArrows size={16} className="text-pink-500" />
                  </span>
                  <span className="text-sm italic uppercase font-light text-gray-700/90 leading-loose">
                    {sejour.encadrementSportif}
                  </span>
                </div>
              )}
              {sejour.niveauExplication && (
                <div className="mb-1 flex items-center gap-x-2 justify-start">
                  <span className="text-xl italic uppercase font-extrabold text-gray-700/90">
                    <SiLevelsdotfyi size={16} className="text-pink-500" />
                  </span>
                  <span className="text-sm italic uppercase font-light text-gray-700/90 leading-loose">
                    {sejour.niveauExplication}
                  </span>
                </div>
              )}
              {typeof sejour.ageMini === "number" && (
                <div className="mb-1 flex items-center gap-x-2 justify-start">
                  <span className="text-xl italic uppercase font-extrabold text-gray-700/90">
                    <FaBirthdayCake size={16} className="text-pink-500" />
                  </span>
                  <span className="text-sm italic uppercase font-light text-gray-700/90 leading-loose">
                    à partir de {sejour.ageMini} ans
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECTION PROGRAMME PAR JOUR */}
        {sejour.programme?.length > 0 && (
          <section className="mt-6">
            {/* Fusion titre + intro + Jour 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-3xl italic uppercase font-extrabold mb-6 text-gray-700/90 ">
                Programme du séjour
              </h2>
              {sejour.programmeDescriptif && (
                <div className=" text-gray-800 text-xs text-justify mb-6 leading-6">
                  {sejour.programmeDescriptif}
                </div>
              )}

              {/* Premier jour (programme[0]) */}
              {sejour.programme[0] && (
                <>
                  <h3 className="text-xl italic uppercase font-extrabold mt-4 text-gray-700/90">
                    {sejour.programme[0].titre || "Jour 1"}
                  </h3>
                  {sejour.programme[0].resume && (
                    <div className="text-sm italic uppercase font-light mb-4">
                      {sejour.programme[0].resume}
                    </div>
                  )}
                  {sejour.programme[0].details && (
                    <div className="text-sm mb-1">
                      {sejour.programme[0].details}
                    </div>
                  )}
                  {sejour.programme[0].description && (
                    <div className="mb-2 text-gray-800 text-xs text-justify leading-6">
                      {sejour.programme[0].description}
                    </div>
                  )}
                  {/* Repas */}
                  <div className="flex flex-wrap gap-3 text-xs mb-2 py-4">
                    {sejour.programme[0].petitDej && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full">
                        Petit-déjeuner: {sejour.programme[0].petitDej}
                      </span>
                    )}
                    {sejour.programme[0].dejeuner && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full">
                        Déjeuner: {sejour.programme[0].dejeuner}
                      </span>
                    )}
                    {sejour.programme[0].diner && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full">
                        Dîner: {sejour.programme[0].diner}
                      </span>
                    )}
                  </div>
                  {/* Points forts du jour */}

                  {sejour.programme[0].pointsForts?.length > 0 && (
                    <div>
                      <h2 className="text-xl italic uppercase font-extrabold mt-6 text-gray-700/90 mb-4">
                        Les points forts
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-1 text-xs">
                        {sejour.programme[0].pointsForts.map((pt, j) => (
                          <a
                            className="bg-pink-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full"
                            key={j}
                          >
                            {pt}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* {sejour.programme[0].pointsForts?.length > 0 && (
                    <ul className="list-disc pl-5 mb-1 text-xs">
                      {sejour.programme[0].pointsForts.map((pt, j) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                  )} */}
                  {/* Images du jour */}
                  {sejour.programme[0].images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sejour.programme[0].images.map((img, k) => (
                        <img
                          key={k}
                          src={img.url}
                          alt={img.alt || `Jour 1`}
                          className="rounded-lg w-32 h-32 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Autres jours */}
            <div className="space-y-6">
              {sejour.programme.slice(1).map((jour, i) => (
                <div key={i + 1} className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl italic uppercase font-extrabold text-gray-700/90">
                    {jour.titre || `Jour ${i + 2}`}
                  </h3>
                  {jour.resume && (
                    <div className="text-sm italic uppercase font-light mb-4">
                      {jour.resume}
                    </div>
                  )}
                  {jour.details && (
                    <div className="text-sm mb-1">{jour.details}</div>
                  )}
                  {jour.description && (
                    <div className="mb-2 text-gray-800 text-xs text-justify leading-6">
                      {jour.description}
                    </div>
                  )}
                  {/* Repas */}
                  <div className="flex flex-wrap gap-3 text-xs mb-2 py-4">
                    {jour.petitDej && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full">
                        Petit-déjeuner: {jour.petitDej}
                      </span>
                    )}
                    {jour.dejeuner && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full">
                        Déjeuner: {jour.dejeuner}
                      </span>
                    )}
                    {jour.diner && (
                      <span className="bg-purple-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full">
                        Dîner: {jour.diner}
                      </span>
                    )}
                  </div>
                  {/* Points forts du jour */}
                  {jour.pointsForts?.length > 0 && (
                    <div>
                      <h2 className="text-xl italic uppercase font-extrabold mt-6 text-gray-700/90 mb-4">
                        Les points forts
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-1 text-xs">
                        {jour.pointsForts.map((pt, j) => (
                          <a
                            className="bg-pink-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full"
                            key={j}
                          >
                            {pt}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Images du jour */}
                  {jour.images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {jour.images.map((img, k) => (
                        <img
                          key={k}
                          src={img.url}
                          alt={img.alt || `Jour ${i + 2}`}
                          className="rounded-lg w-30 h-30 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION HÉBERGEMENT */}
        {(sejour.hebergementTitre ||
          sejour.hebergementDescriptif ||
          sejour.hebergementPointsForts?.length ||
          sejour.hebergementImages?.length) && (
          <section className="mt-6 bg-white shadow-md rounded-lg p-6">
            {sejour.hebergementTitre && (
              <div>
                <h2 className="text-3xl italic uppercase font-extrabold mb-2 text-gray-700/90">
                  votre hébergement
                </h2>
                <h3 className="text-xl italic uppercase font-thin mb-6">
                  {sejour.hebergementTitre}
                </h3>
              </div>
            )}
            {sejour.hebergementDescriptif && (
              <p className="mb-4 text-gray-800 text-xs text-justify leading-6">
                {sejour.hebergementDescriptif}
              </p>
            )}

            {sejour.hebergementPointsForts?.length > 0 && (
              <div>
                <h2 className="text-xl italic uppercase font-extrabold mt-6 text-gray-700/90 mb-4">
                  Les points forts
                </h2>
                <div className="flex flex-wrap gap-2 mb-1 text-xs">
                  {sejour.hebergementPointsForts.map((pt, j) => (
                    <a
                      className="bg-pink-500 text-white px-2 py-1 text-center text-[9px] leading-loose rounded-full"
                      key={j}
                    >
                      {pt}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {sejour.hebergementImages?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {sejour.hebergementImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={img.alt || sejour.titre}
                    className="rounded-lg w-30 h-30 object-cover"
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION PRIX DETAIL */}
        {sejour.prixDetail && (
          <section className="bg-white shadow-md rounded-lg p-6 mt-6 mb-6">
            <h2 className="text-3xl italic uppercase font-extrabold mb-4 text-gray-700/90">
              Le prix comprend
            </h2>
            {sejour.prixDetail.inclus?.length > 0 && (
              <>
                <div className="text-xl italic uppercase font-extrabold mt-4 text-gray-700/90 mb-2">
                  Inclus :
                </div>
                <ul className="pl-5 mb-3 text-sm uppercase italic">
                  {sejour.prixDetail.inclus.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </>
            )}
            {sejour.prixDetail.nonInclus?.length > 0 && (
              <>
                <div className="text-xl italic uppercase font-extrabold mt-4 text-gray-700/90 mb-2">
                  Non inclus :
                </div>
                <ul className="pl-5 mb-3 text-sm uppercase italic">
                  {sejour.prixDetail.nonInclus.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </>
            )}
            {sejour.prixDetail.options?.length > 0 && (
              <>
                <div className="text-xl italic uppercase font-extrabold mt-4 text-gray-700/90 mb-2">
                  Options{" "}
                </div>
                <ul className="pl-5 mb-3 text-sm uppercase italic">
                  {sejour.prixDetail.options.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* SECTION "À NOTER" */}
        {sejour.aNoterText && (
          <section className="bg-white shadow-md rounded-lg p-6 mt-6 text-gray-700/90">
            <div className="text-3xl italic uppercase font-extrabold mb-4">
              À noter :
            </div>
            <div>{sejour.aNoterText}</div>
          </section>
        )}

        {/* GALLERIE */}
        {sejour.imagesGallery?.length > 0 && (
          <div className="bg-white shadow-md rounded-md p-6 my-6 ">
            <h2 className="text-3xl italic uppercase font-extrabold mb-4 text-gray-700/90">
              Galerie
            </h2>
            <div className="flex flex-wrap gap-3 mt-6">
              {sejour.imagesGallery.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.alt || sejour.titre}
                  className="rounded-lg h-30 w-30 object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/contact?sejour=${sejour.slug}`}
          className=" border-pink-500 border-[1px] text-pink-500 hover:bg-pink-700  hover:text-white font-bold uppercase px-3 py-1 rounded-xl transition shadow-sm w-full xl:w-auto mt-8 xl:mt-0 text-lg"
        >
          Réserver
        </Link>
      </main>
    </>
  );
}
