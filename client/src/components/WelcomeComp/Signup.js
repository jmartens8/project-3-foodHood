import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

import axios from 'axios'


// import { AuthContext } from '../context/auth'

export default function Signup(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

	const [errorMessage, setErrorMessage] = useState(undefined);
    const { storeToken, verifyStoredToken } = useContext(AuthContext)


    const navigate = useNavigate()

    const handleSubmit = e => {
		e.preventDefault()

		const requestBody = { 
            email: email, 
            password: password, 
            firstName: firstName, 
            lastName: lastName,
            street: street,
            houseNumber: houseNumber,
            zipCode: zipCode,
            country: country
         }

		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				// go directly to Homepage after sign up
                storeToken(response.data.authToken)
                verifyStoredToken()
                .then(() => {
                    navigate('/home')
                })  
				
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

    const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)
	const handleFirstName = e => setFirstName(e.target.value)
	const handleLastName = e => setLastName(e.target.value)
	const handleStreet = e => setStreet(e.target.value)
	const handleHouseNumber = e => setHouseNumber(e.target.value)
	const handleZipCode = e => setZipCode(e.target.value)
	const handleCountry = e => setCountry(e.target.value)

    const switchOption = () => {
        props.setWelcome("login")
    }

	return (
    <>
        <h4>Signup</h4>
        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email: </label>
            <input type="text" value={email} onChange={handleEmail} />

            <label htmlFor="password">Password: </label>
            <input type="password" value={password} onChange={handlePassword} />

            <label htmlFor="firstName">First name: </label>
            <input type="text" value={firstName} onChange={handleFirstName} />

            <label htmlFor="lastName">Last name: </label>
            <input type="text" value={lastName} onChange={handleLastName} />

            <label htmlFor="street">Street: </label>
            <input type="text" value={street} onChange={handleStreet} />

            <label htmlFor="houseNumber">House number: </label>
            <input type="text" value={houseNumber} onChange={handleHouseNumber} />

            <label htmlFor="zipCode">ZIP code: </label>
            <input type="text" value={zipCode} onChange={handleZipCode} />

            <label htmlFor="country">Country: </label>
            <input type="text" value={country} onChange={handleCountry} />

            <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <h5>{errorMessage}</h5>}

        <p>Already have an account?</p>
        <button onClick={() => {switchOption()}}>Login</button>
    </>

	)
}