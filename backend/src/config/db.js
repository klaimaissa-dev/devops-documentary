// src/config/db.js
// Why a pool?
// Creating a new DB connection per request costs ~50ms each time.
// A Pool keeps connections open and reuses them — much faster.

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'devops_documentary',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 10,
  idleTimeoutMillis:    30000,
  connectionTimeoutMillis: 2000,
});

pool.connect((err, client, release) => {
  if (err) console.error('[DB] Connection error:', err.message);
  else { console.log('[DB] PostgreSQL connected'); release(); }
});

module.exports = pool;
