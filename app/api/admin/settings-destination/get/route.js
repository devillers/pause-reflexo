// app/api/admin/settings-destination/get/route.js

import { connectDb } from "../../../../../lib/db.mjs";
import Settings from "../../../../../models/Settings.mjs";

export async function GET() {
  await connectDb();
  const doc = await Settings.findOne({ section: "destination" }).lean();
  // Toujours renvoyer {} si vide (évite un undefined côté client)
  return Response.json(doc || {});
}
