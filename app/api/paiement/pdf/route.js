// app/api/paiement/pdf/route.js

import { connectDb } from "@/lib/db.mjs";
import Reservation from "@/models/Reservation";
import Sejour from "@/models/Sejour";
import { generateReceipt } from "@/lib/pdf/generateReceipt";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) return new Response("session_id manquant", { status: 400 });

  await connectDb();

  const resa = await Reservation.findOne({ stripeSessionId: session_id }).lean();
  if (!resa) return new Response("Réservation non trouvée", { status: 404 });

  const sejour = await Sejour.findOne({ slug: resa.sejourSlug }).lean();
  if (!sejour) return new Response("Séjour non trouvé", { status: 404 });

  const pdfBuffer = await generateReceipt(resa, sejour);

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=recu_reservation.pdf",
    },
  });
}
