const express = require('express');
const app = express();
const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

app.get('/api/grades', (req, res, next) => {
  const sql = `
  select *
  from "grades";
  `;
  db
    .query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred'
      });
    });
});

app.post('/api/grades', (req, res, next) => {
  if (!(('course' in req.body) && ('name' in req.body) && ('score' in req.body))) {
    res.status(400).send({ error: 'Please make sure to include a course, name, and score' });
  } else {
    if (req.body.score >= 0 && req.body.score <= 100) {
      const sql = `
      insert into "grades" ("course", "name", "score")
      values ($1, $2, $3)
      returning *;
      `;
      const values = [req.body.course, req.body.name, req.body.score];
      db
        .query(sql, values)
        .then(result => {
          res.status(201).json(result.rows[0]);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'An unexpected error occurred'
          });
        });
    } else {
      res.status(400).send({ error: 'score must be a nonnegative integer less than 100' });
    }
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
