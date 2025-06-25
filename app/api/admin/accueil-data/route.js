// app/api/admin/accueil-data/route.js

import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/db.mjs";
import AccueilWeb from "../../../../models/Accueil-web.mjs";

export const dynamic = "force-dynamic";

function normalizeAccueil(doc) {
  // doc peut être null !
  return {
    heroTitleLine1: doc?.heroTitleLine1 || "",
    heroTitleLine2: doc?.heroTitleLine2 || "",
    heroTitleLine3: doc?.heroTitleLine3 || "",
    heroTitleLine4: doc?.heroTitleLine4 || "",
    heroTitleLine5: doc?.heroTitleLine5 || "",
    heroImageUrl: doc?.heroImageUrl || "",
    subTitle1: doc?.subTitle1 || "",
    subTitle2: doc?.subTitle2 || "",
    subTitle3: doc?.subTitle3 || "",
    aboutTitle: doc?.aboutTitle || "",
    aboutParagraphs: Array.isArray(doc?.aboutParagraphs) ? doc.aboutParagraphs : [],
  };
}

export async function GET() {
  try {
    await connectDb();
    const doc = await AccueilWeb.findOne().lean();

    // Toujours retourner la structure à plat selon le modèle
    return NextResponse.json(normalizeAccueil(doc));
  } catch (err) {
    console.error("Erreur API Accueil:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
