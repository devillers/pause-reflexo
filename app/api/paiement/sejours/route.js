import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";

// Gestion d’erreur centralisée et headers explicites
export async function GET() {
  try {
    await connectDb();

    // On sélectionne uniquement les champs utiles, tri par titre par défaut
    const sejours = await Sejour.find({}, "slug titre capacity")
      .sort({ titre: 1 })
      .lean();

    return Response.json(sejours, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log l’erreur serveur
    console.error("Erreur GET /api/paiement/sejours :", error);
    return Response.json(
      { error: "Erreur serveur, impossible de récupérer les séjours." },
      { status: 500 }
    );
  }
}

// Optionnel : Refus des autres méthodes HTTP
export async function POST() {
  return Response.json(
    { error: "Méthode non autorisée." },
    { status: 405 }
  );
}
export async function PUT() {
  return Response.json(
    { error: "Méthode non autorisée." },
    { status: 405 }
  );
}
export async function DELETE() {
  return Response.json(
    { error: "Méthode non autorisée." },
    { status: 405 }
  );
}
