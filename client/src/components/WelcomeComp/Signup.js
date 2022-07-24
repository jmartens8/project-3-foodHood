import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import axios from 'axios'
import './WelcomeComp.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Signup(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
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
            city: city,
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
	const handleCity = e => setCity(e.target.value)
	const handleCountry = e => setCountry(e.target.value)

    const switchOption = () => {
        props.setWelcome("login")
    }

	return (
    <>
        <h4>Signup</h4>
        {/* <form onSubmit={handleSubmit}>

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

            <label htmlFor="city">City: </label>
            <input type="text" value={city} onChange={handleCity} />

            <label htmlFor="country">Country: </label>
            <input type="text" value={country} onChange={handleCountry} />

            <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <h5>{errorMessage}</h5>}

        <p>Already have an account?</p>
        <button onClick={() => {switchOption()}}>Login</button> */}
        <div className='formSize'>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={email} onChange={handleEmail} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword}/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={firstName} onChange={handleFirstName} />
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={lastName} onChange={handleLastName}/>
                    </Form.Group>
                </Row>
                
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="street" value={street} onChange={handleStreet}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>House number</Form.Label>
                    <Form.Control placeholder="number" type="text" value={houseNumber} onChange={handleHouseNumber}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={city} onChange={handleCity}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={country} onChange={handleCountry}/>
                    </Form.Group> 

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control value={zipCode} onChange={handleZipCode}/>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                <Button variant="secondary" onClick={() => {switchOption()}}>
                    Switch to log in
                </Button>
            </Form>
        </div>
    </>

	)
}