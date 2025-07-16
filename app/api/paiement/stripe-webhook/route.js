//app/api/paiement/stripe-webhook/route.js




// import Stripe from "stripe";
// import { connectDb } from "@/lib/db.mjs";
// import Sejour from "@/models/Sejour";
// import Reservation from "@/models/Reservation";
// import { sendConfirmationEmail } from "@/lib/sendEmails";

// export const config = { api: { bodyParser: false } };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req) {
//   console.log("📩 Webhook Stripe reçu !");

//   const sig = req.headers.get("stripe-signature");
//   const buf = Buffer.from(await req.arrayBuffer());

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       buf,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//     console.log("✅ Signature Stripe OK :", event.type, event.id);
//   } catch (err) {
//     console.error("❌ Signature invalide :", err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     await connectDb();
//     console.log("🔗 Connexion DB OK");

//     const session = event.data.object;
//     const {
//       slug,
//       nbPlaces,
//       nom,
//       prenom,
//       email,
//       telephone,
//       age,
//     } = session.metadata || {};

//     console.log("📦 Metadata Stripe reçue :", {
//       slug,
//       nbPlaces,
//       nom,
//       prenom,
//       email,
//       telephone,
//       age,
//     });

//     const sejour = await Sejour.findOne({ slug });
//     if (!sejour) {
//       console.error("❌ Séjour introuvable :", slug);
//       return new Response("Séjour introuvable", { status: 404 });
//     }

//     if (sejour.capacity < Number(nbPlaces)) {
//       console.error("❌ Pas assez de places disponibles");
//       return new Response("Plus assez de places", { status: 400 });
//     }

//     sejour.capacity -= Number(nbPlaces);
//     await sejour.save();
//     console.log("✅ Capacité mise à jour :", sejour.capacity);

//     const resa = await Reservation.create({
//       sejourSlug: slug,
//       sejourTitre: sejour.titre,
//       sejourImage: sejour.heroImage?.url,
//       dateDebut: sejour.dateDebut,
//       dateFin: sejour.dateFin,
//       acheteur: { nom, prenom, email, telephone, age },
//       nbPlaces: Number(nbPlaces),
//       montant: session.amount_total / 100,
//       statut: "payee",
//       stripeSessionId: session.id,
//     });

//     console.log("✅ Réservation enregistrée :", resa._id);

//     try {
//       await sendConfirmationEmail({
//         to: email,
//         sujet: "Votre réservation est confirmée !",
//         html: `
//           <p>Bonjour ${prenom},</p>
//           <p>Merci pour votre réservation au séjour <b>${sejour.titre}</b>, du ${new Date(sejour.dateDebut).toLocaleDateString()} au ${new Date(sejour.dateFin).toLocaleDateString()}.</p>
//           <p>À bientôt !</p>
//         `,
//       });
//       console.log("📧 Email de confirmation envoyé à", email);
//     } catch (err) {
//       console.error("❌ Échec de l'envoi de l'email :", err.message);
//     }
//   }

//   return new Response("OK", { status: 200 });
// }


import Stripe from "stripe";
import { connectDb } from "@/lib/db.mjs";
import Sejour from "@/models/Sejour";
import Reservation from "@/models/Reservation";
import { sendConfirmationEmail } from "@/lib/sendEmails";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer());

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    await connectDb();

    const session = event.data.object;
    const {
      slug,
      nbPlaces,
      nom,
      prenom,
      email,
      telephone,
      age,
      voyageurs: voyageursRaw,
    } = session.metadata || {};

    const sejour = await Sejour.findOne({ slug });
    if (!sejour || sejour.capacity < Number(nbPlaces)) {
      return new Response("Erreur : places insuffisantes", { status: 400 });
    }

    sejour.capacity -= Number(nbPlaces);
    await sejour.save();

    const voyageurs = voyageursRaw ? JSON.parse(voyageursRaw) : [];

    await Reservation.create({
      sejourSlug: slug,
      sejourTitre: sejour.titre,
      sejourImage: sejour.heroImage?.url,
      dateDebut: sejour.dateDebut,
      dateFin: sejour.dateFin,
      acheteur: { nom, prenom, email, telephone, age },
      voyageurs,
      nbPlaces: Number(nbPlaces),
      montant: session.amount_total / 100,
      statut: "payee",
      stripeSessionId: session.id,
    });

    try {
      await sendConfirmationEmail({
        to: email,
        sujet: "Votre réservation est confirmée !",
        html: `<p>Merci pour votre réservation du séjour <b>${sejour.titre}</b>.</p>`,
      });
    } catch (err) {
      console.error("❌ Email échoué :", err.message);
    }
  }

  return new Response("OK", { status: 200 });
}
