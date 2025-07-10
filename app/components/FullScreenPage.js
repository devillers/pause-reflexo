// components/FullScreenPage.js
"use client";
import { motion } from "framer-motion";

export default function FullScreenPage() { // <--- NOM ! (pas FullScreenBgPage)
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center relative overflow-hidden">
      {/* Vidéo en background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/images/zen.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/zen1.png"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* Contenu centré animé */}
      <motion.div
        initial={{ backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
        whileHover={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative z-20 min-h-screen min-w-full flex items-center justify-center"
        style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
      >
        <p className="w-full p-6 text-7xl font-extrabold sm:text-8xl uppercase text-white ">
          Test de font sur fond transparent
        </p>
      </motion.div>
    </div>
  );
}
