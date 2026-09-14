const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../src/app');

const dataFile = path.join(__dirname, '../data/goalkeepers.json');

const originalGoalkeepers = [
  {
    id: 1,
    name: 'Tom Amos',
    club: 'Arsenal',
    nationality: 'Sweden',
    age: 28,
    league: 'Premier League',
    appearances: 25,
    cleanSheets: 12,
    savePercentage: 78
  },
  {
    id: 2,
    name: 'David Nord',
    club: 'Chelsea',
    nationality: 'Sweden',
    age: 26,
    league: 'Premier League',
    appearances: 20,
    cleanSheets: 8,
    savePercentage: 74
  },
  {
    id: 3,
    name: 'Marco Silva',
    club: 'Porto',
    nationality: 'Portugal',
    age: 30,
    league: 'Primeira Liga',
    appearances: 28,
    cleanSheets: 14,
    savePercentage: 81
  }
];

beforeEach(() => {
  fs.writeFileSync(
    dataFile,
    JSON.stringify(originalGoalkeepers, null, 2)
  );
});

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

describe('PUT /api/goalkeepers/:id', () => {
  it('should update an existing goalkeeper', async () => {
    const updatedGoalkeeper = {
      name: 'Tom Amos',
      club: 'Manchester United',
      nationality: 'Sweden',
      age: 28,
      league: 'Premier League',
      appearances: 26,
      cleanSheets: 13,
      savePercentage: 79
    };

    const response = await request(app)
      .put('/api/goalkeepers/1')
      .send(updatedGoalkeeper);

    expect(response.statusCode).toBe(200);
    expect(response.body.club).toBe('Manchester United');
    expect(response.body.savePercentage).toBe(79);
  });
});

describe('DELETE /api/goalkeepers/:id', () => {
  it('should delete an existing goalkeeper', async () => {
    const response = await request(app)
      .delete('/api/goalkeepers/2');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Goalkeeper deleted');

    const getResponse = await request(app)
      .get('/api/goalkeepers/2');

    expect(getResponse.statusCode).toBe(404);
  });
});