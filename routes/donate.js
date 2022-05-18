const router = require("express").Router();
const User = require('../models/User.model')
const FoodOffer = require('../models/FoodOffer.model');
const { findByIdAndUpdate } = require("../models/User.model");


// create a food offer
router.post('/', (req, res, next) => {
    // console.log("THIS IS THE BODY: ", req.body);
    const { name, quantity, category } = req.body

    // console.log("THIS IS THE PAYLOAD: ", req.payload);
    const {_id} = req.payload
    // console.log("THIS IS THE PAYLOAD USER ID: ", _id);

    FoodOffer.create({
      items : [{name, quantity, category, reserved: false}],
      userId: _id,
      
      })
      .then(offer => {
        FoodOffer.findByIdAndUpdate()
        // console.log("THIS IS THE OFFER: ", offer);
        res.status(201).json(offer) 
      })
      .catch(err => next(err))
  });

// to change the "reserved-state" on food offers
router.post('/reserved', (req, res, next) => {

  // req.body carries bot the document and subDocumentId from the Donation
  // console.log("THIS IS THE REQ.BODY", req.body);
  const {documentId, subDocumentId } = req.body

  FoodOffer.findById(documentId)
  .then(donation => {
    console.log("This is the reserved offer: ",donation)
    // find the item with the matching subDocumentId
    const item = donation.items.id(subDocumentId)

    // change the boolean of the reserved field to the opposite value
    item.set({reserved: !item.reserved})
    return donation.save()
  })

  .then(donation => {
    console.log(donation)
  })

  .catch(err => next(err))
})

// get all the donations
router.get('/', (req, res, next) => {
  FoodOffer.find()
    .populate('userId')
    .then(offer => {
      res.status(200).json(offer)
    })
    .catch(err => next(err))
});

// get only the donations of the current user
router.get('/user/:id', (req, res, next) => {
  // console.log("Das hier ist req.params", req.params);
  FoodOffer.find({ userId: req.params.id })
    .populate('userId')
    .then(myDonation => {
      // console.log("These are my donations from the server: ",myDonation);
      res.status(200).json(myDonation)
    })
    .catch(err => next(err))
});



module.exports = router;
