// app/api/uploadCoudinary/route.mjs

export const maxSize = 8 * 1024 * 1024; // 8 Mo

import cloudinary from "../../../lib/cloudinary.mjs"; // ← utilise ton module partagé, pas de config redondante !

export const runtime     = 'nodejs';
export const maxDuration = 60;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload sur Cloudinary dans le dossier 'blog'
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'blog' },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(buffer);
      });

    const result = await uploadStream();

    return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
  } catch (err) {
    console.error("Erreur upload Cloudinary:", err);
    return new Response(JSON.stringify({ error: 'Cloudinary upload failed' }), { status: 500 });
  }
}
