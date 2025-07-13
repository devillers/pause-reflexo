// app/components/HeroHeader.jsx
export default function HeroHeader({
  titleLines = [],
  imageUrl,
  description,
  ctaText,
  ctaLink,
}) {
  const sizeClasses = [
    "text-8xl",
    "text-6xl",
    "text-7xl",
    "text-5xl",
    "text-6xl"
  ];

  return (
    <section className="relative">
      <div
        className="relative z-10 mx-auto flex flex-col justify-center min-h-[640px] bg-cover bg-center  p-6"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />
        <div className="relative z-20 max-w-4xl">
          <h1 className="uppercase font-bold max-w-[900px]">
            {titleLines.map((line, i) => (
              <span
                key={i}
                className={`
                  block
                  ${sizeClasses[i] || sizeClasses[sizeClasses.length - 1]}
                  ${i % 2 ? "text-white" : "text-white/70"}
                `}
              >
                {line}
              </span>
            ))}
          </h1>
          {/* Affichage de la description */}
          {description && (
            <p className="mt-6 text-2xl font-medium text-white max-w-2xl drop-shadow">
              {description}
            </p>
          )}
          {/* Affichage du bouton CTA */}
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="mt-6 inline-block bg-[#009992] hover:bg-[#007c78] text-white px-8 py-3 rounded-xl text-lg font-bold transition"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
