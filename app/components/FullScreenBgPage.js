export default function FullScreenBgPage() {
  return (
    <div
      className="min-h-screen min-w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/background.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Contenu centré */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center backdrop-blur">
        <h1 className="text-3xl font-bold mb-4 text-[#bd9254] drop-shadow-lg">Bienvenue</h1>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Page full screen avec image de fond, overlay sombre, et contenu centré.
        </p>
        <button className="px-6 py-2 bg-[#bd9254] text-white rounded-full font-semibold shadow hover:bg-[#a07c3d] transition">
          Action principale
        </button>
      </div>
    </div>
  );
}
