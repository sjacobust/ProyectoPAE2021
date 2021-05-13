const Database = require('./database');

class Dishes extends Database {

  constructor() {
    console.log("dishes model initialized");
    super();
    this.useCollection('dishes');
  }

  getAllDishes(limit) {
    return this.findAll(limit);
  }

  addDish(dish) {
    return this.insertOne(dish);
  }

  deleteDish(dish) {
    return this.deleteOne(dish);
  }
  
}

module.exports = new Dishes();
