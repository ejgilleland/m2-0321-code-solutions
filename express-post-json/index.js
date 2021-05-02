const express = require('express');
const app = express();
let nextId = 1;
const grades = {};

app.listen(3000, () => {});

app.use(express.json());

app.get('/api/grades', (req, res) => {
  const gradeArray = [];
  for (const property in grades) {
    gradeArray.push(grades[property]);
  }
  res.json(gradeArray);
});

app.post('/api/grades', (req, res) => {
  const gradeElement = req.body;
  gradeElement.id = nextId;
  grades[nextId] = gradeElement;
  res.status(201).send(grades[nextId]);
  nextId++;
});
