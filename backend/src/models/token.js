const crypto = require('crypto');
const DBModel = require('./database');

const User = require('./user');

class Token extends DBModel {

  constructor() {
    super();
    this.useCollection("tokens");
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

    return this.insertOne({
      userId: userId,
      token: token,
      createdAt: new Date()
    }, {timestamps:false});
  }

  findByToken(token) {
    return this.findOne({
      token: token
    });
  }

  findUserByToken(token) {
    return new Promise((resolve, reject) => {
      this.findByToken(token).then(response => {
        User.findById(response[0].userId).then(user => {
          resolve(user);
        })
      })
    })
  }

  deleteToken(token){
    return this.deleteOne({token: token});
  }
}

module.exports = new Token();