//models/Sejour.mjs

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

// Pour le détail du prix
const priceDetailSchema = new mongoose.Schema(
  {
    inclus: [String],      // Liste des inclus
    nonInclus: [String],   // Liste des non-inclus
    options: [String],     // Liste des options possibles
  },
  { _id: false }
);

// Pour les sections programmatiques par jour
const programmeJourSchema = new mongoose.Schema(
  {
    titre: String,
    details: String,         // Ex: "Randonnée", durée, dénivelé, etc.
    description: String,     // Texte long par jour
    resume: String,          // Résumé court
    petitDej: String,
    dejeuner: String,
    diner: String,
    pointsForts: [String],
    images: [imageSchema],
  },
  { _id: false }
);

const SejourSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  titre: { type: String, required: true },
  destination: String,
  prix: Number,
  resume: String,
  duree: String,
  sport: String,
  niveau: String,
  description: String,
  capacity: Number, // Capacité d'accueil du séjour

  // SECTION HEBERGEMENT
  hebergementTitre: String,           // Titre section hébergement
  hebergementDescriptif: String,      // Description section hébergement
  hebergementPointsForts: [String],   // Points forts de l'hébergement
  hebergementImages: [imageSchema],   // Photos hébergement

  // SECTION PROGRAMME (array d'étapes par jour)
  programme: [programmeJourSchema],   // Chaque jour (titre, desc, détail, etc.)
  programmeDescriptif: String,        // Texte général intro programme

  // SECTION SPORT/NIVEAU/EXPERT
  sportDescriptif: String,         // Explication sportive
  encadrementSportif: String,      // Ex: "Encadrement: Le roadbook numérique..."
  niveauExplication: String,       // Pour expliquer "confirmé", "débutant", etc.
  ageMini: Number,                 // Âge minimum conseillé (optionnel)

  // SECTION PRIX
  prixDetail: priceDetailSchema,   // Inclus, non-inclus, options
  // Les champs "inclus", "nonInclus" et "options" sont donc dans prixDetail, évite la redondance.

  // SECTION POINTS FORTS GÉNÉRAUX
  pointsForts: [String], 

  // HERO ET GALERIES
  heroImage: imageSchema,          // Image principale
  imagesMain: [imageSchema],       // Miniatures pour page liste
  imagesGallery: [imageSchema],    // Galerie page détail

  // NOTE, INFOS SUPPLEMENTAIRES
  aNoterText: String,              // Bloc "À noter" en bas de page

  // DATES DU SEJOUR
  dateDebut: { type: Date, default: null },
  dateFin: { type: Date, default: null },
});

export default mongoose.models.Sejour || mongoose.model("Sejour", SejourSchema);
