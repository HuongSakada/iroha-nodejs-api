
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res, next) => {
    res.json({"message": "Welcome to iroha with nodejs application."});
});

//Require route
require('./app/routes/routes')(app);

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});