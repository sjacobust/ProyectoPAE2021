const express = require('express');
const router = express.Router();

const { UsersController } = require("./../src/controllers/");

const { authMiddleware, isAdminMiddleware, uploadFile } = require('../src/middlewares')


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
 * /admin:
 *  post:
 *    description: addAdmin
 *    parameters:
 *      - in: body
 *        name: nombre, email, contraseña
 *        description: Alta de usuario tipo Administrador
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: se creo el usuario
 *      400:
 *        description: error creando usuario
 */
 router.post('/admin', UsersController.addAdmin);

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
 router.get('/users', authMiddleware, UsersController.getOne, isAdminMiddleware, UsersController.getAll);


 // Users
 /**
  * @swagger
  * /users/image:
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
 router.get('/users/image', authMiddleware, UsersController.getImage);


 // Users
 /**
  * @swagger
  * /users:
  *  put:
  *    description: Usuario
  *    parameters:
  *      - in: body
  *        name: userUpdate
  *        description: La información del usuario actualizada
  *        schema: 
  *          type: object
  *          properties:
  *            name:
  *              type: string
  *            email:
  *              type: string
  *            telephone:
  *              type: string
  *            password:
  *              type: string
  *          required:
  *            - name
  *            - email
  *            - telephone
  *            - password
  *    responses:
  *      200:
  *        description: Mensaje de actualización lograda
  *      404:
  *        description: No existe el usuario
  */
 router.put('/users', authMiddleware, uploadFile.single('profilePic'), UsersController.updateUser);


 // Users
 /**
  * @swagger
  * /users:
  *  delete:
  *    description: Usuario
  *    parameters:
  *      - in: query
  *        email: Email del usuario a borrar
  *        token: Token del Administrador que esta haciendo la eliminación
  *    responses:
  *      200:
  *        description: Mensaje de actualización lograda
  *      404:
  *        description: No existe el usuario
  */
 router.delete('/users', isAdminMiddleware, UsersController.deleteUser);


 /**
 * @swagger
 * /logout:
 *  delete:
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