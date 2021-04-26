const contents = require('./data.json');

const read = function () {
  for (let i = 1; i < contents.nextId; i++) {
    if (i in contents.notes) {
      console.log(i + ': ' + contents.notes[i]);
    }
  }
};

module.exports = read;
