import { connectDb } from "../../lib/db.mjs";
import Soin from "../../models/Soin.mjs";
import HeroHeader from "../components/HeroHeader";
import SoinCard from "../components/SoinCard";

export const runtime = "nodejs";

export default async function SoinPage() {
  await connectDb();
  const soins = await Soin.find().sort({ category: 1, createdAt: -1 }).lean();

  const byCategory = soins.reduce((acc, soin) => {
    const cat = soin.category || "Non classé";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({
      ...soin,
      _id: soin._id.toString(),
      createdAt: soin.createdAt?.toISOString(),
      updatedAt: soin.updatedAt?.toISOString(),
    });
    return acc;
  }, {});

  return (
    <main>
      <HeroHeader />
      <section className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-thin mb-6">Les Séances </h2>
        <p className=" text-gray-700 mb-6 text-center text-sm leading-7">
          La réflexologie est une technique ancestrale et douce de
          digito-pression qui part du principe que les pieds et les mains,
          divisés en points et en zones réflexes, sont la représentation
          miniature du corps humain. Un toucher spécifique appliqué sur une zone
          réflexe donnée permet d’avoir un effet sur la partie du corps associée
          afin de soulager les tensions ou les déséquilibres qui s’y trouvent et
          ainsi de rétablir l’équilibre naturel du corps.
        </p>

        <p className=" text-gray-700 mb-6 text-center text-sm leading-7">
          Rien de fou ni de magique, saviez-vous qu’il y a plus de 7 000
          terminaisons nerveuses dans chaque pied et plus de 3 000 dans chaque
          main ?
        </p>

        <p className=" text-gray-700 mb-6 text-center text-sm leading-7">
          Ainsi la réflexologie a de nombreux bienfaits tels que : Améliorer la
          circulation sanguine et lymphatique Dissiper le stress et les tensions
          Soulager les différents maux ( tendinites, problèmes digestifs,
          infections diverses…) Favoriser la récupération
        </p>
        <p className=" text-gray-700 mb-6 text-center text-sm leading-7">
          Une séance de réflexologie classique dure habituellement de 30 à 60
          minutes.
        </p>
        <ul className=" text-gray-700 mb-6 text-center text-sm leading-7">
          Je propose également des séances de shiatsu assis pour :
          <li>- son format cours de 20 à 30 minutes.</li>
          <li>- son format cours de 20 à 30 minutes.</li>
          <li>
            - ses points de pression sur le dos, la nuque, la tête, les bras et
            les mains, pour limiter les tensions.
          </li>
          <li>
            - ses points de pression le long de 4 méridiens qui traversent le
            corps et permettent une meilleure circulation de l’énergie vitale.
          </li>
        </ul>
        <p className=" text-gray-700 mb-6  text-sm leading-7 text-center">
          Ces séances de Shiatsu assis permettent une réelle détente physique et
          psychique suffisamment profonde pour lâcher prise et des techniques
          néanmoins tonifiantes pour reprendre une activité derrière sans perdre
          en efficacité.
        </p>
        <p className=" text-gray-700 mb-6  text-center text-sm leading-7">
          Profitez aussi d’une séance de réflexologie plantaire ou palmaire ou
          de shiatsu assis sur votre lieu de travail en groupant votre séance
          avec celles de vos collaborateurs grâce à des séances courtes et
          adaptées! Séance de 15 ou 30 minutes
        </p>
      </section>

      {Object.entries(byCategory).map(([category, catSoins]) => (
        <section key={category} className="max-w-5xl mx-auto p-6">
          <h2 className="text-2xl font-thin mb-6">{category}</h2>
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
            {catSoins.map((soin) => (
              <SoinCard key={soin._id} soin={soin} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
