import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

import axios from 'axios'


// import { AuthContext } from '../context/auth'

export default function Signup(props) {

    const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);
    const { storeToken, verifyStoredToken } = useContext(AuthContext)


    const navigate = useNavigate()

    const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name }
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
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

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

            <label htmlFor="name">Name: </label>
            <input type="text" value={name} onChange={handleName} />

            <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <h5>{errorMessage}</h5>}

        <p>Already have an account?</p>
        <button onClick={() => {switchOption()}}>Login</button>
    </>

	)
}