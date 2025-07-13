//app/api/destination/route.js

import { connectDb } from "../../../lib/db.mjs";
import Sejour from "../../../models/Sejour";

export async function GET() {
  await connectDb();
  const sejours = await Sejour.find().lean();
  return Response.json(sejours);
}

export async function POST(req) {
  await connectDb();
  const data = await req.json();
  if (!data.slug || !data.titre) {
    return new Response(JSON.stringify({ error: "slug et titre requis" }), { status: 400 });
  }
  const sejour = await Sejour.create(data);
  return new Response(JSON.stringify(sejour), { status: 201 });
}

