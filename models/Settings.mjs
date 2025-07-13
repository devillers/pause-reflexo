// app/models/settings.mjs

import mongoose from "mongoose";

// Sous-schema pour toute image (url + alt)
const imageSchema = new mongoose.Schema({
  url: { type: String, default: "" },
  alt: { type: String, default: "" },
}, { _id: false });

const ConfigWebSchema = new mongoose.Schema(
  {
    // -------------- Section singleton --------------
    section: {
      type: String,
      enum: ["accueil", "blog", "destination"], // Ajoute ici toutes les sections config globales
      required: true,
      unique: true,
    },

    // -------------- Champs ACCUEIL --------------
    heroTitleLine1: { type: String, default: "" },
    heroTitleLine2: { type: String, default: "" },
    heroTitleLine3: { type: String, default: "" },
    heroTitleLine4: { type: String, default: "" },
    heroTitleLine5: { type: String, default: "" },
    heroImageUrl:   { type: String, default: "" },
    subTitle1:      { type: String, default: "" },
    subTitle2:      { type: String, default: "" },
    subTitle3:      { type: String, default: "" },
    aboutTitle:     { type: String, default: "" },
    aboutParagraphs: [
      {
        text:     { type: String, default: "" },
        imageUrl: { type: String, default: "" },
      }
    ],

    // -------------- Champs BLOG --------------
    blogHeaderImageUrl: { type: String, default: "" },
    blogTitle:          { type: String, default: "" },
    blogSubtitle:       { type: String, default: "" },
    blogParagraphs:     { type: [String], default: [] },

    // -------------- Champs DESTINATION (header page /destination) --------------
    // Tu peux tous les utiliser dans un HeroHeader dynamique !
    heroTitleLines:  { type: [String], default: [] },   // ex: ["Séjours sportifs", "Yoga & Nature"]
    heroImage:       imageSchema,                       // { url, alt }
    heroDescription: { type: String, default: "" },
    heroCtaText:     { type: String, default: "" },     // bouton
    heroCtaLink:     { type: String, default: "" },     // lien du bouton

  },
  { timestamps: true }
);

export default mongoose.models.ConfigWeb ||
  mongoose.model("ConfigWeb", ConfigWebSchema);
