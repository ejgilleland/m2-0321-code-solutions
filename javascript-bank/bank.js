/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
  return this;
}

Bank.prototype = {
  openAccount: function(holder, balance) {
    if (balance > 0) {
      var newAccount = new Account(this.nextAccountNumber, holder);
      newAccount.deposit(balance);
      this.accounts.push(newAccount);
      this.nextAccountNumber++;
      return newAccount.number;
    } else return null;
  },
  getAccount: function(number) {
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].number === number) {
        return this.accounts[i];
      }
    } return null;
  },
  getTotalAssets: function() {
    var total = 0;
    for (let i = 0; i < this.accounts.length; i++) {
      total += this.accounts[i].getBalance();
    }
    return total;
  }
}
