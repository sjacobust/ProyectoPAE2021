if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

const {
  ingredients
} = require('./../models');

class IngredientsController {

  getIngredients(req, res) {
    ingredients.getAllIngredients(parseInt(req.query.limit)).then(result => {
      res.send(result);
    }).catch(err => {
      console.log(err);
      res.status(400).send({
        message: "Couldn't retrieve Ingredients"
      });
    });

  }

  newIngredient(req, res) {
    const document = {
      ingredient: req.body.name,
      presentation: req.body.description,
      price: {
        quarter: req.body.price.quarter || 60,
        half: req.body.price.half || 110,
        kilo: req.body.price.kilo || 210
      },
      img: req.body.img || ""
    }
    ingredients.addIngredients(document).then(result => {
      res.send(result);
    }).catch(err => {
      console.log("Couldn't write to the Database: ", err);
      res.status(400).send("Ingredient not saved! Contact Support");
    });
  }


  deleteIngredient(req, res) {
    ingredients.deleteIngredient(req.query.ingredient).then(result => {
      res.send(result).status(200);
    }).catch(err => {
      res.status(500).send("Couldn't delete ingredient");
    })
  }
}

module.exports = new IngredientsController();