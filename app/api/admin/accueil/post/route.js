// app/api/admin/accueil/post/route.js

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
    const body = await req.json();

    // Singleton par section !
    const existing = await Settings.findOne({ section: "accueil" });
    if (existing) {
      return NextResponse.json(
        { error: "Accueil (section) existe déjà, impossible d'en créer un second." },
        { status: 400 }
      );
    }

    // On force bien la section pour ne pas risquer d’erreur côté client
    const doc = new Settings({ ...body, section: "accueil" });
    await doc.save();

    return NextResponse.json(normalizeAccueil(doc));
  } catch (err) {
    console.error("Erreur POST Accueil:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
