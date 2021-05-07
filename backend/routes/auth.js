const express = require('express');
const router = express.Router();

const { UsersController } = require("./../src/controllers/");

// Authentication
/**
 * @swagger
 * /auth:
 *  post:
 *    description: Google login
 *    parameters:
 *      - in: query
 *        name: email
 *        description: email de google
 *        schema:
 *          type: string    
 *    responses:
 *      200:
 *        description: Regresa un token
 *      400:
 *        Error con impresion en consola
 */

router.post('/auth/google', UsersController.googleLogin);

/**
 * @swagger
 * /auth:
 *  post:
 *    description: Log in
 *    parameters:
 *      - in: body
 *        name: email, contraseña
 *        description: Log in de usuario con cuenta creada anteriormente
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: regresa token de usuario
 *      400:
 *        description: error de email/contraseña
 *      404:
 *        description: no se pudo crear token
 */
router.post('/auth', UsersController.login);



module.exports = router;