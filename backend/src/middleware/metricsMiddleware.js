// src/middleware/metricsMiddleware.js
// This runs BEFORE every route handler.
// It starts a timer, then records the duration when the response finishes.

const { httpRequestsTotal, httpRequestDuration } = require('../config/metrics');

function metricsMiddleware(req, res, next) {
  const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });

  res.on('finish', () => {
    httpRequestsTotal.inc({
      method:      req.method,
      route:       req.path,
      status_code: res.statusCode,
    });
    end();
  });

  next(); // pass control to the next middleware / route handler
}

module.exports = metricsMiddleware;
