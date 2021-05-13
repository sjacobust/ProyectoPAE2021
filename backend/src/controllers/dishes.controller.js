const dishes = require('../models/dishes');

if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}

class DishesController {

  updateWeeklyMenu(req, res) {

  }

  getDishes(req, res) {
    let limit = parseInt(req.query.limit) || 30;
    dishes.findAll(limit).then(result => {
      res.send(result);
    }).catch(err => {
      console.log(err);
      res.status(400).send({
        message: "Couldn't retrieve dishes"
      });
    });
  }

  addNewDish(req, res) {
    const document = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.name || 120,
      img: req.body.name || "",
      weekly_dish: {
        chosen: false,
        week: 0
      }
    }
    dishes.addDish(document).then(result => {
      res.send(result);
    }).catch(err => {
      console.log("Couldn't write to the Database: ", err);
      res.status(400).send("Dish not saved! Contact Support");
    });
  }

  deleteDish(req, res) {
    dishes.deleteOne(req.query.name).then(result => {
      res.send(result).status(200);
    }).catch(err => {
      res.status(500).send("Couldn't delete dish");
    });
  }
}

module.exports = new DishesController();