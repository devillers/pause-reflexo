// app/api/admin/accueil/delete/route.js
import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/db.mjs";
import Settings from "../../../../../models/Settings.mjs";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await connectDb();
    const deleted = await Settings.findOneAndDelete({ section: "accueil" });
    if (!deleted) {
      return NextResponse.json({ error: "Aucun document à supprimer" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
