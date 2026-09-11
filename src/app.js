const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/goalkeepers', (req, res) => {
  res.status(200).json([]);
});

module.exports = app;