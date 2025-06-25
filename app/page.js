// app/page.js
import { connectDb } from '../lib/db.mjs';
import AccueilWeb from '../models/Accueil-web.mjs';
import HeroHeader from './components/HeroHeader';

export default async function Home() {
  await connectDb();

  // Récupération de la config unique
  const settings = await AccueilWeb.findOne().lean();

  if (!settings) {
    return (
      <main className="p-6 text-center">
        <p>Aucun paramètre trouvé pour la page d'accueil.</p>
      </main>
    );
  }

  const {
    heroTitleLine1,
    heroTitleLine2,
    heroTitleLine3,
    heroTitleLine4,
    heroTitleLine5,
    heroImageUrl,
    subTitle1,
    subTitle2,
    subTitle3,
    aboutTitle,
    aboutParagraphs
  } = settings;

  return (
    <main className="relative">
      {/* Hero dynamique */}
      <HeroHeader
        titleLines={[
          heroTitleLine1,
          heroTitleLine2,
          heroTitleLine3,
          heroTitleLine4,
          heroTitleLine5,
        ]}
        imageUrl={heroImageUrl}
      />

      {/* Section “présentation de nos soins” */}
      <section>
        <div className="container mx-auto px-4 py-8">
          <ul className="py-4">
            <li>
              <h3 className="text-center text-5xl uppercase font-thin">
                {subTitle1}
              </h3>
            </li>
            <li>
              <h2 className="text-center text-xl my-4 uppercase font-thin text-[#006778]">
                {subTitle2}
              </h2>
            </li>
            <li>
              <h4 className="text-center my-4 uppercase font-thin">
                {subTitle3}
              </h4>
            </li>
          </ul>
        </div>
      </section>

      {/* Section “Qui suis-je ?” */}
      <section className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-thin mb-6">
          {aboutTitle}
        </h2>
        {aboutParagraphs.map((p, i) => (
          <p key={i} className="text-gray-700 mb-6 text-justify text-sm leading-7">
            {p}
          </p>
        ))}
      </section>
    </main>
  );
}
