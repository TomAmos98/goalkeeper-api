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

  const id = Number(req.params.id);

  if (id !== goalkeeper.id) {
    return res.status(404).json({ message: 'Goalkeeper not found' });
  }

  res.status(200).json(goalkeeper);
});

module.exports = app;