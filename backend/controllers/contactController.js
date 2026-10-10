const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const mailer = require('../config/mailer');
const { escapeHtml } = require('../utils/escapeHtml');

// Name of the hidden form field humans never see or fill in. Bots that
// auto-fill every input do, which is how they're caught. Keep in sync with
// frontend/src/components/LeadForm.tsx.
const HONEYPOT_FIELD = 'website';

// POST /api/contact
async function submitContact(req, res, next) {
  // Pretend to succeed so the bot gets no signal to retry differently.
  if (req.body && req.body[HONEYPOT_FIELD]) {
    return res.status(201).json({ success: true });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    const contactMessage = await ContactMessage.create({ name, email, message });

    const transporter = mailer.getTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
          replyTo: email,
          // Strip line breaks so the name can't add extra mail headers.
          subject: `[MediSIEM Website] New message from ${name.replace(/[\r\n]+/g, ' ')}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html:
            `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
            `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
            `<p><strong>Message:</strong></p>` +
            `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        });
      } catch (mailError) {
        // The message is already saved; a mail failure shouldn't fail the request.
        console.error('Failed to send contact email:', mailError.message);
      }
    }

    res.status(201).json({ success: true, data: { _id: contactMessage._id } });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContact, HONEYPOT_FIELD };
