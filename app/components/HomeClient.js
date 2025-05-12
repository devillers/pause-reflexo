'use client';

import { useEffect, useState } from "react";
import HeroHeader from "./HeroHeader";
import ContactForm from "./ContactForm";
import { FiChevronUp } from "react-icons/fi";

export default function HomeClient() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <HeroHeader />

        <section className="max-w-5xl mx-auto p-4 ">
          <div className="flex flex-col text-gray-800 max-w-7xl mx-auto py-6">
            <ul className="py-4">
              <li>
                <h3 className="text-center  text-5xl sm:text-3xl md:text-5xl uppercase font-thin">
                  Cécile Durindel
                </h3>
              </li>
              <li>
                <h2 className="text-center text-2xl sm:text-5xl  mt-2 md:text-4xl uppercase font-thin">
                  réflexologie & Shiatsu assis
                </h2>
              </li>

              <li>
                <h4 className="text-center  text-2xl sm:text-4xl  md:text-4xl uppercase font-thin">
                  au pays du Mont-Blanc
                </h4>
              </li>
            </ul>
            <div className="text-gray-800 max-w-3xl mx-auto flex flex-col my-4">
              <p className=" font-light py-2 italic text-center text-md">
                La réflexologie est une technique ancestrale, douce et profonde
                de digito-pression qui part du principe que les pieds, les
                mains, la tête, divisés en points et en zones réflexes, sont la
                représentation miniature du corps humain.{" "}
              </p>

              <p className="font-light py-2 italic text-center">
                Un toucher spécifique appliqué sur une zone réflexe donnée
                permet d’avoir un effet sur la partie du corps associée afin de
                soulager les tensions ou les déséquilibres qui s’y trouvent et
                ainsi de rétablir l’équilibre naturel du corps ou le maintien de
                celui-ci.{" "}
              </p>

              <p className=" font-light py-2 italic text-center">
                En d’autres mots, l’approche soutient l’organisme afin qu’il
                puisse fonctionner de manière optimale.
              </p>
              <p className="font-light py-2 italic text-center">
                Rien de fou ni de magique, saviez-vous qu’il y a plus de 7 000
                terminaisons nerveuses dans chaque pied et plus de 3 000 dans
                chaque main ?
              </p>
            </div>
          </div>
        </section>

        <section
          id="apropros"
          className="w-full mx-auto bg-[#F7F3EC]/50 my-4 p-4"
        >
          <div className="text-gray-800 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image de profil */}
              <div className="flex-shrink-0 basis-full md:basis-1/3 flex justify-center">
                <img
                  src="/images/cecile-profil.jpeg"
                  alt="Photo du thérapeute"
                  className="w-48 h-48 rounded-full object-cover shadow-md"
                />
              </div>

              {/* Texte */}
              <div className="text-sm font-light leading-6 text-justify space-y-4  py-6 basis-full md:basis-2/3">
                <h5 className="uppercase text-2xl font-thin text-[#009992] mb-6 ">
                  à propos
                </h5>
                <p>
                  Bonjour et bienvenue, Je m’appelle Cécile, amoureuse de ma
                  région et installée à Saint-Nicolas-de-Véroce, au cœur des
                  montagnes qui inspirent mes pratiques.
                </p>
                <p>
                  Guidée par une profonde curiosité et riche de plusieurs
                  expériences professionnelles, j’ai trouvé ma vocation :
                  accompagner chacun vers plus de bien-être et de sérénité.
                </p>
                <p>
                  Certifiée en réflexologie plantaire, palmaire, ventrale et
                  crânienne, ainsi qu’en shiatsu assis, je vous propose des
                  séances personnalisées pour soulager le stress, les tensions
                  et la fatigue. À l’image du colibri, je crois que chaque geste
                  compte pour ramener plus d'équilibre dans votre quotidien.
                </p>
                <p>
                  Formée au Centre Réflexo Naturel de La Roche-sur-Foron et
                  forte de cinq années d’expérience comme assistante de vie, je
                  suis particulièrement attentive aux besoins des personnes
                  âgées et de leurs proches.
                </p>
                <p>
                  J'interviens à domicile, en entreprise dans le cadre du
                  bien-être au travail, en EHPAD et en résidences seniors,
                  auprès des résidents comme du personnel.
                </p>
                <p>
                  À partir de septembre 2025, je vous accueillerai également en
                  cabinet. Je me déplace dans tout le Val Montjoie, le Val
                  d’Arly, le Pays du Mont-Blanc et la Vallée de l’Arve.
                </p>
                <p>
                  Offrez-vous un moment de détente… ou faites-en cadeau à ceux
                  que vous aimez ! Contactez-moi pour réserver votre séance.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full mx-auto ">
          <ContactForm />
        </section>
        {/* Scroll-to-top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            className="fixed bottom-6 right-6 z-50 animate-bounce p-3 rounded-full border-white/20 bg-gray-200/90 hover:bg-gray-200/30 hover:border-white/60 border-2 text-[#006778] transition duration-300"
          >
            <FiChevronUp className="text-2xl" />
          </button>
        )}
      </div>
    
  );
}