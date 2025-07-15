import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  sejourSlug: String,
  acheteur: {
    nom: String,
    prenom: String,
    email: String,
  },
  voyageurs: [{ nom: String, prenom: String }],
  nbPlaces: Number,
  montant: Number,
  statut: String, // "payee"
  stripeSessionId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);
