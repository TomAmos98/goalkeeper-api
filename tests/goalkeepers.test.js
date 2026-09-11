const request = require('supertest');
const app = require('../src/app');

describe('GET /api/goalkeepers', () => {
  it('should return all goalkeepers', async () => {
    const response = await request(app).get('/api/goalkeepers');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});