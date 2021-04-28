const express = require('express');
const router = express.Router();

const { UsersController } = require("./../src/controllers/");

const getAllUsers = (req, res, next) => {
    if (req.query.email) return next();
    UsersController.index(req, res);
}

/**
 * @swagger
 * /signup:
 *  post:
 *    description: signup
 *    parameters:
 *      - in: body
 *        name: nombre, email, contraseña
 *        description: Alta de usuario
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: se creo el usuario
 *      400:
 *        description: error creando usuario
 */
 router.post('/signup', UsersController.signup);


 // Users
 /**
  * @swagger
  * /users:
  *  get:
  *    description: Usuario
  *    parameters:
  *      - in: query
  *        name: email
  *        description: email del usuario deseado
  *        schema:
  *          type: string
  *    responses:
  *      200:
  *        description: regresa al usuario
  */
 router.get('/users', getAllUsers, UsersController.getOne);

module.exports = router;