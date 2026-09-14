const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

const dataFile = path.join(__dirname, '../data/goalkeepers.json');

function getGoalkeepers() {
  const data = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(data);
}

app.get('/api/goalkeepers', (req, res) => {
  const goalkeepers = getGoalkeepers();

  res.status(200).json(goalkeepers);
});

app.get('/api/goalkeepers/:id', (req, res) => {
  const goalkeepers = getGoalkeepers();
  const id = Number(req.params.id);

  const goalkeeper = goalkeepers.find(
    (goalkeeper) => goalkeeper.id === id
  );

  if (!goalkeeper) {
    return res.status(404).json({ message: 'Goalkeeper not found' });
  }

  res.status(200).json(goalkeeper);
});

module.exports = app;