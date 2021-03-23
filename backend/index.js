const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.end('Welcome to the Project!');
});

app.listen(port, () => {
    console.log(`App is listening in port ${port}`);
});
