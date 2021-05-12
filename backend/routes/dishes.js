const express = require('express');
const router = express.Router();

const { DishesController } = require("./../src/controllers/");

const { isAdminMiddleware } = require("./../src/middlewares/");

/**
 * @swagger
 * /menu:
 *  get:
 *    description: Menu
 *    responses:
 *      200:
 *        description: Obtiene los objetos del menu
 */
 router.get('/menu', DishesController.getDishes);


/**
 * @swagger
 * /menu:
 *  post:
 *    description: Menu
 *    parameters:
 *      - in: body
 *        name: platillos
 *        description: Se dan los datos del nuevo platillo a agregar.
 *        schema:
 *          type: object
 *    responses:
 *      200:
 *        description: Obtiene los objetos del menu
 */
 router.post('/menu', DishesController.addNewDish);


 /**
  * @swagger
  * /menu/weekly:
  *  post:
  *    description: Menu
  *    parameters:
  *      - in: body
  *        name: platillos
  *        description: Se dan los platillos del nuevo menu
  *        schema:
  *          type: object
  *    responses:
  *      200:
  *        description: Se actualizo el menu semanal
  */
  router.post('/menu/weekly', DishesController.updateWeeklyMenu);


  /**
   * @swagger
   * /menu:
   *  post:
   *    description: Menu
   *    parameters:
   *      - in: query
   *        name: Dishes
   *        description: Objetos de los menu seleccionados por el usuario
   *        schema:
   *          type: object
   *    responses:
   *      200:
   *        description: Se guardan los ingredientes seleccionados
   */
   router.delete('/menu', isAdminMiddleware, DishesController.deleteDish);

module.exports = router;
