import '../App.css';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

export default function MyNavbar() {
    const navigate = useNavigate()
	const { isLoggedIn, logoutUser, user } = useContext(AuthContext)
    const storedToken = localStorage.getItem('authToken')

    const logoutAndRedirect = () => {
        logoutUser()
        navigate ('/')
    }

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/home">Home</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/donate">Donate Food</Nav.Link>
							<Nav.Link href="/save-food">Save Food</Nav.Link>
							<Nav.Link href="/my-donations">My Donations</Nav.Link>
						</Nav>
						<Nav>
							{isLoggedIn ?
								(
								<>
									<Navbar.Text>Signed in as:  </Navbar.Text>
									<Navbar.Text style={{ color: "white" }}>{user.firstName} {user.lastName}</Navbar.Text>
									
									<Button variant="outline-warning" onClick={()=> logoutAndRedirect()}>Log out</Button>{' '}
								</>
								) : (
									<Navbar.Text>You are not logged in</Navbar.Text>
								)
							}
						</Nav>
					</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
