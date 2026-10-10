// Catch-all error handler. Must be registered last, after all routes.
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
}

// Handles requests to undefined routes.
function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}

module.exports = { errorHandler, notFound };
