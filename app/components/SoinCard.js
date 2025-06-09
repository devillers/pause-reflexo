'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function SoinCard({ soin }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex flex-col h-[300px]">
      {/* Dropdown menu bouton */}
      <div className="absolute right-4 top-4 z-20" ref={dropdownRef}>
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 3" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3Zm6.041 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3ZM14 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3Z" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 z-30 w-56 bg-white rounded-lg shadow divide-y divide-gray-100">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a href="tel:+33612345678" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    📞 <span className="ml-2">Réserver par téléphone</span>
                  </a>
                </li>
                <li>
                  <Link href={`/soin/${encodeURIComponent(soin.slug)}`} className="flex items-center px-4 py-2 hover:bg-gray-100">
                    🌐 <span className="ml-2">Réserver sur le site</span>
                  </Link>
                </li>
                <li>
                  <a href="https://www.crenolibre.fr/prendre-rdv/124911_durindel-cecile" target="_blank" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    📅 <span className="ml-2">Réserver sur Crenolibre</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Image & Content */}
      <div className="flex flex-col flex-grow p-4 items-center text-center">
        <div className="w-32 h-32 mb-3 rounded-full overflow-hidden shadow-lg">
          <img src={soin.image} alt={soin.title} className="object-cover w-full h-full" />
        </div>
        <h3 className="my-2 text-md font-light uppercase text-gray-900">{soin.title}</h3>
        {soin.prix && <div className="text-sm text-gray-500">Prix : {soin.prix} €</div>}
        {soin.duree && <div className="text-sm text-gray-500">Durée : {soin.duree} mn</div>}
        <div className="flex-grow"></div>
       
      </div>
    </li>
  );
}
