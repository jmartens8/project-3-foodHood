const router = require("express").Router();
const User = require('../models/User.model')
const FoodOffer = require('../models/FoodOffer.model');
const { findByIdAndUpdate } = require("../models/User.model");
const { response } = require("express");


// create a food offer (donation)
router.post('/', (req, res, next) => {
    console.log("THIS IS THE BODY: ", req.body);
    const { name, quantity, category, comment } = req.body

    console.log("THIS IS THE PAYLOAD: ", req.payload);
    const {_id} = req.payload
    console.log("THIS IS THE PAYLOAD USER ID: ", _id);

    FoodOffer.create({
      items : [{name, quantity, category, reserved: false, reservedBy: null, comment}],
      userId: _id,
      })
      .then(offer => {
        FoodOffer.findByIdAndUpdate()
        console.log("THIS IS THE OFFER: ", offer);
        res.status(201).json(offer) 
      })
      .catch(err => next(err))
  });

// to change the "reserved-state" on food offers
router.post('/reserved', (req, res, next) => {
  
  // req.body carries both the document and subDocumentId from the Donation
  const {userId, documentId, subDocumentId } = req.body
  // console.log("THIS IS THE REQ.BODY", req.body);

  FoodOffer.findById(documentId)
  .then(donation => {    
    // find the item with the matching subDocumentId
    const item = donation.items.id(subDocumentId)

    // console.log("THIS IS THE item: ", item);
    // console.log("THIS IS THE current user: ", userId);

    if (item.reserved === false || item.reservedBy.toString() === userId.toString()) {
      item.set({reserved: !item.reserved})
      let result = (item.reserved) ? item.set({reservedBy: userId }) : item.set({reservedBy: null })
    }

    // // change the boolean of the reserved field to the opposite value
    // item.set({reserved: !item.reserved})
    
    // // change the value of whoever, if so reserved the item
    // let result = (item.reserved) ? item.set({reservedBy: userId }) : item.set({reservedBy: null })

    // alternative method:
    // if (item.reserved === true){
      //   item.set({reservedBy: userId })
      // }
      // else if (item.reserved === false){
        //   item.set({reservedBy: null })
        // }
    donation.save()
    .then(donation => {
      // console.log("THIST IS THE DONATION WITH POPULATE: ",donation)
      res.status(200).json(donation)
    })
  })
  .catch(err => next(err))
})

// get all the donations - and populate the info from the "/reserved" post request
router.get('/', (req, res, next) => {
  FoodOffer.find()
    .populate('userId')
    .populate({path: "items",
        populate: {
          path: "reservedBy",
          model: "User"
        }})
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
    .populate({path: "items",
        populate: {
          path: "reservedBy",
          model: "User"
        }})
    .then(myDonation => {
      console.log("These are my donations from the server: ",myDonation);
      res.status(200).json(myDonation)
    })
    .catch(err => next(err))
});

// deleting a donation
router.get('/delete/:id', (req, res, next) => {
  FoodOffer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'project deleted' })
    })
    .catch(err => next(err))
})

module.exports = router;
