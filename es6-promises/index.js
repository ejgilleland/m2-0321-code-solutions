const takeAChance = require('./take-a-chance');

const returnedPromise = takeAChance('Jared');

returnedPromise.then(value => {
  console.log(value);
});

returnedPromise.catch(error => {
  console.error(error.message);
});
