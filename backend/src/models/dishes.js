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
  
}

module.exports = new Dishes();
