const express = require('express');
const router = express.Router();

const { IngredientsController } = require("./../src/controllers/");
 
 /**
 * @swagger
 * /ingredients:
 *  get:
 *    description: Ingredients
 *    responses:
 *      200:
 *        description: Regresa los objetos de ingredientes
 */
  router.get('/ingredients', IngredientsController.getIngredients);


  /**
   * @swagger
   * /ingredients:
   *  post:
   *    description: Ingredients
   *    parameters:
   *      - in: body
   *        name: Ingredientes
   *        description: Objetos de los ingredientes seleccuionados por el usuario
   *        schema:
   *          type: object
   *    responses:
   *      200:
   *        description: Se guardan los ingredientes seleccionados
   */
   router.post('/ingredients', IngredientsController.selectedIngredients);

module.exports = router;