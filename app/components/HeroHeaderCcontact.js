//app/components/HeroHeaderContact.js

export default function HeroHeader() {
  return (
    <section className="relative">
      <div className="relative z-10 mx-auto justify-center flex flex-col min-h-[640px] bg-white bg-[url(/images/contact.png)] bg-cover bg-center p-6">
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/70 z-10"></div>
        <h1 className="uppercase font-bold max-w-[900px] z-20">
          <span className="text-5xl md:text-8xl text-white/70">
            contactez-moi
          </span>
          <br />
          <span className="text-5xl md:text-8xl text-white">
            pour une seance
          </span>
          <br />
          <span className="text-5xl md:text-7xl text-white/70">
            de réflexologie{" "}
          </span>
          <br />
          <span className="text-5xl md:text-8xl text-white">chez vous </span>
          <br />
          <span className="text-5xl md:text-6xl text-white">
            ou en entrprise
          </span>
        </h1>
      </div>
    </section>
  );
}
