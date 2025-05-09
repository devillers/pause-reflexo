//app/models/Soin.mjs

import mongoose from 'mongoose';

const SoinSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  image:       { type: String },
  category:    { type: String },
  prix:        { type: String },   // <- nouveau
  duree:       { type: String },   // <- nouveau
  slug:        { type: String, required: true, unique: true },
}, {
  timestamps: true,
  collection: 'soin_posts'
});

export default mongoose.models.Soin || mongoose.model('Soin', SoinSchema);
