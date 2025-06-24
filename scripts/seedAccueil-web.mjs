// scripts/seedSettings.mjs
import { connectDb } from '../lib/db.mjs';
import AccueilWeb    from '../models/Accueil-web.mjs';

async function seed() {
  await connectDb();

  // Supprime l’ancienne config
  await AccueilWeb.deleteMany({});

  // Crée la nouvelle config
  await AccueilWeb.create({
    // HeroHeader – 5 lignes
    heroTitleLine1: 'Praticienne',
    heroTitleLine2: 'réflexologie',
    heroTitleLine3: '& Shiatsu assis',
    heroTitleLine4: 'au pays du',
    heroTitleLine5: 'Mont-Blanc',
    heroImageUrl:   '/images/header.webp',

    // Section “présentation de nos soins”
    soinsSection: {
      title:    'présentation de nos soins',
      subtitle: 'réflexologie – shiatsu – massages',
      tagline:  'une approche globale du bien-être'
    },

    // Section “Qui suis-je ?”
    aboutSection: {
      title: 'Qui suis-je ?',
      paragraphs: [
        'Bonjour et bienvenue, Je m’appelle Cécile, amoureuse de ma région et installée à Saint-Nicolas-de-Véroce, au cœur des montagnes qui inspirent mes pratiques. Guidée par une profonde curiosité et riche de plusieurs expériences professionnelles, j’ai trouvé ma vocation : accompagner chacun vers plus de bien-être et de sérénité.',
        'Certifiée en réflexologie plantaire, palmaire, ventrale et crânienne, ainsi qu’en shiatsu assis, je vous propose des séances personnalisées pour soulager le stress, les tensions et la fatigue. À l’image du colibri, je crois que chaque geste compte pour ramener plus d’équilibre dans votre quotidien. Formée au Centre Réflexo Naturel de La Roche-sur-Foron et forte de cinq années d’expérience comme assistante de vie, je suis particulièrement attentive aux besoins des personnes âgées et de leurs proches.',
        'J’interviens à domicile, en entreprise dans le cadre du bien-être au travail, en EHPAD et en résidences seniors, auprès des résidents comme du personnel. À partir de septembre 2025, je vous accueillerai également en cabinet. Je me déplace dans tout le Val Montjoie, le Val d’Arly, le Pays du Mont-Blanc et la Vallée de l’Arve. Offrez-vous un moment de détente… ou faites-en cadeau à ceux que vous aimez ! Contactez-moi pour réserver votre séance.'
      ]
    },

    // Section “SoinPage”
    soinsPage: {
      heroTitleLines: [
        'Praticienne',
        'réflexologie',
        '& Shiatsu assis',
        'au pays du',
        'Mont-Blanc'
      ],
      heroImageUrl:    '/images/soins-header.webp',
      pageTitle:       'Les Séances',
      introParagraphs: [
        'La réflexologie est une technique ancestrale et douce de digito-pression qui part du principe que les pieds et les mains, divisés en points et en zones réflexes, sont la représentation miniature du corps humain.',
        'Un toucher spécifique appliqué sur une zone réflexe donnée permet d’avoir un effet sur la partie du corps associée afin de soulager les tensions ou les déséquilibres qui s’y trouvent et ainsi de rétablir l’équilibre naturel du corps.',
        'Rien de fou ni de magique, saviez-vous qu’il y a plus de 7 000 terminaisons nerveuses dans chaque pied et plus de 3 000 dans chaque main ?'
      ],
      paragraph_1: [
        'Ainsi la réflexologie a de nombreux bienfaits tels que : améliorer la circulation sanguine et lymphatique, dissiper le stress et les tensions, soulager les différents maux (tendinites, problèmes digestifs, infections diverses…), et favoriser la récupération.'
      ],
      paragraph_2: [
        'Une séance de réflexologie classique dure habituellement de 30 à 60 minutes.'
      ],
      paragraph_3: [
        'Format court de 20 à 30 minutes.',
        'Points de pression sur le dos, la nuque, la tête, les bras et les mains, pour limiter les tensions.',
        'Points de pression le long de 4 méridiens qui traversent le corps et permettent une meilleure circulation de l’énergie vitale.'
      ],
      paragraph_4: [
        'Ces séances de Shiatsu assis permettent une réelle détente physique et psychique suffisamment profonde pour lâcher prise, tout en étant tonifiantes pour reprendre une activité derrière sans perdre en efficacité.',
        'Profitez aussi d’une séance de réflexologie plantaire ou palmaire ou de shiatsu assis sur votre lieu de travail en groupant votre séance avec celles de vos collaborateurs grâce à des séances courtes et adaptées ! Séance de 15 ou 30 minutes.'
      ]
    }
  });

  console.log('✅ Accueil-web seed done');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
