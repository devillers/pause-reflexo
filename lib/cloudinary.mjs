// lib/cloudinary.mjs
import { v2 as cloudinary } from 'cloudinary';

// Décommente ces 2 lignes SEULEMENT si tu exécutes un script Node.js à la main.
// Pour Next.js, NE PAS utiliser dotenv ici : les variables sont déjà injectées.
// import dotenv from 'dotenv';
// dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
