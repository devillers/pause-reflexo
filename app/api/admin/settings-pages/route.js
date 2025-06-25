// app/api/admin/settings-pages/route.js

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settingsDir = path.join(process.cwd(), "app", "admin", "settings");

    // Vérifie si le répertoire existe
    if (!fs.existsSync(settingsDir)) {
      console.warn("⚠️ Le dossier 'settings' n'existe pas :", settingsDir);
      return NextResponse.json([], { status: 200 });
    }

    const items = fs
      .readdirSync(settingsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        title: formatTitle(dirent.name),
        href: `/admin/settings/${dirent.name}`,
      }));

    return NextResponse.json(items);
  } catch (error) {
    console.error("❌ Erreur lecture dossier settings:", error);
    return NextResponse.json(
      { error: "Erreur lecture settings" },
      { status: 500 }
    );
  }
}

function formatTitle(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
