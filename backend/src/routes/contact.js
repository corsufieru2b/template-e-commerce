import express from 'express';
import { sendEmail } from '../utils/mailer.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, orderNumber, message, consent } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        error: 'Tous les champs obligatoires doivent etre remplis'
      });
    }

    if (!consent) {
      return res.status(400).json({
        error: 'Le consentement est requis'
      });
    }

    const destination = process.env.SUPPORT_CONTACT_EMAIL || process.env.STORE_EMAIL || 'contact@premium-store.com';

    const html = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Commande:</strong> ${orderNumber || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, '<br/>')}</p>
    `;

    const result = await sendEmail({
      to: destination,
      subject: `Contact client - ${firstName} ${lastName}`,
      text: `${firstName} ${lastName} (${email})\nCommande: ${orderNumber || 'N/A'}\n\n${message}`,
      html
    });

    res.status(200).json({
      message: result.sent
        ? 'Message envoye avec succes'
        : 'Message recu. SMTP non configure, envoi email ignore.',
      emailSent: result.sent
    });
  } catch (error) {
    next(error);
  }
});

export default router;
