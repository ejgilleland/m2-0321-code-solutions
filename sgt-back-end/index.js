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

app.get('/api/grades', (req, res) => {
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
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.post('/api/grades', (req, res) => {
  if (!(('course' in req.body) && ('name' in req.body) && ('score' in req.body))) {
    res.status(400).json({ error: 'Please make sure to include a course, name, and score' });
  } else {
    if (!!req.body.course && !!req.body.name) {
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
            res.status(500).json({ error: 'An unexpected error occurred' });
          });
      } else {
        res.status(400).json({ error: 'score must be a nonnegative integer less than or equal to 100' });
      }
    } else {
      res.status(400).json({ error: 'course/name values cannot be blank' });
    }
  }
});

app.put('/api/grades/:gradeId', (req, res) => {
  const gradeId = parseInt(req.params.gradeId, 10);
  if (Number.isInteger(gradeId) && gradeId > 0) {
    if (('course' in req.body) || ('name' in req.body) || ('score' in req.body)) {
      if (!(req.body.score >= 0 && req.body.score <= 100) && 'score' in req.body) {
        res.status(400).json({ error: 'score must be a nonnegative integer less than or equal to 100' });
        return;
      }
      if (!req.body.course && 'course' in req.body) {
        res.status(400).json({ error: 'course value cannot be blank' });
        return;
      }
      if (!req.body.name && 'name' in req.body) {
        res.status(400).json({ error: 'name value cannot be blank' });
        return;
      }
      const values = [];
      let text = '';
      let counter = 1;
      for (const property in req.body) {
        switch (property) {
          case 'course':
            values.push(req.body.course);
            (counter === 1)
              ? text += `"course" = $${counter}`
              : text += `,
                "course" = $${counter}`;
            counter++;
            break;
          case 'name':
            values.push(req.body.name);
            (counter === 1)
              ? text += `"name" = $${counter}`
              : text += `,
                "name" = $${counter}`;
            counter++;
            break;
          case 'score':
            values.push(req.body.score);
            (counter === 1)
              ? text += `"score" = $${counter}`
              : text += `,
                "score" = $${counter}`;
            counter++;
            break;
          default:
            break;
        }
      }
      values.push(gradeId);
      const sql = `
            update "grades"
            set ${text}
            where "gradeId" = $${values.length}
            returning *;
            `;
      db
        .query(sql, values)
        .then(result => {
          const grade = result.rows[0];
          if (!grade) {
            res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
          } else {
            res.status(200).json(result.rows[0]);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'An unexpected error occurred' });
        });
    } else {
      res.status(400).json({ error: 'Please include at least one field to update: course, name, score' });
    }
  } else {
    res.status(400).json({ error: 'gradeId must be a positive integer' });
  }
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const gradeId = parseInt(req.params.gradeId, 10);
  if (Number.isInteger(gradeId) && gradeId > 0) {
    const values = [gradeId];
    const sql = `
                delete from "grades"
                where "gradeId" = $1
                returning *;
                `;
    db
      .query(sql, values)
      .then(result => {
        const grade = result.rows[0];
        if (!grade) {
          res.status(404).json({ error: `Cannot find grade with gradeId ${gradeId}` });
        } else {
          res.status(204).send();
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred' });
      });
  } else {
    res.status(400).json({ error: 'gradeId must be a positive integer' });
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
