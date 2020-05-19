const mongoose = require('mongoose');
const {movieSchema} = require('../models/Movie');
const {customerSchema} = require('../models/Customer');
const Joi = require('joi');


const rentalSchema = new mongoose.Schema({
    rentDate : {
        type: Date,
        required: true,
        default: Date.now
    },
    backDate : {
        type: Date,
    },
    movie : {
        type : new mongoose.Schema({
            title : {
                type: String,
                required: true,
                trim: true,
                minlength:3,
                maxlength: 50
            }
        }),
        required : true
    },
    customer : {
        type : customerSchema, // we can here create a new mongoose.Schema() to have only strictly the needed fields
        required : true
    },
    rentalFee : {
        type:Number,
        min:0
    }
});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    }
    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
