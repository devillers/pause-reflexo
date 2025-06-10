// app/api/soins/[slug]/route.js
import { connectDb } from '../../../../lib/db.mjs';
import Soin from '../../../../models/Soin.mjs';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

export async function GET(req, context) {
  try {
    const { slug } = await Promise.resolve(context.params);
    await connectDb();
    const soin = await Soin.findOne({ slug });
    if (!soin)
      return new Response(JSON.stringify({ message: 'Non trouvé' }), { status: 404 });
    return new Response(JSON.stringify(soin), { status: 200 });
  } catch (err) {
    console.error('❌ Error GET /api/soins/[slug]:', err);
    return new Response(JSON.stringify({ message: 'Erreur serveur' }), { status: 500 });
  }
}

export async function PATCH(req, context) {
  try {
    const { slug: original } = await Promise.resolve(context.params);
    const form = await req.formData();
    const update = {};

    if (form.get('title')) update.title = form.get('title');
    if (form.get('description')) update.description = form.get('description');
    if (form.get('category')) update.category = form.get('category');
    if (form.get('slug')) {
      update.slug = slugify(form.get('slug'), { lower: true, strict: true });
    }
    if (form.get('prix')) update.prix = form.get('prix');
    if (form.get('duree')) update.duree = form.get('duree');

    const file = form.get('file');
    if (file && file.size) {
      const buf = Buffer.from(await new Response(file).arrayBuffer());
      const uploaded = await new Promise((res, rej) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'soin', resource_type: 'auto' },
          (err, result) => (err ? rej(err) : res(result))
        );
        streamifier.createReadStream(buf).pipe(stream);
      });
      update.image = uploaded.secure_url;
    }

    await connectDb();
    const soin = await Soin.findOneAndUpdate(
      { slug: original },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!soin)
      return new Response(JSON.stringify({ message: 'Non trouvé' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Mis à jour', soin }), { status: 200 });
  } catch (err) {
    console.error('❌ Error PATCH /api/soins/[slug]:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: err.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { slug } = await Promise.resolve(context.params);
    await connectDb();
    const d = await Soin.findOneAndDelete({ slug });
    if (!d)
      return new Response(JSON.stringify({ message: 'Non trouvé' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Supprimé' }), { status: 200 });
  } catch (err) {
    console.error('❌ Error DELETE /api/soins/[slug]:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: err.message }),
      { status: 500 }
    );
  }
}
