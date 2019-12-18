//import default packages
//postCharge is imported from a file stripe
//dotenv allows us to read sensitive information from node process so as not to hard code values
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const postCharge = require('./stripe');
require('dotenv').config();

//initializing a new express instance called app
//create a new router instance and store it in a variable router.
//router will be used to define the payment endpoint
//initialize port which if undefined is assigned 7000
const app = express();
const router = express.Router();
const port = process.env.PORT || 7000;

//set up an endpoint and assign post charge to handle all post requests through this route
//catch all request and respond with a json redirecting the user to the right endpoint
//define a middleware on the app instance to enable CORS for all requests
//attach another middleware that allows us to parse JSON objects from the request body
//tell app instance to handle all requests to the api endpoint
//tell express to serve up the build folder which holds transpiled code for app frontend
router.post('./stripe/charge', postCharge);
router.all('*' , (_, res) => {
    res.json({
        message: 'please make a POST request to stripe charge'
    })
});
app.use((_, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next()
});
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../build')));

//app instance handle all GET requests by serving index.html from build folder
//spin up the server on the port defined earlier and log a message to console for successful startup
app.get('*', (_, res)=>{
    res.sendFile(path.resolve(__dirname, '../build/index.html'))
});

app.listen(port, () =>
    console.log('server running on port ' + port)
);