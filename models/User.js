const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password: {
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin: this.isAdmin},'jwtprivatekey'); //config.get('jwtPrivateKey')
    return token;
}
const User = mongoose.model('User',userSchema);


function validateUser(user){
    const schema = {
        name:Joi.string().required().min(3).max(50),
        email:Joi.string().required().min(3).max(255).email(),
        password:Joi.string().required().min(3).max(255)
    }
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;