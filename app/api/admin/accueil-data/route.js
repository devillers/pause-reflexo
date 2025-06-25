import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/db.mjs";
import AccueilWeb from "../../../../models/Accueil-web.mjs";

export const dynamic = "force-dynamic";

function normalizeAccueil(doc) {
  return {
    heroTitleLine1: doc?.heroTitleLine1 || "",
    heroTitleLine2: doc?.heroTitleLine2 || "",
    heroTitleLine3: doc?.heroTitleLine3 || "",
    heroTitleLine4: doc?.heroTitleLine4 || "",
    heroTitleLine5: doc?.heroTitleLine5 || "",
    heroImageUrl: doc?.heroImageUrl || "",
    soinsSection: {
      title: doc?.soinsSection?.title || "",
      subtitle: doc?.soinsSection?.subtitle || "",
      tagline: doc?.soinsSection?.tagline || "",
    },
    aboutSection: {
      title: doc?.aboutSection?.title || "",
      paragraphs: Array.isArray(doc?.aboutSection?.paragraphs)
        ? doc.aboutSection.paragraphs
        : [],
    },
    // Ajoute d'autres champs si tu en ajoutes plus tard
  };
}

export async function GET() {
  try {
    await connectDb();
    const doc = await AccueilWeb.findOne().lean();

    // Toujours retourner une structure garantie
    return NextResponse.json(normalizeAccueil(doc));
  } catch (err) {
    console.error("Erreur API Accueil:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
