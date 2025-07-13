// app/destination/[slug]/page.js

import { notFound } from "next/navigation";
import Link from "next/link";

// API fetcher
async function getSejour(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/destination/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function SejourDetailPage(props) {
  // SOLUTION compatible dev/prod Next.js (toujours faire await Promise.resolve)
  const { slug } = await Promise.resolve(props.params);
  const sejour = await getSejour(slug);
  if (!sejour) return notFound();

  return (

    <>
      {sejour.heroImage?.url && (
        <div className="mb-6">
          <img
            src={sejour.heroImage.url}
            alt={sejour.heroImage.alt || sejour.titre}
            className="w-full h-120 object-cover rounded-xl"
          />
        </div>
      )}
       <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero image */}
    
      <h1 className="text-3xl font-bold mb-2">{sejour.titre}</h1>
      <div className="text-gray-500 mb-4">{sejour.destination}</div>
      <div className="flex flex-wrap gap-4 mb-6">
        <span>⏱ {sejour.duree}</span>
        <span>🧘 {sejour.sport}</span>
        <span>⭐ {sejour.niveau}</span>
        <span className="font-semibold text-[#3855C1] text-xs">
          À partir de {sejour.prix}€
        </span>
      </div>
      <div className="prose mb-6 text-xs">{sejour.description}</div>
      {sejour.pointsForts && sejour.pointsForts.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-2">Les points forts</h2>
          <ul className="list-disc pl-5 mb-8">
            {sejour.pointsForts.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </>
      )}
      {/* Galerie */}
      {sejour.imagesGallery && sejour.imagesGallery.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mt-8 mb-2">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sejour.imagesGallery.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                className="rounded-lg w-full h-32 object-cover"
              />
            ))}
          </div>
        </div>
      )}
      <Link
        href={`/contact?sejour=${sejour.slug}`}
        className="bg-[#3855C1] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2741a0] mt-8 inline-block"
      >
        Réserver ce séjour
      </Link>
    </main>
    
    
    </>
 
  );
}
