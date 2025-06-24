// app/components/HeroHeader.jsx
export default function HeroHeader({ titleLines = [], imageUrl }) {
  // 1ère ligne = text-8xl, 2ème = text-7xl, etc.
  const sizeClasses = [
    'text-8xl',
    'text-6xl',
    'text-7xl',
    'text-5xl',
    'text-6xl'
  ];

  return (
    <section className="relative">
      <div
        className="relative z-10 mx-auto flex flex-col justify-center min-h-[640px]
                   bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10" />

        <h1 className="uppercase font-bold max-w-[900px] z-20">
          {titleLines.map((line, i) => (
            <span
              key={i}
              className={`
                block
                ${sizeClasses[i] || sizeClasses[sizeClasses.length - 1]}
                ${i % 2 ? 'text-white' : 'text-white/70'}
              `}
            >
              {line}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
