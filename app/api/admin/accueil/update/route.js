// app/api/admin/accueil/update/route.js

import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/db.mjs";
import Settings from "../../../../../models/Settings.mjs";

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

export async function POST(req) {
  try {
    await connectDb();

    // Vérifie le Content-Type
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    // Parse le JSON du body
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Update UNIQUEMENT le document section="accueil" (singleton)
    const updated = await Settings.findOneAndUpdate(
      { section: "accueil" },
      { ...body },
      { new: true, upsert: false } // upsert: false => jamais de création ici
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Aucun document Accueil à modifier." },
        { status: 404 }
      );
    }

    return NextResponse.json(normalizeAccueil(updated));
  } catch (err) {
    console.error("Erreur update Accueil:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
