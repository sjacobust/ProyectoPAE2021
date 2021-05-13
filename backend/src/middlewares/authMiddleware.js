const {
  token
} = require('./../models/');


const authMiddleware = (req, res, next) => {

  token.findByToken(req.headers.authorization).then(response => {
    if (response) {
      next();
    } else {
      res.status(401).send();
    }
  }).catch(err => {
    res.status(401).send();
  });
}

module.exports = authMiddleware;