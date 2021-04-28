const read = require('./read');
const add = require('./add');
const remove = require('./remove');
const update = require('./update');

const action = process.argv[2];

switch (action) {
  case 'read':
    read();
    break;
  case 'add':
    add();
    break;
  case 'remove':
    remove();
    break;
  case 'update':
    update();
    break;
  default:
    console.log('Please enter a valid request');
}
