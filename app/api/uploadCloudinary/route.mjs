// app/api/uploadCoudinary/route.mjs

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name:    process.env.CLOUDINARY_CLOUD_NAME,
  api_key:       process.env.CLOUDINARY_API_KEY,
  api_secret:    process.env.CLOUDINARY_API_SECRET,
});

export const runtime     = 'nodejs';
export const maxDuration = 60;

export async function POST(req) {
  const formData = await req.formData();
  const file     = formData.get('file');

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadStream = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'blog' },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(buffer);
    });

  try {
    const result = await uploadStream();
    return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Cloudinary upload failed' }), { status: 500 });
  }
}
