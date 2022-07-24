import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/auth'
// import MyNavbar from "../Navbar"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/esm/FormGroup'


export default function Login(props) {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

    // const auth = useContext(AuthContext)
    // console.log(auth)
	const { storeToken, verifyStoredToken } = useContext(AuthContext)

    const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }
		axios.post('/api/auth/login', requestBody)
			.then(response => {
				// redirect to projects
				console.log('i have a token mothafukkas')
				const token = response.data.authToken
				// store the token
				storeToken(token)
				verifyStoredToken()
					.then(() => {
						// redirect to projects
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

    const switchOption = () => {
        props.setWelcome("signup")
    }

	return (
    <>
		{/* <MyNavbar /> */}
        {/* <div>
			<h4>Login</h4>
			<form onSubmit={handleSubmit}>

				<label htmlFor="email">Email: </label>
				<input type="text" value={email} onChange={handleEmail} />

				<label htmlFor="password">Password: </label>
				<input type="password" value={password} onChange={handlePassword} />

				<button type="submit">Log in</button>
			</form>

			{errorMessage && <h5>{errorMessage}</h5>}

			<p>Don't have an account yet?</p>
            <button onClick={() => {switchOption()}}>Signup</button>    
        </div> */}

		<h4>Login</h4>

		<div className='formSize'>	
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="text" placeholder="Enter email" value={email} onChange={handleEmail} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword}/>
				</Form.Group>
				
				<Button variant="primary" type="submit">
					Log in
				</Button>
				<Button variant="secondary" onClick={() => {switchOption()}}>
					Switch to sign up
				</Button>
			</Form>
		</div>

    </>
	)
}