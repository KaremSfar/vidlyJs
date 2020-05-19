const express = require('express');
const router = express.Router();
const {Rental,validate} = require('../models/Rental');
const {Movie} = require('../models/Movie');
const {Customer} = require('../models/Customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const auth = require('../middleware/auth');

Fawn.init(mongoose);


router.get('/',async (req,res)=>{
    const rentals = await Rental.find();
    res.send(rentals);
});

router.get('/:id',async (req,res)=>{
    const rental = Rental.findById(req.params.id);
    if(!rental){
        res.status(404).send('Nooop');
        return
    }
    res.send(rental);
})

router.post('/',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');

    if(movie.numberInStock===0) {
        res.status(400).send('movie not in stock');
        return;
    }

    console.log(req.body);

    let rental = new Rental({
        movie: {
            _id : movie._id,
            title:movie.title
        },
        customer: {
            _id:customer._id,
            name: customer.name,
            phone: customer.phoneNumber,
            isGold: customer.isGold
        }
    }); 

    try{
        new Fawn.Task()
            .save('rentals',rental)
            .update('movies',{_id: movie._id},{
                $inc : {numberInStock:-1}  
            })
            .run();
    }catch(ex){
        console.log(ex);
    }


    res.send(rental);
});

module.exports = router;