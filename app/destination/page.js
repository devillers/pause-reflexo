import Link from "next/link";
import HeroHeader from "../components/HeroHeader";

// Helper pour URL API compatible server/client
function getBaseUrl() {
  // Côté client : on laisse fetch gérer l'URL relative
  if (typeof window !== "undefined") return "";
  // Côté serveur : on a besoin d'une URL absolue (en build ou dev SSR)
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

// Fetch header config
async function getDestinationHeader() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/admin/settings-destination/get`, { cache: "no-store" });
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
  // Parallel fetch
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
              {sejour.heroImage?.url && (
                <img
                  className="w-full h-48 object-cover"
                  src={sejour.heroImage.url}
                  alt={sejour.heroImage.alt || sejour.titre}
                />
              )}

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{sejour.titre}</div>
                <div className="text-xs text-gray-500 mb-1">{sejour.destination}</div>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  <span>🧘 {sejour.sport}</span>
                  <span>⏱ {sejour.duree}</span>
                  <span>⭐ {sejour.niveau}</span>
                </div>
                <p className="text-gray-700 text-base">{sejour.resume}</p>
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

              {/* Prix */}
              <div className="px-6 pb-4 text-right font-bold text-[#3855C1]">
                À partir de {sejour.prix}€
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
