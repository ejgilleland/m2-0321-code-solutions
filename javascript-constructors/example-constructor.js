function ExampleConstructor() {}

console.log('prototype of ExampleConstructor: ', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor.prototype: ', typeof ExampleConstructor.prototype);

var newFunction = new ExampleConstructor();
console.log('newFunction: ', newFunction);
var isInstanceOf = newFunction instanceof ExampleConstructor;
console.log('newFunction instanceof ExampleConstructor: ', isInstanceOf);
