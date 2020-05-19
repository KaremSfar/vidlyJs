const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('../models/Genre');


const movieSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength: 50
    },
    numberInStock : {
        type: Number
    },
    dailyRentalRate: {
        type: Number
    },
    genre: {
        type: genreSchema,
        required:true
    }   
});
const Movie = mongoose.model('Movie',movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
module.exports.movieSchema = movieSchema;