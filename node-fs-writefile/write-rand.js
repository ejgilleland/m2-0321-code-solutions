const fs = require('fs');
const random = Math.random().toString();

fs.writeFile('random.txt', random, err => {
  if (err) throw err;
});
