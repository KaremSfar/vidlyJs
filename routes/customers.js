const express = require('express');
const router = express.Router();
const {Customer,validate} = require('../models/Customer');
const auth = require('../middleware/auth');

router.get('/',auth,async (req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id',auth,async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404).send("Customer not found frr");
        return;
    }
    res.send(customer);
});

router.post('/',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name : req.body.name,
        phoneNumber : req.body.phoneNumber,
        isGold : req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        $set : {
            name : req.body.name,
            phone : req.body.phone,
            isGold : req.body.isGold
        }
    });

    if(!customer){
        res.status(404).send('newp');
    }
    res.send(customer);
});

router.delete('/:id',auth,async (req,res)=>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer){
        res.status(404).send('newp');
    }
    res.send(customer);
})

module.exports = router;