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

  addIngredient(ingredient) {
    return this.insertOne(ingredient);
  }

  deleteIngredient(ingredient) {
    return this.deleteOne(ingredient);
  }
  
}

module.exports = new Ingredients();
