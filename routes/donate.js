const router = require("express").Router();
const User = require('../models/User.model')
const FoodOffer = require('../models/FoodOffer.model')


// create a food offer
router.post('/', (req, res, next) => {
    console.log(req.body);
    const { name, quantity, category } = req.body
    FoodOffer.create({
      items : [{name, quantity, category:[category]}]
    })

      .then(offer => {
        console.log(offer);
        res.status(201).json(offer) 
      })
      .catch(err => next(err))
  });

// get all the donations
router.get('/', (req, res, next) => {
  FoodOffer.find()
    .then(offer => {
      res.status(200).json(offer)
    })
    .catch(err => next(err))
});

module.exports = router;
