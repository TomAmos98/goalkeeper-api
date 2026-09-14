const request = require('supertest');
const app = require('../src/app');

describe('GET /api/goalkeepers', () => {
  it('should return all goalkeepers', async () => {
    const response = await request(app).get('/api/goalkeepers');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/goalkeepers/:id', () => {
  it('should return one goalkeeper by id', async () => {
    const response = await request(app).get('/api/goalkeepers/1');

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });
});

describe('GET /api/goalkeepers/:id - not found', () => {
  it('should return 404 if goalkeeper does not exist', async () => {
    const response = await request(app).get('/api/goalkeepers/999');

    expect(response.statusCode).toBe(404);
  });
});