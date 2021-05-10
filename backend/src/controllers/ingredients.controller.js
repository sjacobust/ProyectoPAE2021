if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

const {
  ingredients
} = require('./../models');

class IngredientsController {

  getIngredients(req, res) {
    let limit = parseInt(req.query.limit) || 30;
    ingredients.getAllIngredients(limit).then(result => {
      res.send(result);
    }).catch(err => {
      console.log(err);
      res.status(400).send({
        message: "Couldn't retrieve Ingredients"
      });
    });

  }

  selectedIngredients(req, res) {

  }
}

module.exports = new IngredientsController();