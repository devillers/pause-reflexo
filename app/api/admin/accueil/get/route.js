// app/api/admin/accueil/get/route.js

import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/db.mjs";
import Settings from "../../../../../models/Settings.mjs"; // renomme AccueilWeb -> Settings !

export const dynamic = "force-dynamic";

function normalizeAccueil(doc) {
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
    // On filtre bien sur la section !
    const doc = await Settings.findOne({ section: "accueil" }).lean();

    if (!doc) {
      return NextResponse.json(
        { error: "Aucun paramètre trouvé pour la page d'accueil." },
        { status: 404 }
      );
    }

    return NextResponse.json(normalizeAccueil(doc));
  } catch (err) {
    console.error("Erreur API Accueil:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
