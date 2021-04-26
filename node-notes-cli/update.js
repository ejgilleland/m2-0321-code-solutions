const fs = require('fs');
const contents = require('./data.json');

const update = function () {
  if (process.argv[3] in contents.notes) {
    contents.notes[process.argv[3]] = process.argv[4];
    fs.writeFile('./data.json', JSON.stringify(contents, null, 2), err => {
      if (err) throw err;
    });
  }
};

module.exports = update;
