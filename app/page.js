//ap/page.js

import Image from "next/image";
import { connectDb } from "../lib/db.mjs";
import User from "../models/User.mjs";
import HeroHeader from "./components/HeroHeader";

export default async function Home() {
  await connectDb();
  const users = await User.find();

  return (
    <main className="relative">
      <HeroHeader />
      <section>
        <div className="container mx-auto px-4 py-8">
          <ul className="py-4">
            <li>
              <h3 className="text-center text-5xl sm:text-3xl md:text-5xl uppercase font-thin">
                présentation de nos soins
              </h3>
            </li>
            <li>
              <h2 className="text-center text-xl sm:text-3xl my-4  md:text-2xl uppercase font-thin text-[#006778]">
                réflexologie – shiatsu – massages
              </h2>
            </li>
            <li>
              <h4 className="text-center my-4 text-md sm:text-3xl md:text-3xl uppercase font-thin">
                une approche globale du bien-être
              </h4>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-thin mb-6">Qui suis je ? </h2>
        <p className=" text-gray-700 mb-6 text-justify text-sm leading-7">
          Bonjour et bienvenue, Je m’appelle Cécile, amoureuse de ma région et
          installée à Saint-Nicolas-de-Véroce, au cœur des montagnes qui
          inspirent mes pratiques. Guidée par une profonde curiosité et riche de
          plusieurs expériences professionnelles, j’ai trouvé ma vocation :
          accompagner chacun vers plus de bien-être et de sérénité.
        </p>

        <p className=" text-gray-700 mb-6 text-justify text-sm leading-7">
          Certifiée en réflexologie plantaire, palmaire, ventrale et crânienne,
          ainsi qu’en shiatsu assis, je vous propose des séances personnalisées
          pour soulager le stress, les tensions et la fatigue. À l’image du
          colibri, je crois que chaque geste compte pour ramener plus
          d'équilibre dans votre quotidien. Formée au Centre Réflexo Naturel de
          La Roche-sur-Foron et forte de cinq années d’expérience comme
          assistante de vie, je suis particulièrement attentive aux besoins des
          personnes âgées et de leurs proches.
        </p>

        <p className=" text-gray-700 mb-6 text-justify text-sm leading-7">
          J'interviens à domicile, en entreprise dans le cadre du bien-être au
          travail, en EHPAD et en résidences seniors, auprès des résidents comme
          du personnel. À partir de septembre 2025, je vous accueillerai
          également en cabinet. Je me déplace dans tout le Val Montjoie, le Val
          d’Arly, le Pays du Mont-Blanc et la Vallée de l’Arve. Offrez-vous un
          moment de détente… ou faites-en cadeau à ceux que vous aimez !
          Contactez-moi pour réserver votre séance.
        </p>
      </section>

      {/* <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-thin mb-6">Nos praticien·ne·s</h2>
        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {users.map((user) => (
            <li key={user._id} className="flex flex-col items-center">
              <div className="w-32 h-32 mb-3 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={user.image || '/default-avatar.png'}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="my-2 text-md font-light uppercase text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
            </li>
          ))}
        </ul>
      </section> */}
    </main>
  );
}
