const Database = require('./database');

class Dishes extends Database {

  constructor() {
    console.log("dishes model initialized");
    super();
    this.useCollection('dishes');
  }
  
}

module.exports = new Dishes();
