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

  update(user) {
    console.log("Update", user);
    return this.updateOne(user);
  }

}

module.exports = new Users();
