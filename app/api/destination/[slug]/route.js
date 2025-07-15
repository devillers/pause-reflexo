// app/api/destination/[slug]/route.js

import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";

// --- GET ---
export async function GET(request, { params }) {
  await connectDb();
  const sejour = await Sejour.findOne({ slug: params.slug }).lean();
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json(sejour);
}

// --- PUT ---
export async function PUT(request, { params }) {
  await connectDb();
  const data = await request.json();
  delete data.slug; // Ne pas modifier le slug !
  // Optionnel : clean date (par sécurité, si besoin)
  if (data.dateDebut) data.dateDebut = new Date(data.dateDebut);
  if (data.dateFin) data.dateFin = new Date(data.dateFin);

  if (typeof data.capacity !== "undefined") {
    data.capacity = Number(data.capacity);
    if (isNaN(data.capacity)) delete data.capacity; // Ne pas stocker NaN !
  }

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
export async function DELETE(request, { params }) {
  await connectDb();
  const sejour = await Sejour.findOneAndDelete({ slug: params.slug });
  if (!sejour)
    return Response.json({ error: "Séjour non trouvé" }, { status: 404 });
  return Response.json({ success: true });
}
