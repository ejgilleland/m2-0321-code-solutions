/* exported calculator */
var calculator = {
  add: function(x, y) {
    return x + y;
  },
  subtract: function(x, y) {
    return x - y;
  },
  multiply: function(x, y) {
    return x * y;
  },
  divide: function (x, y) {
    return x / y;
  },
  square: function(x) {
    return x * x;
  }
  ,
  sumAll: function(numbers) {
    for (var i = 0, sum = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum;
  },
  getAverage: function(numbers) {
    return this.sumAll(numbers) / numbers.length;
  }
}
