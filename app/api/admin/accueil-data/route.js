//app/api/admin/accueil-data/route.js

import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/db.mjs";
import AccueilWeb from "../../../../models/Accueil-web.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDb();
    const doc = await AccueilWeb.findOne().lean();

    if (!doc) {
      return NextResponse.json({
        heroTitleLine1: "",
        heroTitleLine2: "",
        heroTitleLine3: "",
        heroTitleLine4: "",
        heroTitleLine5: "",
        heroImageUrl: "",
        soinsSection: { title: "", subtitle: "", tagline: "" },
        aboutSection: { title: "", paragraphs: [] },
      });
    }

    return NextResponse.json(doc);
  } catch (err) {
    console.error("Erreur API Accueil:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

