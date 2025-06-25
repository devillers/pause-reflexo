// models/Accueil-web.mjs

import mongoose from "mongoose";

// Schéma principal “Accueil”
const AccueilWebSchema = new mongoose.Schema(
  {
    // 5 lignes de titre
    heroTitleLine1: { type: String, default: "" },
    heroTitleLine2: { type: String, default: "" },
    heroTitleLine3: { type: String, default: "" },
    heroTitleLine4: { type: String, default: "" },
    heroTitleLine5: { type: String, default: "" },

    // Image
    heroImageUrl: { type: String, default: "" },

    // Section sous titre : 3 champs à plat (pas d'objet imbriqué)
    subTitle1: { type: String, default: "" },
    subTitle2: { type: String, default: "" },
    subTitle3: { type: String, default: "" },

    // Section présentation (qui suis-je)
    aboutTitle: { type: String, default: "" },
    aboutParagraphs: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.AccueilWeb ||
  mongoose.model("AccueilWeb", AccueilWebSchema);
