'use client';
import { useLayout } from "@/app/LayoutContext"; // <= utilise chemin absolu
import { motion } from "framer-motion";

export default function FullScreenPage() {
  const { isBlurred } = useLayout();

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center relative overflow-hidden">
      {/* Vidéo en background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500"
        src="/images/zen.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/zen1.png"
        style={{
          filter: isBlurred ? "blur(16px)" : "none",
          transition: "filter 0.6s cubic-bezier(.4,0,.2,1)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* Contenu centré animé */}
      <motion.div className="relative z-20 min-h-screen min-w-full flex items-center justify-center">
        <p className="w-full p-6 text-5xl font-extrabold sm:text-7xl uppercase text-white ">
          Test de font sur fond transparent
        </p>
      </motion.div>
    </div>
  )
}
