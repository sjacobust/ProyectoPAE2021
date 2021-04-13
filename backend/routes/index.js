const express = require('express');
const router = express.Router();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const Token = require('./../src/models/token');
const usersController = require('./../src/controllers/users.controller');
const ingredientsController = require('./../src/controllers/ingridients.controller');
const menuController = require('./../src/controllers/menu.controller');

const swaggerOptions = {
    swaggerDefinition: {
        swagger : "2.0",
        info: {
            "title": "Casa Amet API",
            "description": "api para servicios de comida - Casa Amet",
            "version": "",
            "servers": [" "]
        }
    },
    apis: ['index.js']
}

function authMiddleware(req, res, next) {

  Token.findByToken(req.headers.authorization).then(response => {
    if(response) {
      next();
    } else {
      res.status(401).send();
    }
  }).catch(err => {
    res.status(401).send();
  });
}

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

router.post('/auth/google', usersController.googleLogin);

/**
 * @swagger
 * /endpoint:
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
router.post('/auth', usersController.login);

/**
 * @swagger
 * /endpoint:
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
router.post('/signup', usersController.signup);


// Users
/**
 * @swagger
 * /endpoint:
 *  get:
 *    description: Usuario
 *    parameters:
 *      - in: body
 *        name: email
 *        description: email del usuario deseado
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: regresa al usuario
 */
router.get('/users', usersController.getOne);

/**
 * @swagger
 * /endpoint:
 *  get:
 *    description: Menu
 *    responses:
 *      200:
 *        description: Obtiene los objetos del menu
 */
router.get('/menu', menuController.getMenu);

/**
 * @swagger
 * /endpoint:
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
 *        description: Se actualizo el menu
 */
 router.post('/menu', menuController.updateMenu);


 /**
 * @swagger
 * /endpoint:
 *  get:
 *    description: Ingredients
 *    responses:
 *      200:
 *        description: Regresa los objetos de ingredientes
 */
router.get('/ingredients', ingredientsController.getIngredients);


/**
 * @swagger
 * /endpoint:
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
 router.post('/ingredients', ingredientsController.selectedIngredients);

const swaggerDoc = swaggerJsDoc(swaggerOptions);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = router;
