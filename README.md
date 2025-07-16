1. 📤 Création de la session Stripe
Route : POST /api/paiement/stripe-session

Reçoit : { slug, nbPlaces, email, nom, prenom }

Vérifie que le séjour existe et a suffisamment de places

Crée une checkout.session avec metadata

Renvoie l’URL Stripe

✅ Important : metadata contient les infos nécessaires au webhook (slug, email...)

2. 💳 Paiement Stripe
Redirection vers Stripe : L’utilisateur paie sur Stripe Checkout.

3. 📬 Webhook Stripe
Route : POST /api/paiement/stripe-webhook

Écoute checkout.session.completed

Vérifie la signature stripe-signature avec process.env.STRIPE_WEBHOOK_SECRET

Extrait les infos de session (slug, email, etc.)

Récupère le séjour concerné

Vérifie la capacité restante

Décrémente la capacity du séjour

Enregistre la Reservation :

js
Copier
Modifier
{
  sejourSlug,
  acheteur: { nom, prenom, email },
  nbPlaces,
  montant,
  statut: "payee",
  stripeSessionId
}
Envoie un email de confirmation

4. 📦 Page de confirmation
URL : /reservation/confirmation?session_id={CHECKOUT_SESSION_ID}
Route API : GET /api/paiement/reservation?session_id=...

Le composant React ConfirmationPage appelle cette route

Affiche les infos de la réservation (slug, places, email)

📂 FICHIERS CLÉS
Fichier	Rôle
app/api/paiement/stripe-session/route.js	Crée la session Stripe
app/api/paiement/stripe-webhook/route.js	Gère le webhook et enregistre la réservation
app/api/paiement/reservation/route.js	Récupère une réservation confirmée
models/Sejour.js	Modèle du séjour
models/Reservation.js	Modèle de réservation
lib/sendEmails.js	Fonction d’envoi d’email de confirmation
app/reservation/confirmation/page.js	Page frontend de confirmation post-paiement

🔐 ENV VARS REQUISES
env
Copier
Modifier
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
📦 DONNÉES ENREGISTRÉES EN BASE
Collection reservations :

js
Copier
Modifier
{
  _id: ObjectId,
  sejourSlug: "yoga_aux_choseaux",
  acheteur: {
    nom: "David",
    prenom: "Devillers",
    email: "david@example.com"
  },
  nbPlaces: 1,
  montant: 900,
  statut: "payee",
  stripeSessionId: "cs_test_..."
}
🔍 TESTS ET DÉBOGAGE
Webhook local :
bash
Copier
Modifier
stripe listen --forward-to localhost:3000/api/paiement/stripe-webhook
Déclencher un test :
bash
Copier
Modifier
stripe trigger checkout.session.completed

MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MONGO_USER_PASS=


NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

GMAIL_USER=
GMAIL_PASS=