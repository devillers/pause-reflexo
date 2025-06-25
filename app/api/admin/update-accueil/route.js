//app/api/admin/update-accueil/route.js

import { NextResponse } from "next/server";
import AccueilWeb from "../../../../models/Accueil-web.mjs";
import { connectDb } from "../../../../lib/db.mjs";
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    await connectDb();

    const formData = await req.formData();

    const updates = {
      heroTitleLine1: formData.get("heroTitleLine1") || "",
      heroTitleLine2: formData.get("heroTitleLine2") || "",
      heroTitleLine3: formData.get("heroTitleLine3") || "",
      heroTitleLine4: formData.get("heroTitleLine4") || "",
      heroTitleLine5: formData.get("heroTitleLine5") || "",
      soinsSection: {
        title: formData.get("soinsTitle") || "",
        subtitle: formData.get("soinsSubtitle") || "",
        tagline: formData.get("soinsTagline") || "",
      },
      aboutSection: {
        title: formData.get("aboutTitle") || "",
        paragraphs: [],
      },
    };

    // Collecter les paragraphes dynamiques
    let i = 0;
    while (formData.has(`aboutParagraphs[${i}]`)) {
      const val = formData.get(`aboutParagraphs[${i}]`);
      if (val) updates.aboutSection.paragraphs.push(val);
      i++;
    }

    // Gérer l'image uploadée
    const file = formData.get("newHeroImage");
    if (file && typeof file === "object" && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `hero-${Date.now()}.webp`;
      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
      updates.heroImageUrl = `/uploads/${fileName}`;
    }

    // Enregistrement (update ou create)
    await AccueilWeb.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur update accueil :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
