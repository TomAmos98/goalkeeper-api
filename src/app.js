const express = require('express');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

function sendServerError(res) {
  return res.status(500).json({
    message: 'Internal server error'
  });
}

const goalkeeperValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('club')
    .trim()
    .notEmpty()
    .withMessage('Club is required'),

  body('nationality')
    .trim()
    .notEmpty()
    .withMessage('Nationality is required'),

  body('age')
    .isInt({ min: 16, max: 50 })
    .withMessage('Age must be between 16 and 50')
    .toInt(),

  body('league')
    .trim()
    .notEmpty()
    .withMessage('League is required'),

  body('appearances')
    .isInt({ min: 0 })
    .withMessage('Appearances must be 0 or higher')
    .toInt(),

  body('cleanSheets')
    .isInt({ min: 0 })
    .withMessage('Clean sheets must be 0 or higher')
    .toInt(),

  body('savePercentage')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Save percentage must be between 0 and 100')
    .toFloat()
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
}

// GET all goalkeepers + filtering + pagination
app.get('/api/goalkeepers', (req, res) => {
  try {
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
  } catch (error) {
    sendServerError(res);
  }
});

// GET goalkeeper by id
app.get('/api/goalkeepers/:id', (req, res) => {
  try {
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
  } catch (error) {
    sendServerError(res);
  }
});

// POST create goalkeeper
app.post(
  '/api/goalkeepers',
  goalkeeperValidation,
  handleValidationErrors,
  (req, res) => {
    try {
      const goalkeepers = getGoalkeepers();

      const newGoalkeeper = {
        id:
          goalkeepers.length > 0
            ? Math.max(
                ...goalkeepers.map((goalkeeper) => goalkeeper.id)
              ) + 1
            : 1,
        ...req.body
      };

      goalkeepers.push(newGoalkeeper);
      saveGoalkeepers(goalkeepers);

      res.status(201).json(newGoalkeeper);
    } catch (error) {
      sendServerError(res);
    }
  }
);

// PUT update goalkeeper
app.put(
  '/api/goalkeepers/:id',
  goalkeeperValidation,
  handleValidationErrors,
  (req, res) => {
    try {
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
    } catch (error) {
      sendServerError(res);
    }
  }
);

// DELETE goalkeeper
app.delete('/api/goalkeepers/:id', (req, res) => {
  try {
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
  } catch (error) {
    sendServerError(res);
  }
});

module.exports = app;