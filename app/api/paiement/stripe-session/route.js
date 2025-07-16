// app/api/paiement/stripe-session/route.js

// import Stripe from "stripe";
// import { connectDb } from "@/lib/db.mjs";
// import Sejour from "@/models/Sejour";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(req) {
//   try {
//     await connectDb();

//     const {
//       slug,
//       nbPlaces,
//       email,
//       nom,
//       prenom,
//       telephone,
//       age,
//       voyageurs,
//     } = await req.json();

//     const sejour = await Sejour.findOne({ slug });
//     if (!sejour || sejour.capacity < nbPlaces) {
//       return Response.json({ error: "Plus assez de places" }, { status: 400 });
//     }

//     const dateDebut = new Date(sejour.dateDebut).toLocaleDateString("fr-FR");
//     const dateFin = new Date(sejour.dateFin).toLocaleDateString("fr-FR");

//     const session = await stripe.checkout.sessions.create({
//       customer_email: email,
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "eur",
//             unit_amount: sejour.prix * 100,
//             product_data: {
//               name: sejour.titre,
//               description: `Du ${dateDebut} au ${dateFin}`,
//               images: sejour.heroImage?.url ? [sejour.heroImage.url] : [],
//             },
//           },
//           quantity: nbPlaces,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/options?cancel=1`,
//       metadata: {
//         slug,
//         nbPlaces: nbPlaces.toString(),
//         nom,
//         prenom,
//         email,
//         telephone,
//         age: age.toString(),
//         voyageurs: JSON.stringify(voyageurs),
//       },
//     });

//     return Response.json({ url: session.url });
//   } catch (err) {
//     console.error("Erreur stripe-session:", err);
//     return Response.json({ error: "Une erreur est survenue." }, { status: 500 });
//   }
// }


import Stripe from "stripe";
import { connectDb } from "@/lib/db.mjs";
import Sejour from "@/models/Sejour";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Format date en français
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function POST(req) {
  await connectDb();

  const {
    slug,
    nbPlaces,
    email,
    nom,
    prenom,
    telephone,
    age,
    voyageurs,
  } = await req.json();

  const sejour = await Sejour.findOne({ slug });
  if (!sejour || sejour.capacity < nbPlaces) {
    return Response.json({ error: "Plus assez de places" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ["card"],
    locale: "fr", // ✅ interface en français
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: sejour.prix * 100,
          product_data: {
            name: sejour.titre,
            description: `Du ${formatDate(sejour.dateDebut)} au ${formatDate(sejour.dateFin)}`,
            images: [sejour.heroImage?.url],
          },
        },
        quantity: nbPlaces,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/options?cancel=1`,
    metadata: {
      slug,
      nbPlaces,
      nom,
      prenom,
      email,
      telephone,
      age,
      voyageurs: JSON.stringify(voyageurs),
    },
  });

  return Response.json({ url: session.url });
}
