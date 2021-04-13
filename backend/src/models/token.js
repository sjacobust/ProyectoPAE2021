const crypto = require('crypto');
const db = require('./../controllers/db.controller');
const DBModel = require('./db');

const User = require('./user');

class Token extends DBModel {

  constructor() {
    super('tokens');
  }

  validate(token, userId) {
    const now = new Date().getTime();
    return this.findOne({
      userId:this.objectId(userId),
      token:token,
      expire_date: { $gt: now }
    });
  }

  create(userId) {
    const date = new Date();
    const expire_date = date.setHours(date.getHours()+1);
    const token = crypto.scryptSync(userId + new Date().getTime(),'salt', 48).toString('hex');

    return super.create({
      userId: userId,
      token: token,
      expire_date: expire_date
    }, {timestamps:false});
  }

  findByToken(token) {
    const now = new Date().getTime();
    return this.findOne({
      token:token,
      expire_date: { $gt: now }
    });
  }

  findUserByToken(token) {
    return new Promise((resolve, reject) => {
      this.findByToken(token).then(response => {
        User.findById(response.userId).then(user => {
          resolve(user);
        })
      })
    })
  }
}

module.exports = new Token();