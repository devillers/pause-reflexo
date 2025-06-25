// lib/getAccueilData.js
import mongoose from "mongoose";
import AccueilWeb from "@/models/Accueil-web.mjs";

export async function getAccueilData() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const doc = await AccueilWeb.findOne().lean(); // lean pour object JS pur
  return doc;
}
