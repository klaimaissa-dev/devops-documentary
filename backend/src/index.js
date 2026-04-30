require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const apiRoutes         = require('./routes/api');
const metricsMiddleware = require('./middleware/metricsMiddleware');
const { client }        = require('./config/metrics');

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use(metricsMiddleware);

app.use('/api', apiRoutes);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`[server] http://localhost:4000`);
  console.log(`[metrics] http://localhost:4000/metrics`);
});

module.exports = app;
