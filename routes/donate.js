const router = require("express").Router();
const User = require('../models/User.model')
const FoodOffer = require('../models/FoodOffer.model');
const { findByIdAndUpdate } = require("../models/User.model");


// create a food offer
router.post('/', (req, res, next) => {
    console.log("THIS IS THE BODY: ", req.body);
    const { name, quantity, category } = req.body

    console.log("THIS IS THE PAYLOAD: ", req.payload);
    const {_id} = req.payload
    console.log("THIS IS THE PAYLOAD USER ID: ", _id);

    FoodOffer.create({
      items : [{name, quantity, category}],
      userId: _id
      })
      .then(offer => {
        FoodOffer.findByIdAndUpdate()
        console.log("THIS IS THE OFFER: ", offer);
        res.status(201).json(offer) 
      })
      .catch(err => next(err))
  });

// get all the donations
router.get('/', (req, res, next) => {
  FoodOffer.find()
    .populate('userId')
    .then(offer => {
      console.log("CLGGGG", offer);
      res.status(200).json(offer)
    })
    .catch(err => next(err))
});

module.exports = router;
