import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";
export default async function handler(req, res) {
  await connectDb();
  const sejours = await Sejour.find().select("slug titre capacity").lean();
  res.status(200).json(sejours);
}
