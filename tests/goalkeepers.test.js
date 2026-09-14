const request = require('supertest');
const app = require('../src/app');

describe('GET /api/goalkeepers', () => {
  it('should return all goalkeepers', async () => {
    const response = await request(app).get('/api/goalkeepers');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return goalkeepers from JSON storage', async () => {
    const response = await request(app).get('/api/goalkeepers');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe('Tom Amos');
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
describe('POST /api/goalkeepers', () => {
  it('should create a new goalkeeper', async () => {
    const newGoalkeeper = {
      name: 'Alex Berg',
      club: 'Liverpool',
      nationality: 'Sweden',
      age: 24,
      league: 'Premier League',
      appearances: 18,
      cleanSheets: 7,
      savePercentage: 76
    };

    const response = await request(app)
      .post('/api/goalkeepers')
      .send(newGoalkeeper);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Alex Berg');
    expect(response.body.id).toBeDefined();
  });
});