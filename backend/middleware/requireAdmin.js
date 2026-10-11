const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

// Short keys can be guessed; refuse to run the admin API with one.
const MIN_KEY_LENGTH = 24;

const digest = (value) => crypto.createHash('sha256').update(value).digest();

// Guards /api/admin with a shared secret sent as "Authorization: Bearer <key>".
// The admin API stays off (503) until ADMIN_API_KEY is set.
function requireAdmin(req, res, next) {
  const key = process.env.ADMIN_API_KEY || '';
  if (key.length < MIN_KEY_LENGTH) {
    return res.status(503).json({
      success: false,
      message: `Admin API is disabled. Set ADMIN_API_KEY (at least ${MIN_KEY_LENGTH} characters) to enable it.`,
    });
  }

  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  // Compare fixed-length digests so the check takes the same time whatever
  // the token, and timingSafeEqual never sees buffers of different lengths.
  if (!token || !crypto.timingSafeEqual(digest(token), digest(key))) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}

// Counts only failed (4xx/5xx) admin requests, so normal use is never limited
// but key guessing is capped at 20 attempts per 15 minutes per IP.
const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many failed requests. Please try again later.' },
});

module.exports = { requireAdmin, adminRateLimiter, MIN_KEY_LENGTH };
