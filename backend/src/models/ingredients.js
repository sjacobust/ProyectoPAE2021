const Database = require('./database');

class Ingredients extends Database {

  constructor() {
    console.log("ingredients model initialized");
    super();
    this.useCollection('ingredients');
  }

  getAllIngredients(limit) {
    return this.findAll(limit);
  }

  addIngrediente(limit) {
    
  }
  
}

module.exports = new Ingredients();
