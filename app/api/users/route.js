// app/api/users/route.mjs
import { NextResponse } from 'next/server';
import { connectDb } from '../../../lib/db.mjs';
import User from '../../../models/User.mjs';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// GET /api/users
export async function GET() {
  try {
    await connectDb();
    const users = await User.find().lean();
    return NextResponse.json(users);
  } catch (err) {
    console.error('❌ Error GET /api/users:', err);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, role, avatarUrl } = data;
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Champs manquants : name, email et password sont requis' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectDb();
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      avatarUrl: avatarUrl || ''
    });

    const userSafe = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
      createdAt: newUser.createdAt
    };

    return NextResponse.json(userSafe, { status: 201 });
  } catch (err) {
    console.error('❌ Error POST /api/users:', err);
    return NextResponse.json(
      { message: 'Erreur serveur', error: err.message },
      { status: 500 }
    );
  }
}
