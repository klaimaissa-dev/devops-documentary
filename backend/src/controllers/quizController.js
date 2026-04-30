// src/controllers/quizController.js
const pool = require('../config/db');

async function getQuestions(req, res) {
  try {
    // Note: we SELECT only question + options, NOT correct_answer
    // The answer is never sent to the browser — only checked server-side on submit
    const result = await pool.query('SELECT id, question, options FROM quiz_questions ORDER BY id');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
}

async function submitQuiz(req, res) {
  const { answers } = req.body;
  if (!answers || typeof answers !== 'object')
    return res.status(400).json({ success: false, error: 'answers object required' });

  try {
    const result = await pool.query('SELECT id, correct_answer FROM quiz_questions');
    let score = 0;
    const feedback = result.rows.map((q) => {
      const correct = answers[q.id] === q.correct_answer;
      if (correct) score++;
      return { id: q.id, correct, given: answers[q.id], expected: q.correct_answer };
    });
    const total      = result.rows.length;
    const percentage = Math.round((score / total) * 100);

    await pool.query(
      'INSERT INTO quiz_results (score, total, percentage) VALUES ($1, $2, $3)',
      [score, total, percentage]
    );

    res.json({ success: true, data: { score, total, percentage, feedback } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
}

module.exports = { getQuestions, submitQuiz };
