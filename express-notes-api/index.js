const express = require('express');
const fs = require('fs');
const app = express();
const data = require('./data.json');

app.use(express.json());

app.get('/api/notes', (req, res) => {
  const notesArray = [];
  for (const property in data.notes) {
    notesArray.push(data.notes[property]);
  }
  res.status(200).send(notesArray);
});

app.get('/api/notes/:id', (req, res) => {
  if (Number.isInteger(parseFloat(req.params.id)) && (parseFloat(req.params.id) > 0)) {
    if (req.params.id in data.notes) {
      res.status(200).send(data.notes[req.params.id]);
    } else {
      res.status(404).send({ error: 'cannot find note with id ' + req.params.id });
    }
  } else {
    res.status(400).send({ error: 'id must be a positive integer' });
  }
});

app.post('/api/notes', (req, res) => {
  if ('content' in req.body) {
    data.notes[data.nextId] = {
      id: data.nextId,
      content: req.body.content
    };
    data.nextId++;
    fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
      if (err) {
        res.status(500).send({ error: 'An unexpected error occurred.' });
      } else {
        res.status(201).json(data.notes[data.nextId - 1]);
      }
    });
  } else {
    res.status(400).send({ error: 'content is a required field' });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  if (Number.isInteger(parseFloat(req.params.id)) && (parseFloat(req.params.id) > 0)) {
    if (req.params.id in data.notes) {
      delete data.notes[req.params.id];
      fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
        if (err) {
          res.status(500).send({ error: 'An unexpected error occurred.' });
        } else {
          res.status(204).send();
        }
      });
    } else {
      res.status(404).send({ error: 'cannot find note with id ' + req.params.id });
    }
  } else {
    res.status(400).send({ error: 'id must be a positive integer' });
  }
});

app.put('/api/notes/:id', (req, res) => {
  if (Number.isInteger(parseFloat(req.params.id)) && (parseFloat(req.params.id) > 0)) {
    if ('content' in req.body) {
      if (req.params.id in data.notes) {
        data.notes[req.params.id].content = req.body.content;
        fs.writeFile('./data.json', JSON.stringify(data, null, 2), err => {
          if (err) {
            res.status(500).send({ error: 'An unexpected error occurred.' });
          } else {
            res.status(200).send(data.notes[req.params.id]);
          }
        });
      } else {
        res.status(404).send({ error: 'cannot find note with id ' + req.params.id });
      }
    } else {
      res.status(400).send({ error: 'content is a required field' });
    }
  } else {
    res.status(400).send({ error: 'id must be a positive integer' });
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
