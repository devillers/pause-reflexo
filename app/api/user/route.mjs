// app/api/users/route.mjs
import { NextResponse } from 'next/server';
import { connectDb }    from '../../../lib/db.mjs';
import User             from '../../../models/user.mjs';

// GET /api/users
export async function GET() {
  await connectDb();
  const users = await User.find();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request) {
  const data = await request.json();
  await connectDb();
  const newUser = await User.create(data);
  return NextResponse.json(newUser, { status: 201 });
}
