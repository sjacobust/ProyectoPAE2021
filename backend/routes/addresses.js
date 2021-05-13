const express = require('express');
const router = express.Router();

const { UsersController } = require("./../src/controllers/");

const { authMiddleware } = require('../src/middlewares')


 /**
 * @swagger
 * /addresses:
 *  post:
 *    description: Añade una dirección a la base de datos
 *    parameters:
 *      - in: body
 *        name: address
 *        description: Dirección a borrar
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Regresa Mensaje diciendo que se borró
 *      404:
 *        description: No se encuentra la Dirección
 */
 router.post('/addresses', authMiddleware, UsersController.addAddresses);

 /**
 * @swagger
 * /addresses:
 *  put:
 *    description: Actualiza la dirección
 *    parameters:
 *      - in: body
 *        name: address
 *        description: Dirección a actualizar
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Regresa Mensaje diciendo que se Actualizó
 *      404:
 *        description: No se encuentra la Dirección
 */
 router.put('/addresses', authMiddleware, UsersController.updateAddress);


 /**
 * @swagger
 * /addresses:
 *  delete:
 *    description: Borra la dirección pasada como query
 *    parameters:
 *      - in: query
 *        name: address
 *        description: Dirección a borrar
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Regresa Mensaje diciendo que se borró
 *      404:
 *        description: No se encuentra la Dirección
 */
router.delete('/addresses', UsersController.deleteAddress);

module.exports = router;