const fs = require('fs');
const contents = require('./data.json');

const add = function () {
  contents.notes[contents.nextId] = process.argv[3];
  contents.nextId += 1;
  fs.writeFile('./data.json', JSON.stringify(contents, null, 2), err => {
    if (err) throw err;
  });
};

module.exports = add;
