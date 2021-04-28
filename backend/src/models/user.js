const Database = require('./database');

class Users extends Database {

  constructor() {
    console.log("user model initialized");
    super();
    this.useCollection('users');

  }

  validate(username, password) {
    return this.findOne({
      email: username,
      password: password
    })
  }
}

module.exports = new Users();
