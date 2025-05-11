// app/api/posts/[slug]/route.js
import { connectDb } from '../../../../lib/db.mjs';
import Post          from '../../../../models/Post.mjs';
import slugify       from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import streamifier   from 'streamifier';

cloudinary.config({
  cloud_name:   process.env.CLOUDINARY_CLOUD_NAME,
  api_key:      process.env.CLOUDINARY_API_KEY,
  api_secret:   process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

export async function GET(req, { params }) {
  try {
    await connectDb();
    const { slug } = params;
    const post = await Post.findOne({ slug }).lean();
    if (!post) {
      return new Response(
        JSON.stringify({ message: 'Post non trouvé' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('❌ Error GET /api/posts/[slug]:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDb();
    const { slug: original } = params;
    const form = await req.formData();
    const update = {};

    if (form.get('title'))       update.title       = form.get('title');
    if (form.get('description')) update.description = form.get('description');
    if (form.get('category'))    update.category    = form.get('category');
    if (form.get('slug')) {
      update.slug = slugify(form.get('slug'), { lower: true, strict: true });
    }

    const file = form.get('file');
    if (file && file.size) {
      const buf = Buffer.from(await new Response(file).arrayBuffer());
      const uploaded = await new Promise((res, rej) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'blog', resource_type: 'auto' },
          (err, result) => (err ? rej(err) : res(result))
        );
        streamifier.createReadStream(buf).pipe(stream);
      });
      update.image = uploaded.secure_url;
    }

    const post = await Post.findOneAndUpdate(
      { slug: original },
      { $set: update },
      { new: true, runValidators: true }
    ).lean();

    if (!post) {
      return new Response(
        JSON.stringify({ message: 'Post non trouvé' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Post mis à jour', post }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('❌ Error PATCH /api/posts/[slug]:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDb();
    const { slug } = params;
    const deleted = await Post.findOneAndDelete({ slug });
    if (!deleted) {
      return new Response(
        JSON.stringify({ message: 'Post non trouvé' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ message: 'Post supprimé' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('❌ Error DELETE /api/posts/[slug]:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
