const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt')
const User = require('../models/User.model')

router.post('/signup', (req, res, next) => {
	// get all the keys from the body, we have put there from the state in signup.js
	const { email, password, firstName, lastName, street, houseNumber, zipCode, city, country } = req.body
	// check if all fields from the form are filled
	if (email === '' || password === '' || firstName === '' || lastName === '' || street === '' || houseNumber === '' || zipCode === '' || city === '' || country === '') {
		res.status(400).json({ message: 'Please fill out the complete form, thank you' })
		return
	}
	if (password.length < 4) {
		res.status(400).json({ message: 'Password has to be 4 chars min' })
		return
	}
	// check the database if a user with the same email exists
	User.findOne({ email })
		.then(foundUser => {
			// if the user already exists send an error
			if (foundUser) {
				res.status(400).json({ message: 'A user with this email already exists' })
				return
			}
			// hash the password
			const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt)
			// create the new user
			return User.create({ email, password: hashedPassword, firstName, lastName, street, houseNumber, zipCode, city, country })
				.then(createdUser => {
					const { email, firstName, lastName, street, houseNumber, zipCode, city, country, _id } = createdUser
					
                    console.log("der neue User IST : ", createdUser);

                    const payload = { email, firstName, lastName, street, houseNumber, zipCode, city, country, _id }
				    // create the json web token
				    const authToken = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        { algorithm: 'HS256', expiresIn: '12h' }
                    )

					res.status(201).json({ user: payload, authToken })
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body
	if (email === '' || password === '') {
		res.status(400).json({ message: 'Provide email and password' })
		return
	}
	User.findOne({ email })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: 'User not found' })
				return
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { email, firstName, lastName, street, houseNumber, zipCode, city, country, _id } = foundUser
				const payload = { email, firstName, lastName, street, houseNumber, zipCode, city, country, _id }
				// create the json web token
				const authToken = jwt.sign(
					payload,
					process.env.JWT_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken })
			} else {
				res.status(401).json({ message: 'Unable to authenticate' })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: 'Internal Server Error' })
		})
});

router.get('/verify', isAuthenticated, (req, res, next) => {
	// if the token is valid we can access it on : req.payload
	console.log('request payload is: ', req.payload)
	res.status(200).json(req.payload)
});


module.exports = router;
