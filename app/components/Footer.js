import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-8 mt-[20px] ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[12px]">Pause</h3>
            <span className="text-[#009992] text-[12px]">Reflexologie</span>
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-justify pr-6 leading-6">
            Cécile Durindel, Praticienne en réflexologie et Shiatsu assis au
            pays du Mont-Blanc
          </p>
        </div>
        <div className="left">
          <h3 className="font-bold text-[12px]">Pages</h3>
          <ul className="text-[10px] text-gray-600 space-y-2 mt-2">
            <li className="hover:text-[#009992] cursor-pointer">
              <Link
                href="/"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Accueil
              </Link>
            </li>
            <li className="hover:text-[#009992] cursor-pointer">
              <Link
                href="/soins"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Les soins
              </Link>
            </li>
            <li className="hover:text-[#009992] cursor-pointer">
              <Link
                href="https://www.crenolibre.fr/moteur/124911_durindel-cecile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Prendre RDV
              </Link>
            </li>
            <li className="hover:text-[#009992] cursor-pointer">
              <Link
                href="/blog"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Blog
              </Link>
            </li>

            <li className="hover:text-[#009992] cursor-pointer">
              <Link
                href="/#contact"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li className="font-semibold hover:text-[#009992] cursor-pointer">
              <Link
                href="/mentions-legales"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Mentions légales
              </Link>
            </li>
            <li className="font-semibold hover:text-[#009992] cursor-pointer">
              <Link
                href="/politique-de-confidentialite"
                className="hover:text-[#009992] transition-colors duration-200"
              >
                Politique de Confidentialité
              </Link>
            </li>
          </ul>
        </div>

        {/* <div>
          <h3 className="font-bold text-[12px]">Zones que nous desservons</h3>
          <ul className="text-[10px] text-gray-600 space-y-2 mt-2">
            <li>Argentière - 74400</li>
            <li>Chamonix - 74400</li>
            <li>Les Houches - 74310</li>
            <li>Saint Gervais les Bains - 74170</li>
            <li>Combloux - 74920</li>
            <li>Megève - 74120</li>
            <li>Sallanches - 74700</li>
          </ul>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
