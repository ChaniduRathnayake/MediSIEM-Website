const rateLimit = require('express-rate-limit');

// Limits the contact form to 5 submissions per 15 minutes per IP to deter spam.
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again later.',
  },
});

module.exports = contactRateLimiter;
