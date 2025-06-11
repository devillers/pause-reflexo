import { NextResponse } from 'next/server';
import { connectDb } from '../../../../lib/db.mjs';
import User from '../../../../models/User.mjs';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

/* ───────── GET /api/users/:id ───────── */
export async function GET(_, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const user = await User.findById(id).select('-password').lean();
    if (!user)
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: 'Erreur serveur', error: err.message }, { status: 500 });
  }
}

/* ───────── PATCH /api/users/:id ───────── */
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const form  = await req.formData();   // ← multipart

    const update = {};
    if (form.get('name'))       update.name       = form.get('name');
    if (form.get('email'))      update.email      = form.get('email');
    if (form.get('role'))       update.role       = form.get('role');
    if (form.get('avatarUrl') !== null)  // peut être chainvide
      update.avatarUrl = form.get('avatarUrl');

    if (form.get('password')) {
      update.password = await bcrypt.hash(form.get('password'), 10);
    }

    /* ---------- upload nouvel avatar si présent ---------- */
    const file = form.get('avatar');
    if (file && file.size) {
      const buf = Buffer.from(await new Response(file).arrayBuffer());
      const uploaded = await new Promise((res, rej) => {
        const s = cloudinary.uploader.upload_stream(
          { folder: 'avatars', resource_type: 'image' },
          (err, r) => (err ? rej(err) : res(r))
        );
        streamifier.createReadStream(buf).pipe(s);
      });
      update.avatarUrl = uploaded.secure_url;
    }

    await connectDb();
    const updated = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true })
                              .select('-password')          // ne renvoie pas le hash
                              .lean();

    if (!updated)
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('❌ PATCH /api/users/:id :', err);
    return NextResponse.json({ message: 'Erreur serveur', error: err.message }, { status: 500 });
  }
}

/* ───────── DELETE /api/users/:id ───────── */
export async function DELETE(_, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const removed = await User.findByIdAndDelete(id);
    if (!removed)
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    return NextResponse.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    return NextResponse.json({ message: 'Erreur serveur', error: err.message }, { status: 500 });
  }
}
