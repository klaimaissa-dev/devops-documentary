// src/controllers/phasesController.js
const pool = require('../config/db');

async function getAllPhases(req, res) {
  try {
    const result = await pool.query('SELECT * FROM phases ORDER BY step_number ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('[phasesController] getAllPhases:', err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}

async function getPhaseById(req, res) {
  try {
    // $1 is a parameterized query — this prevents SQL injection attacks
    const result = await pool.query('SELECT * FROM phases WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, error: 'Phase not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('[phasesController] getPhaseById:', err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}

module.exports = { getAllPhases, getPhaseById };
