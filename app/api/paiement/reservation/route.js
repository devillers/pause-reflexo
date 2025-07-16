import { connectDb } from "../../../../lib/db.mjs";
import Reservation from "../../../../models/Reservation";

export async function GET(req) {
  await connectDb();

  // Récupère session_id depuis l’URL
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return Response.json({ error: "Paramètre session_id manquant." }, { status: 400 });
  }

  const resa = await Reservation.findOne({ stripeSessionId: session_id }).lean();
  if (!resa) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(resa, { status: 200 });
}

// Optionnel : Refuse POST, PUT, DELETE
export async function POST() {
  return Response.json({ error: "Méthode non autorisée." }, { status: 405 });
}
export async function PUT() {
  return Response.json({ error: "Méthode non autorisée." }, { status: 405 });
}
export async function DELETE() {
  return Response.json({ error: "Méthode non autorisée." }, { status: 405 });
}
