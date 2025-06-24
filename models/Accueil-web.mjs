// models/Accueil-web.mjs
import mongoose from 'mongoose';

const AccueilWebSchema = new mongoose.Schema({
  // HeroHeader – 5 lignes de titre
  heroTitleLine1: { type: String, default: '' },
  heroTitleLine2: { type: String, default: '' },
  heroTitleLine3: { type: String, default: '' },
  heroTitleLine4: { type: String, default: '' },
  heroTitleLine5: { type: String, default: '' },
  heroImageUrl:   { type: String, default: '/images/header.webp' },

  // Section “présentation de nos soins”
  soinsSection: {
    title:    { type: String, default: '' },
    subtitle: { type: String, default: '' },
    tagline:  { type: String, default: '' }
  },

  // Section “Qui suis-je ?”
  aboutSection: {
    title:      { type: String, default: '' },
    paragraphs: { type: [String], default: [] }
  },

  // Section “SoinPage”
  soinsPage: {
    heroTitleLines:  { type: [String], default: [] },  // lignes pour HeroHeader de la page soins
    heroImageUrl:    { type: String, default: '/images/soins-header.webp' },
    pageTitle:       { type: String, default: 'Les Séances' },
    introParagraphs: { type: [String], default: [] },    // paragraphes d'introduction
    paragraph_1:     { type: [String], default: [] },    // section 1
    paragraph_2:     { type: [String], default: [] },    // section 2
    paragraph_3:     { type: [String], default: [] },    // section 3
    paragraph_4:     { type: [String], default: [] }     // section 4
  },  

  updatedAt: { type: Date, default: Date.now }
});

// Eviter les re-déclarations lors du hot-reload
export default mongoose.models.AccueilWeb
  || mongoose.model('AccueilWeb', AccueilWebSchema);
