// app/api/sendMail/route.js
export const runtime = 'nodejs';  // impératif sous Next.js 15+

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { connectDb } from '../../../lib/db.mjs';
import Message from '../../../models/Messages.mjs';

export async function POST(request) {
  const { name, email, company, country, phone, message, agreed } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json({ success: false, error: 'name, email et message sont requis.' }, { status: 400 });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return NextResponse.json({ success: false, error: 'SMTP non configuré' }, { status: 500 });
  }

  await connectDb();
  const doc = await Message.create({ name, email, company, country, phone, message, agreed });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,  // votre App Password 16 caractères
      },
    });

    // optionnel : vérifier la connexion au serveur SMTP
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: [
        `Nom: ${name}`,
        `Email: ${email}`,
        `Entreprise: ${company}`,
        `Pays: ${country}`,
        `Téléphone: ${phone}`,
        '',
        `Message:`,
        message,
      ].join('\n'),
      html: `<h2>Nouveau message de ${name}</h2>
             <p><strong>Email :</strong> ${email}</p>
             <p><strong>Entreprise :</strong> ${company}</p>
             <p><strong>Pays :</strong> ${country}</p>
             <p><strong>Téléphone :</strong> ${phone}</p>
             <p><strong>Message :</strong><br>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return NextResponse.json({ success: true, id: doc._id, messageId: info.messageId });
  } catch (err) {
    console.error('Mail send error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Erreur interne' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ success: false, error: 'Méthode non autorisée' }, { status: 405 });
}
