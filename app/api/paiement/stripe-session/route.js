import Stripe from "stripe";
import { connectDb } from "../../../../lib/db.mjs";
import Sejour from "../../../../models/Sejour";

console.log("clé stripe :", process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

export async function POST(req) {
  await connectDb();
  const { slug, nbPlaces, email, nom, prenom } = await req.json();
  const sejour = await Sejour.findOne({ slug });
  if (!sejour || sejour.capacity < nbPlaces) {
    return Response.json({ error: "Plus assez de places" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{
      price_data: {
        currency: "eur",
        product_data: { name: sejour.titre },
        unit_amount: sejour.prix * 100,
      },
      quantity: nbPlaces,
    }],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/reservation/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/reservation/options?cancel=1`,
    metadata: {
      slug,
      nbPlaces,
      nom,
      prenom,
      email,
    },
  });

  return Response.json({ url: session.url });
}
