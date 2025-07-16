import PDFDocument from "pdfkit";

export async function generateReceipt(reservation, sejour) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const buffers = [];

  doc.on("data", (chunk) => buffers.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(20).text("Reçu de Réservation", { align: "center" }).moveDown(2);

  doc.fontSize(14);
  doc.text(`Séjour : ${reservation.sejourTitre}`);
  doc.text(`Dates : du ${formatDate(reservation.dateDebut)} au ${formatDate(reservation.dateFin)}`);
  doc.text(`Réservé par : ${reservation.acheteur.prenom} ${reservation.acheteur.nom}`);
  doc.text(`Email : ${reservation.acheteur.email}`);
  doc.text(`Places réservées : ${reservation.nbPlaces}`);
  doc.text(`Montant payé : ${reservation.montant} €`);
  doc.text(`Statut : ${reservation.statut}`);
  doc.text(`Date de réservation : ${formatDate(reservation.createdAt)}`);

  doc.end();

  return await new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
  });
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
