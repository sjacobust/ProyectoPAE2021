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

  getOne(req, res) {
    users.findOne({
      email: req.query.email
    }).then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err);
    })
  }

  login(req, res) {
    const hashedPassword = getHashedPassword(req.body.password);

    users.validate(req.body.email, hashedPassword).then(result => {
      console.log('Result usuario', result);
      if (result) {
        token.create(result._id).then(tokenResult => {
          console.log('Created token: ', tokenResult);
          res.send(tokenResult.ops[0]);
        }).catch(err => {
          console.log('Failed to create token', err);
          res.status(404).send();
        });
      } else {
        res.status(400).send();
      }
    }).catch(err => {
      res.status(400).send();
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
      password: hashedPassword
    }
    users.insertOne(document).then(result => {
      res.send(result);
    }).catch(err => {
      console.log('Error: ', err);
      res.status(400).send(err);
    })
  }

  static createToken(userId, res) {
    console.log('Will create token now');
    token.create(userId).then(tokenResult => {
      console.log('Created token: ', tokenResult);
      res.send(tokenResult.ops[0]);
    }).catch(err => {
      console.log('Failed to create token', err);
      res.status(404).send(err);
    })
  }
}

module.exports = new UserController();