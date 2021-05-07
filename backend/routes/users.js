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

/**
 * @swagger
 * /login:
 *  post:
 *    description: login
 *    parameters:
 *      - in: body
 *        name: email, contraseña
 *        description: Inicio de sesión de usuario
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: se creo Token e se verificó el usuario
 *      400:
 *        description: Las credenciales fueron incorrectas
 */
 router.post('/login', UsersController.login);


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
 router.get('/users', UsersController.getOne);


 /**
 * @swagger
 * /logout:
 *  post:
 *    description: Log Out
 *    parameters:
 *      - in: body
 *        name: token
 *        description: Logout del usuario, borra token de la base de datos.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Regresa Mensaje diciendo que salio de sesion
 *      400:
 *        description: Ya Habia Salido de Sesion o No estaba Iniciada
 *      404:
 *        description: Ningun Token fue recibido
 */
router.delete('/logout/:token', UsersController.logout);

module.exports = router;