// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Redirige TOUT sauf les assets internes (_next, favicon, etc)
  return NextResponse.redirect("https://www.crenolibre.fr/prendre-rdv/124911_durindel-cecile");
}

export const config = {
  matcher: [
    // Redirige toutes les pages publiques sauf assets (tu peux ajuster la règle)
    "/((?!_next|favicon.ico|images|uploads|api|robots.txt|sitemap.xml).*)",
  ],
};
