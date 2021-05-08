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
 *        description: Error con impresion en consola
 */

router.post('/auth/google', UsersController.googleLogin);



module.exports = router;