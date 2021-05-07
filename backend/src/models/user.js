const Database = require('./database');
const ObjectID = require('mongodb').ObjectID;

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

  findById(userId) {
    return this.findOne({
      _id: ObjectID(userId)
    });
  }

}

module.exports = new Users();
