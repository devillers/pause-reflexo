import nodemailer from "nodemailer";
export async function sendConfirmationEmail({ to, sujet, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: '"SanaLuna" <noreply@tondomaine.fr>',
    to,
    subject: sujet,
    html,
  });
}
