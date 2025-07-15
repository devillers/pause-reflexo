import Stripe from "stripe";
import { buffer } from "micro";
import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";
import Reservation from "../../../../models/Reservation";
import { sendConfirmationEmail } from "../../../../lib/sendEmail";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    await connectDb();
    const session = event.data.object;
    const { slug, nbPlaces, nom, prenom, email } = session.metadata;
    const sejour = await Sejour.findOne({ slug });
    if (!sejour || sejour.capacity < Number(nbPlaces)) return res.status(400).end();

    // Décrémenter capacité
    sejour.capacity -= Number(nbPlaces);
    await sejour.save();

    // Créer la réservation
    const resa = await Reservation.create({
      sejourSlug: slug,
      acheteur: { nom, prenom, email },
      nbPlaces: Number(nbPlaces),
      montant: session.amount_total / 100,
      statut: "payee",
      stripeSessionId: session.id,
    });

    // Envoi email confirmation
    await sendConfirmationEmail({
      to: email,
      sujet: "Votre réservation est confirmée !",
      html: `<b>Merci pour votre réservation sur ${sejour.titre}</b>`,
    });
  }

  res.status(200).end();
}
