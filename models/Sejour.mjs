//models/Sejour.mjs

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: "" },
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
  pointsForts: [String],
  heroImage: imageSchema, // Image header
  imagesMain: [imageSchema], // Miniatures pour page liste
  imagesGallery: [imageSchema], // Galerie page détail

  // ---------------- NOUVEAU CHAMP ICI ----------------
  dateDebut: { type: Date, default: null },
  dateFin: { type: Date, default: null },
});

export default mongoose.models.Sejour || mongoose.model("Sejour", SejourSchema);
