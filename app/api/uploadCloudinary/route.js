//app/api/uploadCloudinary/route.js

import cloudinary from "../../../lib/cloudinary.mjs";

export const maxSize = 8 * 1024 * 1024;
export const runtime = "nodejs";
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

// SUPPRESSION d’une image Cloudinary
export async function DELETE(req) {
  try {
    const { imageUrl } = await req.json();
    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "No imageUrl provided" }), { status: 400 });
    }

    // Récupérer le public_id depuis l'URL
    const matches = imageUrl.match(/\/([^/]+)\.[a-zA-Z]+$/);
    const publicId = matches ? "blog/" + matches[1] : null;

    if (!publicId) {
      return new Response(JSON.stringify({ error: "public_id not found" }), { status: 400 });
    }

    // Supprime sur Cloudinary
    await cloudinary.uploader.destroy(publicId);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Erreur suppression Cloudinary:", err);
    return new Response(JSON.stringify({ error: "Erreur Cloudinary" }), { status: 500 });
  }
}
