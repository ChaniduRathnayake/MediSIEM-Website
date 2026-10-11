// Maps an error to an HTTP status. Bad input reaching Mongoose (failed schema
// validation, malformed ObjectId, duplicate unique key) is the client's fault,
// not a server error.
function statusFor(err) {
  if (err.name === 'ValidationError' || err.name === 'CastError') return 400;
  if (err.code === 11000) return 409;
  return err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
}

// Catch-all error handler. Must be registered last, after all routes.
function errorHandler(err, req, res, next) {
  const statusCode = statusFor(err);
  if (statusCode >= 500) console.error(err.stack);

  const message =
    err.code === 11000
      ? `Duplicate value for ${Object.keys(err.keyValue || {}).join(', ') || 'a unique field'}`
      : err.message || 'Internal server error';

  res.status(statusCode).json({ success: false, message });
}

// Handles requests to undefined routes.
function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}

module.exports = { errorHandler, notFound };
