/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
  return this;
}

Account.prototype = {
  deposit: function (amount) {
    if (amount > 0) {
      this.transactions.push(new Transaction('deposit', amount));
      return true;
    } else {
      return false;
    }
  },
  withdraw: function (amount) {
    if (amount > 0) {
      this.transactions.push(new Transaction('withdrawal', amount));
      return true;
    } else {
      return false;
    }
  },
  getBalance() {
    var balance = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].type === 'deposit') {
        balance += this.transactions[i].amount;
      } else if (this.transactions[i].type === 'withdrawal') {
        balance -= this.transactions[i].amount;
      }
    }
    return balance;
  }
}
