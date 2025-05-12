'use client';

import React, { useState, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';

export default function FloatingContact() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      // cache le bouton dès qu'on scroll
      setVisible(false);

      // réaffiche 300ms après la fin du scroll
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(true), 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <a
      href="tel:+33609077438"
      className={`
        fixed top-1/4 text-sm animate-bounce
        bg-[#009992] hover:bg-[#087a74]
        text-whited font-light uppercase text-white
        px-4 py-2 rounded-r-full
        flex items-center gap-2
        shadow-lg z-50
        transition-opacity duration-500  /* <-- animation */
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <FiPhone size={18} />
      Contactez-nous
    </a>
  );
}
