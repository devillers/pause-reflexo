// app/api/destination/[slug]/route.js

import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../..//models/Sejour";

export async function GET(req, context) {
  const { params } = await Promise.resolve(context);
  await connectDb();
  const sejour = await Sejour.findOne({ slug: params.slug }).lean();
  if (!sejour) return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

// Idem pour PUT et DELETE si tu utilises params.slug
export async function PUT(req, context) {
  const { params } = await Promise.resolve(context);
  await connectDb();
  const data = await req.json();
  delete data.slug;
  const sejour = await Sejour.findOneAndUpdate(
    { slug: params.slug },
    data,
    { new: true }
  ).lean();
  if (!sejour) return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

export async function DELETE(req, context) {
  const { params } = await Promise.resolve(context);
  await connectDb();
  const sejour = await Sejour.findOneAndDelete({ slug: params.slug });
  if (!sejour) return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json({ success: true });
}
