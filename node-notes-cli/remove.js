const fs = require('fs');
const contents = require('./data.json');

const remove = function () {
  if (process.argv[3] in contents.notes) {
    delete contents.notes[process.argv[3]];
    fs.writeFile('./data.json', JSON.stringify(contents, null, 2), err => {
      if (err) throw err;
    });
  }
};

module.exports = remove;
