const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const x = parseFloat(process.argv[2]);
const operation = process.argv[3];
const y = parseFloat(process.argv[4]);

switch (operation) {
  case 'plus':
    console.log('result:', add(x, y));
    break;
  case 'minus':
    console.log('result:', subtract(x, y));
    break;
  case 'times':
    console.log('result:', multiply(x, y));
    break;
  case 'over':
    console.log('result:', divide(x, y));
    break;
  default:
    console.log('Please enter "plus", "minus", "times", or "over" for your 2nd argument.');
}
