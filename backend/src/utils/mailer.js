import nodemailer from 'nodemailer';

const isMailerConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);

const createTransporter = () => {
  if (!isMailerConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();

  if (!transporter) {
    return {
      sent: false,
      reason: 'SMTP non configure'
    };
  }

  const from = process.env.SMTP_FROM || process.env.STORE_EMAIL || 'no-reply@premium-store.com';

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  });

  return { sent: true };
};
