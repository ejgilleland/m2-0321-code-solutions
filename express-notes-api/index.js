const express = require('express');
const app = express();
const data = require('./data.json');

app.get('/api/notes', (req, res) => {
  const notesArray = [];
  for (const property in data.notes) {
    notesArray.push(data.notes[property]);
  }
  res.json(notesArray);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
