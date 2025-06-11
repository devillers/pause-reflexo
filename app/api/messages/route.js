import { NextResponse } from 'next/server';
import { connectDb } from '../../../lib/db.mjs';
import Message from '../../../models/Messages.mjs';

export async function GET() {
  await connectDb();
  const messages = await Message.find().sort({ sentAt: -1 }).lean();
  return NextResponse.json(messages);
}