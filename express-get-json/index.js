const express = require('express');
const app = express();
const gradeArray = [];

app.listen(3000, () => {});
app.get('/api/grades', (req, res) => {
  for (const property in grades) {
    gradeArray.push(grades[property]);
  }
  res.json(gradeArray);
});

const grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};
