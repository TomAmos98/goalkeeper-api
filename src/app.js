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

function saveGoalkeepers(goalkeepers) {
  fs.writeFileSync(
    dataFile,
    JSON.stringify(goalkeepers, null, 2)
  );
}

// GET all goalkeepers + filtering + pagination
app.get('/api/goalkeepers', (req, res) => {
  let goalkeepers = getGoalkeepers();

  if (req.query.nationality) {
    goalkeepers = goalkeepers.filter(
      (goalkeeper) =>
        goalkeeper.nationality.toLowerCase() ===
        req.query.nationality.toLowerCase()
    );
  }

  if (req.query.page || req.query.limit) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || goalkeepers.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    goalkeepers = goalkeepers.slice(startIndex, endIndex);
  }

  res.status(200).json(goalkeepers);
});

// GET goalkeeper by id
app.get('/api/goalkeepers/:id', (req, res) => {
  const goalkeepers = getGoalkeepers();
  const id = Number(req.params.id);

  const goalkeeper = goalkeepers.find(
    (goalkeeper) => goalkeeper.id === id
  );

  if (!goalkeeper) {
    return res.status(404).json({
      message: 'Goalkeeper not found'
    });
  }

  res.status(200).json(goalkeeper);
});

// POST create goalkeeper
app.post('/api/goalkeepers', (req, res) => {
  const goalkeepers = getGoalkeepers();

  const newGoalkeeper = {
    id:
      goalkeepers.length > 0
        ? Math.max(...goalkeepers.map((goalkeeper) => goalkeeper.id)) + 1
        : 1,
    ...req.body
  };

  goalkeepers.push(newGoalkeeper);
  saveGoalkeepers(goalkeepers);

  res.status(201).json(newGoalkeeper);
});

// PUT update goalkeeper
app.put('/api/goalkeepers/:id', (req, res) => {
  const goalkeepers = getGoalkeepers();
  const id = Number(req.params.id);

  const goalkeeperIndex = goalkeepers.findIndex(
    (goalkeeper) => goalkeeper.id === id
  );

  if (goalkeeperIndex === -1) {
    return res.status(404).json({
      message: 'Goalkeeper not found'
    });
  }

  const updatedGoalkeeper = {
    id,
    ...req.body
  };

  goalkeepers[goalkeeperIndex] = updatedGoalkeeper;
  saveGoalkeepers(goalkeepers);

  res.status(200).json(updatedGoalkeeper);
});

// DELETE goalkeeper
app.delete('/api/goalkeepers/:id', (req, res) => {
  const goalkeepers = getGoalkeepers();
  const id = Number(req.params.id);

  const goalkeeperIndex = goalkeepers.findIndex(
    (goalkeeper) => goalkeeper.id === id
  );

  if (goalkeeperIndex === -1) {
    return res.status(404).json({
      message: 'Goalkeeper not found'
    });
  }

  goalkeepers.splice(goalkeeperIndex, 1);
  saveGoalkeepers(goalkeepers);

  res.status(200).json({
    message: 'Goalkeeper deleted'
  });
});

module.exports = app;