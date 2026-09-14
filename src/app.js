const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/goalkeepers', (req, res) => {
  res.status(200).json([]);
});

app.get('/api/goalkeepers/:id', (req, res) => {
  const goalkeeper = {
    id: 1,
    name: 'Tom Amos',
    club: 'Arsenal',
    nationality: 'Sweden',
    age: 28,
    league: 'Premier League',
    appearances: 25,
    cleanSheets: 12,
    savePercentage: 78
  };

  res.status(200).json(goalkeeper);
});

module.exports = app;