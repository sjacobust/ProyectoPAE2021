const express = require('express');
const router = express.Router();

const { IngredientsController } = require("./../src/controllers/");
const { isAdminMiddleware } = require("./../src/middlewares");
 
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
   *        description: Objetos de los ingredientes seleccionados por el usuario
   *        schema:
   *          type: object
   *    responses:
   *      200:
   *        description: Se guardan los ingredientes seleccionados
   */
   router.post('/ingredients', isAdminMiddleware, IngredientsController.newIngredient);


  /**
   * @swagger
   * /ingredients:
   *  delete:
   *    description: Ingredients
   *    parameters:
   *      - in: query
   *        name: Ingredientes
   *        description: Objetos de los ingredientes seleccionados por el usuario
   *        schema:
   *          type: object
   *    responses:
   *      200:
   *        description: Se guardan los ingredientes seleccionados
   */
   router.delete('/ingredients', isAdminMiddleware, IngredientsController.deleteIngredient);

module.exports = router;