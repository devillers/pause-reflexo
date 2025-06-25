// scripts/seedSettings.mjs
import { connectDb } from '../../../../lib/db.mjs';
import AccueilWeb from '../../../../models/Accueil-web.mjs';

async function seed() {
  await connectDb();

  // Supprime l’ancienne config
  await AccueilWeb.deleteMany({});

  // Crée la nouvelle config conforme au schéma
  await AccueilWeb.create({
    // HeroHeader – 5 lignes
    heroTitleLine1: 'Praticienne',
    heroTitleLine2: 'réflexologie',
    heroTitleLine3: '& Shiatsu assis',
    heroTitleLine4: 'au pays du',
    heroTitleLine5: 'Mont-Blanc',
    heroImageUrl:   '/images/header.webp',

    // Section sous-titre : 3 champs à plat (ex "soinsSection" → subTitle1/2/3)
    subTitle1: 'présentation de nos soins',
    subTitle2: 'réflexologie – shiatsu – massages',
    subTitle3: 'une approche globale du bien-être',

    // Section présentation (qui suis-je)
    aboutTitle: 'Qui suis-je ?',
    aboutParagraphs: [
      'Bonjour et bienvenue, Je m’appelle Cécile, amoureuse de ma région et installée à Saint-Nicolas-de-Véroce, au cœur des montagnes qui inspirent mes pratiques. Guidée par une profonde curiosité et riche de plusieurs expériences professionnelles, j’ai trouvé ma vocation : accompagner chacun vers plus de bien-être et de sérénité.',
      'Certifiée en réflexologie plantaire, palmaire, ventrale et crânienne, ainsi qu’en shiatsu assis, je vous propose des séances personnalisées pour soulager le stress, les tensions et la fatigue. À l’image du colibri, je crois que chaque geste compte pour ramener plus d’équilibre dans votre quotidien. Formée au Centre Réflexo Naturel de La Roche-sur-Foron et forte de cinq années d’expérience comme assistante de vie, je suis particulièrement attentive aux besoins des personnes âgées et de leurs proches.',
      'J’interviens à domicile, en entreprise dans le cadre du bien-être au travail, en EHPAD et en résidences seniors, auprès des résidents comme du personnel. À partir de septembre 2025, je vous accueillerai également en cabinet. Je me déplace dans tout le Val Montjoie, le Val d’Arly, le Pays du Mont-Blanc et la Vallée de l’Arve. Offrez-vous un moment de détente… ou faites-en cadeau à ceux que vous aimez ! Contactez-moi pour réserver votre séance.'
    ],
  });

  console.log('✅ Accueil-web seed done');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
