import Stripe from "stripe";
// import { buffer } from "micro"; // NON utilisé en App Router
import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";
import Reservation from "../../../../models/Reservation";
import { sendConfirmationEmail } from "../../../../lib/sendEmails";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export async function POST(req) {
  console.log("📩 Webhook Stripe reçu !");

  // Récupération de la signature et du corps brut
  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer());
  console.log("🔑 Signature header reçue :", sig ? "[OK]" : "[ABSENTE]");
  console.log("🔎 STRIPE_WEBHOOK_SECRET :", process.env.STRIPE_WEBHOOK_SECRET ? "[OK]" : "[ABSENT]");

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("✅ Signature Stripe OK, event reçu :", event.type, event.id);
  } catch (err) {
    console.error("❌ Erreur signature Stripe :", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Log tout l'event pour debug avancé
  console.log("🌐 Event complet :", JSON.stringify(event, null, 2));

  if (event.type === "checkout.session.completed") {
    await connectDb();
    console.log("🔗 Connexion DB OK");

    const session = event.data.object;
    console.log("🧾 Session Stripe id :", session.id);
    console.log("🧾 Session Stripe metadata :", session.metadata);

    const { slug, nbPlaces, nom, prenom, email } = session.metadata || {};
    console.log("➡️ Recap metadata :", { slug, nbPlaces, nom, prenom, email });

    const sejour = await Sejour.findOne({ slug });
    if (!sejour) {
      console.error("❌ Séjour introuvable :", slug);
      return new Response(null, { status: 400 });
    }
    if (typeof sejour.capacity !== "number" || isNaN(sejour.capacity)) {
      console.error("❌ Capacité du séjour non numérique ou invalide :", sejour.capacity);
      return new Response("Séjour sans capacité numérique valide", { status: 500 });
    }
    if (sejour.capacity < Number(nbPlaces)) {
      console.error("❌ Plus assez de places :", sejour.capacity, "<", nbPlaces);
      return new Response(null, { status: 400 });
    }

    // Décrémenter capacité
    sejour.capacity -= Number(nbPlaces);
    await sejour.save();
    console.log("✅ Capacité décrémentée pour", sejour.titre, "nouvelle capacité :", sejour.capacity);

    // Créer la réservation
    const resa = await Reservation.create({
      sejourSlug: slug,
      acheteur: { nom, prenom, email },
      nbPlaces: Number(nbPlaces),
      montant: session.amount_total / 100,
      statut: "payee",
      stripeSessionId: session.id,
    });
    console.log("✅ Réservation créée en base :", JSON.stringify(resa, null, 2));

    // Envoi email confirmation
    try {
      await sendConfirmationEmail({
        to: email,
        sujet: "Votre réservation est confirmée !",
        html: `<b>Merci pour votre réservation sur ${sejour.titre}</b>`,
      });
      console.log("📧 Email de confirmation envoyé à", email);
    } catch (err) {
      console.error("❌ Échec envoi email :", err.message);
    }
  } else {
    console.log("ℹ️ Event ignoré (type non géré) :", event.type);
  }

  return new Response("OK", { status: 200 });
}
