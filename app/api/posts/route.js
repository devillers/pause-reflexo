// app/api/posts/route.js
import { connectDb }            from '../../../lib/db.mjs';
import Post                     from '../../../models/Post.mjs';
import slugify                  from 'slugify';
import { v2 as cloudinary }     from 'cloudinary';
import streamifier              from 'streamifier';

cloudinary.config({
  cloud_name:   process.env.CLOUDINARY_CLOUD_NAME,
  api_key:      process.env.CLOUDINARY_API_KEY,
  api_secret:   process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDb();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .lean();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ Error GET /api/posts:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  try {
    const form        = await req.formData();
    const title       = form.get('title');
    const description = form.get('description');
    const category    = form.get('category');
    const rawSlug     = form.get('slug');
    const file        = form.get('file');

    if (!title || !description || !rawSlug || !file) {
      return new Response(
        JSON.stringify({ message: 'Champs manquants' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const slug = slugify(rawSlug, { lower: true, strict: true });

    // Upload de l’image vers Cloudinary
    const buffer = Buffer.from(await new Response(file).arrayBuffer());
    const uploaded = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'blog', resource_type: 'auto' },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    await connectDb();
    const postDoc = await Post.create({
      title,
      description,
      category,
      slug,
      image: uploaded.secure_url,
    });

    const post = postDoc.toObject();
    return new Response(
      JSON.stringify({ message: 'Post créé', post }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('❌ Error POST /api/posts:', err);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
