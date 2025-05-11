// scripts/create-admin.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const email = 'admin@pause-reflexo.com';
const password = 'admin123';
const name = 'Admin';

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI manquant dans .env.local');
}

try {
  await mongoose.connect(MONGODB_URI, {
    dbName: 'pause_reflexo',
  });

  const exists = await User.findOne({ email });
  if (exists) {
    console.log('✅ Cet utilisateur existe déjà.');
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashed,
    role: 'admin',
  });

  console.log(`✅ Utilisateur admin créé : ${email}`);
  process.exit(0);
} catch (err) {
  console.error('❌ Erreur lors de la création de l’admin :', err);
  process.exit(1);
}
