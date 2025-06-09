import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import RendezVous from '@/models/RendezVous';

await mongoose.connect(process.env.MONGO_URI);

export async function GET() {
  try {
    const rdvs = await RendezVous.find();
    return NextResponse.json(rdvs);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur récupération rendez-vous' }, { status: 500 });
  }
}
