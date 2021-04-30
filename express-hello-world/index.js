const express = require('express');
const app = express();

app.use((req, res) => {
  res.send('Greetings!!!');
});

app.listen(3000, () => {
});
