import mongoose from "mongoose";

const ConfigWebSchema = new mongoose.Schema(
  {
    // Section singleton ("accueil", "blog", ...)
    section: {
      type: String,
      enum: ["accueil", "blog"], // Ajoute d'autres valeurs si besoin
      required: true,
      unique: true,
    },

    // Champs pour la section Accueil
    heroTitleLine1: { type: String, default: "" },
    heroTitleLine2: { type: String, default: "" },
    heroTitleLine3: { type: String, default: "" },
    heroTitleLine4: { type: String, default: "" },
    heroTitleLine5: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
    subTitle1: { type: String, default: "" },
    subTitle2: { type: String, default: "" },
    subTitle3: { type: String, default: "" },
    aboutTitle: { type: String, default: "" },
    aboutParagraphs: [
  {
    text: { type: String, default: "" },
    imageUrl: { type: String, default: "" }, // facultatif
  }
],

    // Champs pour la section Blog
    blogHeaderImageUrl: { type: String, default: "" },
    blogTitle: { type: String, default: "" },
    blogSubtitle: { type: String, default: "" },
    blogParagraphs: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.ConfigWeb ||
  mongoose.model("ConfigWeb", ConfigWebSchema);
