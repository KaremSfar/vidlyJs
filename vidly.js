const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require("./routes/auth");

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('Connecting to Database..'))
    .catch((err)=>console.log(err.message));

app.use(express.json());

app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth)


const port = process.env.PORT || 3000;

//if jwtPrivateKey is not defined do process.exit(1)

app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}/`);
});