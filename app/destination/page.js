import HeroHeader from "../components/HeroHeader";
import DestinationClient from "../components/adminDestination/DestinationClient";

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
      {header?.heroImage?.url && (
        <HeroHeader
          titleLines={header.heroTitleLines || []}
          imageUrl={header.heroImage.url}
          description={header.heroDescription}
          ctaText={header.heroCtaText}
          ctaLink={header.heroCtaLink}
        />
      )}

      <DestinationClient sejours={sejours} />
    </>
  );
}
