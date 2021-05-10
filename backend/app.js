const express = require('express');
const dotenv = require('dotenv');
const app = express();

const { authMiddleware } = require('./src/middlewares');

const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const socketIo = require('socket.io');


const { dishesRouter, ingredientsRouter, usersRouter, authRouter, addressesRouter } = require("./routes");

if (process.env.NODE_ENV) {
    dotenv.config();
}

const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        swagger : "2.0",
        info: {
            "title": "Casa Amet API",
            "description": "api para servicios de comida - Casa Amet",
            "version": "",
            "servers": ["http://localhost:3000"]
        }
    },
    apis: ['./routes/dishes.js', './routes/auth.js', './routes/users.js', './routes/ingredients.js', './routes/addresses.js']
}

const swaggerDoc = swaggerJsDoc(swaggerOptions);

app.use(cors());

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(express.json())

app.use("/", authMiddleware, dishesRouter);
app.use("/", authMiddleware, ingredientsRouter);
app.use("/", authMiddleware, usersRouter);
app.use("/", authMiddleware, authRouter);
app.use("/", authMiddleware, addressesRouter);



app.get('/', (req, res) => {
    res.end('Welcome to the Project!');
});

const server = app.listen(port, () => {
    console.log(`App is listening in port ${port}`);
});


const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowHeaders: ['Authorization'],
        credentials: true
    }
});

io.on('connection', socket => {
    console.log("It's connected", socket);
});