const router = require("express").Router();
const User = require('../models/User.model')

// get logged in user Info
router.get('/', (req, res, next) => {
    User.find()
    .then(users => {
        console.log(users);
    })
    .catch(err => next(err))
})