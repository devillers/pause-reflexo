// lib/db.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error('❌ MONGODB_URI is not defined');
    }
    // On précise ici le nom de la DB "pause_reflexo"
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'pause_reflexo'
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
