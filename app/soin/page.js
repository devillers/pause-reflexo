// app/soin/page.js
import Link from "next/link";
import Image from "next/image";
import { connectDb } from "../../lib/db.mjs";
import Soin from "../../models/Soin.mjs";
import HeroHeader from "../components/HeroHeader";

export const runtime = "nodejs";

export default async function SoinPage() {
  // 1) connexion à Mongo
  await connectDb();

  // 2) récupération des soins, triés par catégorie puis date de création
  const soins = await Soin.find().sort({ category: 1, createdAt: -1 }).lean();

  // 3) groupement par catégorie
  const byCategory = soins.reduce((acc, soin) => {
    const cat = soin.category || "Non classé";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(soin);
    return acc;
  }, {});

  return (
    <main>
      <HeroHeader />
      <div className="text-gray-800 max-w-6xl mx-auto p-6">
        <ul className="space-y-1  mb-6">
          <li>
            <h5 className="text-4xl md:text-7xl uppercase font-thin">
              Découvrez
            </h5>
          </li>
          <li>
            <h6 className="text-3xl md:text-6xl uppercase font-thin">
              nos massages
            </h6>
          </li>
          <li>
            <h6 className="text-2xl md:text-4xl uppercase font-thin">
              reflexo et shiatsu
            </h6>
          </li>
        </ul>
      </div>

      {Object.entries(byCategory).map(([category, catSoins]) => (
        <section key={category} className="text-gray-800 max-w-6xl mx-auto p-6">
             <h2 className="text-2xl font-thin mb-4">{category}</h2>
          <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {catSoins.map((soin, i) => (
              <li
                key={soin._id}
                className=" rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/soin/${encodeURIComponent(soin.slug)}`}>
                  <div className="relative group rounded-xl overflow-hidden aspect-square cursor-pointer shadow-md">
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${soin.image})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 transition-all group-hover:bg-opacity-40" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2">
                      <h3 className="text-white text-2xl font-bold mb-2 drop-shadow">
                        {soin.title}
                      </h3>
                      {soin.prix && (
                        <p className="text-white text-md font-bold mb-2">
                          Prix : {soin.prix} €
                        </p>
                      )}
                      {soin.duree && (
                        <p className="text-white text-md font-bold mb-4">
                          Durée : {soin.duree} mn
                        </p>
                      )}
                      <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                        Voir
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
