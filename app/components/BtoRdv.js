import Link from "next/link";

export default function RdvButton() {
  return (
    <div className="mt-8 relative flex  items-center">  
      {/* Animated border */}
    

      <Link
        href="https://www.crenolibre.fr/moteur/124911_durindel-cecile"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-20"
      >
  <span className="inline-block font-thin text-white bg-[#009992] shadow-md uppercase px-6 py-3 rounded border-[1px] border-white animate-pulse transition-all duration-800 ease-in-out hover:bg-[#0097a7] cursor-pointer">
  prendre rendez-vous
</span>

      </Link>
    </div>
  );
}
