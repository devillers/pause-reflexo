import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  sejourSlug: String,
  sejourTitre: String, // ✅ nom du séjour
  sejourImage: String, // ✅ image du séjour
  dateDebut: Date,     // ✅ date de début
  dateFin: Date,       // ✅ date de fin
  acheteur: {
    nom: String,
    prenom: String,
    email: String,
    telephone: String, // ✅ numéro de téléphone
    age: Number,       // ✅ âge
  },
 voyageurs: [{
  nom: String,
  prenom: String,
  email: String,
  telephone: String,
}],
  nbPlaces: Number,
  montant: Number,
  statut: String, // "payee"
  stripeSessionId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);
