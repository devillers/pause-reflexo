import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-8 mt-[20px] ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold uppercase text-[12px]">Vel<span className="text-orange-500 text-[12px]">aya</span></h3>
            
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-justify pr-6 leading-6">
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
             <li className="font-semibold hover:text-[#009992] cursor-pointer">
              <Link
                href="/admin"
                className="hover:text-[#009992] transition-colors duration-200"
              >
               Admin
              </Link>
            </li>
          </ul>
        </div>

     
      </div>
    </footer>
  );
};

export default Footer;
