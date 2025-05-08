import { NextResponse } from 'next/server';
import multer from 'multer';
import cloudinary from '../../../lib/cloudinary.mjs';

const upload = multer({ storage: multer.memoryStorage() });
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) =>
    fn(req, res, (err) => (err ? reject(err) : resolve()))
  );
}

export async function POST(req) {
  await runMiddleware(req, {}, upload.single('file'));
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (err, result) => {
        if (err) return reject(err);
        resolve(NextResponse.json(result));
      }
    );
    stream.end(req.file.buffer);
  });
}
