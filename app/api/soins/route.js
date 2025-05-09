// app/api/soins/route.js
import { connectDb } from '../../../lib/db.mjs';
import Soin          from '../../../models/Soin.mjs';
import slugify      from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import streamifier   from 'streamifier';

cloudinary.config({
  cloud_name:   process.env.CLOUDINARY_CLOUD_NAME,
  api_key:      process.env.CLOUDINARY_API_KEY,
  api_secret:   process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const form        = await req.formData();
    const title       = form.get('title');
    const description = form.get('description');
    const category    = form.get('category');
    const rawSlug     = form.get('slug');
    const prix        = form.get('prix');
    const duree       = form.get('duree');
    const file        = form.get('file');

    if (!title || !description || !rawSlug || !file || !prix || !duree) {
      return new Response(
        JSON.stringify({ message: 'Champs manquants' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const slug = slugify(rawSlug, { lower: true, strict: true });

    // upload image...
    const buf = Buffer.from(await new Response(file).arrayBuffer());
    const uploaded = await new Promise((res, rej) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'soin', resource_type: 'auto' },
        (err, result) => err ? rej(err) : res(result)
      );
      streamifier.createReadStream(buf).pipe(stream);
    });

    await connectDb();
    const soinDoc = await Soin.create({
      title,
      description,
      category,
      slug,
      prix,
      duree,
      image: uploaded.secure_url
    });

    const soin = soinDoc.toObject();
    return new Response(
      JSON.stringify({ message: 'Soin créé', soin }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error(err);
    // Duplicate slug
    if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
      return new Response(
        JSON.stringify({ message: 'Ce slug est déjà utilisé. Choisissez-en un autre.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
