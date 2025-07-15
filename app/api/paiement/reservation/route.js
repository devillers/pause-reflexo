import { connectDb } from "../../../../lib/db.mjs";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
  await connectDb();
  const { session_id } = req.query;
  const resa = await Reservation.findOne({ stripeSessionId: session_id }).lean();
  if (!resa) return res.status(404).json({ error: "Not found" });
  res.status(200).json(resa);
}
