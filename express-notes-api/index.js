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

app.get('/api/notes/:id', (req, res) => {
  if (Number.isInteger(parseFloat(req.params.id)) && (parseFloat(req.params.id) > 0)) {
    if (req.params.id in data.notes) {
      res.status(200).json(data.notes[req.params.id]).send();
    } else {
      res.status(404).json({ error: 'cannot find note with id ' + req.params.id }).send();
    }
  } else {
    res.status(400).json({ error: 'id must be a positive integer' }).send();
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
