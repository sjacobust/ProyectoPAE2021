const dishes = require('../models/dishes');

if(process.env.NODE_ENV==='dev') {
  require('dotenv').config();
}

class DishesController {

    updateWeeklyMenu(req, res) {
        
    }

    getDishes(req, res) {
      let limit =  parseInt(req.query.limit) || 30;
      dishes.findAll(limit).then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err);
        res.status(400).send({ message: "Couldn't retrieve dishes" });
      });
    }

    addNewDish(req, res) {
      
    }

    getWeeklyMenu(req, res) {

    }
}

module.exports = new DishesController();