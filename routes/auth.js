const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');


router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({email:req.body.email});
    if(!user){
        res.status(400).send('invalid user or password');
        return;
    }
    const validPwd = await bcrypt.compare(req.body.password,user.password);
    if(!validPwd){
        res.status(400).send('invalid user or password');
        return;
    }

    token = user.generateAuthToken();
    
    res.send(token);
});

function validate(req){
    const schema = {
        email:Joi.string().required().min(3).max(255).email(),
        password:Joi.string().required().min(3).max(255)
    }
    return Joi.validate(req,schema);
}

module.exports = router;