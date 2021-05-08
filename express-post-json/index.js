const express = require('express');
const app = express();
let nextId = 1;
const grades = {};

app.use(express.json());

app.get('/api/grades', (req, res) => {
  const gradeArray = [];
  for (const property in grades) {
    gradeArray.push(grades[property]);
  }
  res.json(gradeArray);
});

app.post('/api/grades', (req, res) => {
  if (('name' in req.body) && ('course' in req.body) && ('score' in req.body)) {
    grades[nextId] = {
      id: nextId,
      name: req.body.name,
      course: req.body.course,
      score: req.body.score
    };
    res.status(201).send(grades[nextId]);
    nextId++;
  } else {
    res.status(400).send('Bad Request.');
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
