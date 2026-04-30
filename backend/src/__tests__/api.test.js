// We mock the DB pool so tests never need a real database
jest.mock('../config/db', () => ({
  query:   jest.fn(),
  connect: jest.fn((cb) => cb(null, {}, jest.fn())),
}));

const request = require('supertest');
const app     = require('../index');
const pool    = require('../config/db');

describe('GET /api/health', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/phases', () => {
  it('returns phases array', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'Plan' }] });
    const res = await request(app).get('/api/phases');
    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].name).toBe('Plan');
  });

  it('returns 500 on DB error', async () => {
    pool.query.mockRejectedValueOnce(new Error('DB down'));
    const res = await request(app).get('/api/phases');
    expect(res.statusCode).toBe(500);
  });
});

describe('GET /api/phases/:id', () => {
  it('returns 404 for unknown id', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/api/phases/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/quiz/submit', () => {
  it('rejects missing answers', async () => {
    const res = await request(app).post('/api/quiz/submit').send({});
    expect(res.statusCode).toBe(400);
  });

  it('scores correctly', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1, correct_answer: 'b' }] })
      .mockResolvedValueOnce({ rows: [] });
    const res = await request(app).post('/api/quiz/submit').send({ answers: { 1: 'b' } });
    expect(res.body.data.percentage).toBe(100);
  });
});
