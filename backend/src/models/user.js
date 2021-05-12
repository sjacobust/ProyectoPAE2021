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

  findByEmail(username, password) {
    return this.findOne({
      email: username
    })
  }

  findById(userId) {
    return this.findOne({
      _id: ObjectID(userId)
    });
  }

  updateUser(user) {
    return this.updateOne(user);
  }

  deleteUser(user) {
    return this.deleteOne(user);
  }

}

module.exports = new Users();
