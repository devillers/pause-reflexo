// lib/getAccueilData.js
import mongoose from "mongoose";
import Settings from "../models/Settings.mjs";

export async function getAccueilData() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const doc = await Settings.findOne().lean(); // lean pour object JS pur
  return doc;
}
