// app/api/admin/settings-pages/route.js

import { NextResponse } from "next/server";
import settingsPages from "../../../../data/settings-pages";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // settingsPages doit être un array d'objets { title, href }
    return NextResponse.json(settingsPages);
  } catch (error) {
    console.error("❌ Erreur chargement settingsPages:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
