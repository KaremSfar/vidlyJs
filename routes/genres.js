const express = require('express');
const router = express.Router();
const {Genre,validate} = require('../models/Genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/',async (req,res)=>{
    const genres = await Genre.find();
    res.send(genres)
});

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id)
    if(!genre){
        res.status(404).send('Not found frr');
        return;
    }
    res.send(genre);
});

router.post('/',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    let genre = new Genre({
        label: req.body.label
    })

    genre = await genre.save()
    res.send(genre);
});

router.put('/:id',auth,async (req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id,{
        $set: {
            label: req.body.label
        }
    },{new:true});
    if(!genre){
        res.status(404).send('not found');
        return;
    }
    res.send(genre);
        
});

router.delete('/:id',[auth,admin],(req,res)=>{
    Genre.findByIdAndDelete(req.params.id)
        .then((result)=>{res.send(result)});
});

module.exports = router;