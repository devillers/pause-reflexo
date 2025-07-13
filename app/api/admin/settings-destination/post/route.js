// app/api/admin/settings-destination/post/route.js

import { connectDb } from "../../../../../lib/db.mjs";
import Settings from "../../../../../models/Settings.mjs";

export async function POST(req) {
  await connectDb();
  const data = await req.json();

  // On force la section à "destination"
  data.section = "destination";

  // Upsert (update si existe, insert sinon)
  const doc = await Settings.findOneAndUpdate(
    { section: "destination" },
    data,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  return Response.json(doc);
}
