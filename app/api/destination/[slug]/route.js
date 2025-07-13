// app/api/destination/[slug]/route.js

import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";

// --- GET ---
export async function GET(request, context) {
  const { params } = context;
  await connectDb();
  const sejour = await Sejour.findOne({ slug: params.slug }).lean();
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

// --- PUT ---
export async function PUT(request, context) {
  const { params } = context;
  await connectDb();
  const data = await request.json();
  delete data.slug; // Ne pas modifier le slug !
  // Optionnel : clean date (par sécurité, si besoin)
  if (data.dateDebut) data.dateDebut = new Date(data.dateDebut);
  if (data.dateFin) data.dateFin = new Date(data.dateFin);
  const sejour = await Sejour.findOneAndUpdate(
    { slug: params.slug },
    data,
    { new: true }
  ).lean();
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

// --- DELETE ---
export async function DELETE(request, context) {
  const { params } = context;
  await connectDb();
  const sejour = await Sejour.findOneAndDelete({ slug: params.slug });
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json({ success: true });
}
