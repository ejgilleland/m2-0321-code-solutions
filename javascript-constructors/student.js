/* exported Student */
function Student(firstName, lastName, subject) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.subject = subject;
}

Student.prototype = {
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  getIntroduction: function() {
    var intro = 'Hello, my name is ' + this.getFullName() +
      ' and I am studying ' + this.subject + '.';
    return intro;
  }
}
