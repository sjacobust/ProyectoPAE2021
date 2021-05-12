const crypto = require('crypto');
const bcrypt = require('bcryptjs');
if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}
const {
  users,
  token
} = require("./../models");

const {
  OAuth2Client
} = require('google-auth-library');
const {
  type
} = require('os');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function getHashedPassword(pwd) {
  let hashedPassword;
  if (process.env.ENCRYPT === 'bcrypt') {
    hashedPassword = bcrypt.hashSync(pwd, 12);
  } else {
    hashedPassword = crypto.scryptSync(pwd, 'salt', 24).toString('hex');
  }

  return hashedPassword;
}

class UserController {

  index(req, res) {
    users.find({}).then(results => {
      res.send(results);
    }).catch(err => {
      console.log('Error usuarios: ', err);
      res.status(400).send(err);
    });
  }

  getAll(req, res) {
    if(req.query.admins && req.query.admins == 'true') {
      users.find({ isAdmin: true }, 0).then(users => {
        res.status(200).send(users);
      }).catch(err => {
        console.log(err);
        res.status(404).send("No users found");
      });
    } else {
      users.find({ isAdmin: false }, 0).then(users => {
        res.status(200).send(users);
      }).catch(err => {
        console.log(err);
        res.status(404).send("No users found");
      });
    }
  }

  getOne(req, res, next) {
    if (req.query.email) {
      users.findOne({
        email: req.query.email
      }).then(result => {
        res.send(result);
      }).catch(err => {
        res.status(400).send(err);
      })
    } else if (req.query.token) {
      token.findUserByToken(req.query.token).then(result => {
        if (result) {
          res.send(result).status(200);
        }
      }).catch(err => {
        console.log(err)
        res.status(400).send({
          message: "Token not Found, logging out"
        });
      });
    } else {
      next()
    }
  }

  login(req, res) {
    const hashedPassword = getHashedPassword(req.body.password);
    users.validate(req.body.email, hashedPassword).then(result => {
      console.log('Result usuario', result);
      if (result) {
        token.create(result[0]._id.toString()).then(tokenResult => {
          console.log('Created token: ', tokenResult);
          console.log("Got to token result");
          res.send(tokenResult.ops[0]);
        }).catch(err => {
          console.log("Failed to token result");
          console.log('Failed to create token', err);
          res.status(404).send();
        });
      } else {
        res.status(400).send("Token not Created");
      }
    }).catch(err => {
      console.log("Failed to token result", err);
      res.status(400).send(err);
    })
  }

  googleLogin(req, res) {

    googleClient.verifyIdToken({
      token: req.body.idToken
    }).then(googleResponse => {
      const responseData = googleResponse.getPayload();
      const email = responseData.email;
      users.findOne({
        email: email
      }).then(response => {
        if (response) {
          console.log('Found user: ', response);
          if (!response.googleId) {
            console.log('Does not have google ID');
            users.updateOne({
              email: email
            }, {
              $set: {
                googleId: req.body.id
              }
            }).then(() => {
              UserController.createToken(response._id, res);
            }).catch(err => {
              console.log('Failed to update user', err);
            });
          } else {
            console.log('Already has google ID');
            UserController.createToken(response._id, res);
          }
        } else {
          // Crear
          users.create({
            name: req.body.name,
            email: email,
            googleId: req.body.id
          }).then(response => {
            UserController.createToken(response.insertedId, res);
          });
        }
      }).catch(err => {
        res.status(400).send();
      });
    }).catch(err => {
      res.status(400).send();
    });
  }

  login2(req, res) {
    users.then(collection => {
      const hashedPassword = getHashedPassword(req.body.password);
      collection.findOne({
        email: req.body.email,
        password: hashedPassword
      }).then(results => {
        if (results) {
          token.create(results._id).then(result => {
            console.log('Created token: ', result);
            res.send(result.ops);
          }).catch(err => {
            console.log('Failed to create token', err);
            res.status(404).send();
          })
        } else {
          res.status(404).send();
        }
      }).catch(err => {
        console.log('Error: ', err);
        res.send(err);
      });
    }).catch(err => {
      res.send(err);
    })
  }

  signup(req, res) {
    const hashedPassword = getHashedPassword(req.body.password);
    const document = {
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,
      password: hashedPassword,
      addresses: [],
      cart: [],
      isAdmin: false
    }
    users.insertOne(document).then(result => {
      res.send(result);
    }).catch(err => {
      console.log('Error: ', err);
      res.status(400).send(err);
    })
  }

  logout(req, res) {
    console.log(req.params.token);
    token.findByToken(req.params.token).then(result => {
      console.log(result);
      if (result) {
        token.deleteToken(req.params.token).then(result => {
          res.end().status(200);
        }).catch(err => {
          console.log("Couldn't delete Token");
          console.error(err);
        });
      } else {
        res.status(400).send("Already Logged Out / Not Logged In");
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({
        message: "Token not Found, logging out"
      });
    });
  }

  addAddresses(req, res) {
    token.findUserByToken(req.body.token).then(result => {
      if (result.length > 0) {
        console.log(result[0]);
        result[0].addresses.push(req.body.address);
        console.log(result[0]);
        users.update(result[0]);
        res.status(200).send({
          message: "Address Added Successfully!"
        });
      }
    }).catch(err => {
      res.status(400).send({
        message: "Couldn't Find Token"
      });
    });
  }

  updateAddress(req, res) {
    token.findUserByToken(req.query.token).then(result => {
      if (result.length > 0) {
        console.log(result[0]);
        if (req.query.address) {
          const index = result[0].addresses.indexOf(req.query.address);

          if (index > -1) {
            result[0].addresses[index] = req.body.address;
          }
          console.log(result[0]);
          users.update(result[0]);
          res.status(200).send({
            message: "Address Removed Successfully!"
          });
        } else {
          res.status(400).send({
            message: "Couldn't update address"
          });
        }
      }
    }).catch(err => {
      res.status(404).send({
        message: "Couldn't Find Token"
      });
    });
  }

  deleteAddress(req, res) {
    token.findUserByToken(req.query.token).then(result => {
      if (result.length > 0) {
        console.log(result[0]);
        if (req.query.address) {
          
          const index = result[0].addresses.indexOf(req.query.address);

          if (index > -1) {
            result[0].addresses.splice(index, 1);
          }
          console.log(result[0]);
          users.update(result[0]);
          res.status(200).send({
            message: "Address Removed Successfully!"
          });
        } else {
          res.status(400).send({
            message: "Couldn't remove address"
          });
        }
      }
    }).catch(err => {
      res.status(400).send({
        message: "Couldn't Find Token"
      });
    });
  }

  deleteUser(req, res) {
    users.findByEmail(req.query.email).then(result => {
      if (result.length > 0) {
        console.log(result[0]);
         users.deleteUser(result[0]).then(response => {
          res.status(200).send("User removed");
         });
      }
    }).catch(err => {
      res.status(400).send({
        message: "Couldn't Find Token"
      });
    });
  }

  addAdmin(req, res) {
    const hashedPassword = getHashedPassword(req.body.password);
    const document = {
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,
      password: hashedPassword,
      addresses: [],
      cart: [],
      isAdmin: true
    }
    users.insertOne(document).then(result => {
      res.send(result);
    }).catch(err => {
      console.log('Error: ', err);
      res.status(400).send(err);
    })
  }

}

module.exports = new UserController();