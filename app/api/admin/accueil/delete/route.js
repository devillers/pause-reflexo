// app/api/admin/accueil/delete/route.js

import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/db.mjs";
import Settings from "../../../../../models/Settings.mjs";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    console.log("[DELETE API] Connexion à la base...");
    await connectDb();
    // On supprime bien la section accueil uniquement !
    const res = await Settings.deleteOne({ section: "accueil" });
    console.log("[DELETE API] Résultat suppression:", res);

    if (res.deletedCount > 0) {
      console.log("[DELETE API] Document supprimé");
      return NextResponse.json({ success: true });
    } else {
      console.log("[DELETE API] Aucun document supprimé");
      return NextResponse.json({ error: "Aucun document à supprimer." }, { status: 404 });
    }
  } catch (err) {
    console.error("[DELETE API] Erreur suppression:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
