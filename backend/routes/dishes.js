const express = require('express');
const router = express.Router();

const { DishesController } = require("./../src/controllers/");

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
  * /menu/weekly:
  *  get:
  *    description: Menu
  *    responses:
  *      200:
  *        description: Se obtienen lso platillos que se asignaron a la semana.
  */
  router.get('/menu/weekly', DishesController.getWeeklyMenu);



module.exports = router;
