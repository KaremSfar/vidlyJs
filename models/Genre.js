const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        minlength: 3
    }
})
const Genre = mongoose.model('Genre',genreSchema);


function validateGenre(genre){
    const schema = {
        label:Joi.string().required().min(3)
    }
    return Joi.validate(genre,schema);
}


exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;