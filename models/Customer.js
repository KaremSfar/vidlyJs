const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    isGold : {
        type: Boolean,
        required : true,
    },
    phoneNumber : {
        type: String,
        length : 8
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        name : Joi.string().required().min(3).max(50),
        isGold : Joi.boolean().required(),
        phoneNumber : Joi.string().min(8).max(8)
    }
    return Joi.validate(customer,schema)
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;