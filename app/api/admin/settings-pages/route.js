// app/api/admin/settings-pages/route.js

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const settingsDir = path.join(process.cwd(), "app", "admin", "settings");

  try {
    const items = fs
      .readdirSync(settingsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        title: formatTitle(dirent.name),
        href: `/admin/settings/${dirent.name}`,
      }));

    return NextResponse.json(items);
  } catch (error) {
    console.error("Erreur lecture dossier settings:", error);
    return NextResponse.json({ error: "Erreur lecture settings" }, { status: 500 });
  }
}

function formatTitle(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
