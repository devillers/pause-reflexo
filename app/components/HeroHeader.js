// app/components/HeroHeader.jsx
// app/components/HeroHeader.jsx
export default function HeroHeader({
  titleLines = [],
  imageUrl,
  description,
  ctaText,
  ctaLink,
}) {
  return (
    <section className="relative">
      <div
        className="relative z-10 mx-auto flex flex-col justify-center min-h-[640px] bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />
        <div className="relative z-20 max-w-4xl">
          <h1 className="uppercase font-bold md:max-w-[900px] truncate mb-4">
            {titleLines.map((line, i) => (
              <span
                key={i}
                className={`
                  block
                  text-3xl md:text-6xl
                  ${i % 2 ? "text-white" : "text-white/70 mb-2"}
                `}
              >
                {line}
              </span>
            ))}
          </h1>
          {description && (
            <p className="mt-6 text-xl leading-loose font-thin italic uppercase text-white max-w-2xl drop-shadow">
              {description}
            </p>
          )}
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="mt-6 inline-block bg-pink-500 hover:bg-pink-700 text-white px-8 py-3 rounded-xl text-lg font-bold transition"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
