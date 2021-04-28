const Database = require('./database');

class Admins extends Database {

  constructor() {
    console.log("admin model initialized");
    super();
    this.useCollection('admin');

  }

  validate(username, password) {
    return this.findOne({
      email: username,
      password: password
    })
  }
}

module.exports = new Admins();
