// app/api/destination/[slug]/route.js

import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";

export async function GET(context) {
  const { params } = await Promise.resolve(context);
  await connectDb();
  const sejour = await Sejour.findOne({ slug: params.slug }).lean();
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

// MAJ séjour
export async function PUT(context) {
  const { params, req } = await Promise.resolve(context);
  await connectDb();
  const data = await req.json();
  delete data.slug;
  const sejour = await Sejour.findOneAndUpdate(
    { slug: params.slug },
    data,
    { new: true }
  ).lean();
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

// Suppression
export async function DELETE(context) {
  const { params } = await Promise.resolve(context);
  await connectDb();
  const sejour = await Sejour.findOneAndDelete({ slug: params.slug });
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json({ success: true });
}
