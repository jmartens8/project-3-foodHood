import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function Navbar() {
    const navigate = useNavigate()
	const { isLoggedIn, logoutUser, user } = useContext(AuthContext)
    const storedToken = localStorage.getItem('authToken')

    const logoutAndRedirect = () => {
        logoutUser()
        navigate ('/')
    }

	return (
		<nav>
			<Link to='/home'>
				<button>Home</button>
			</Link>
			<Link to='/donate'>
				<button>Donate</button>
			</Link>
			<Link to='/save-food'>
				<button>Save Food</button>
			</Link>
			<Link to='/my-donations'>
				<button>My Donations</button>
			</Link>
			{isLoggedIn ?
				(
                    <>
                        <div>Hello, {user.firstName} {user.lastName}</div>
                        <button onClick={()=> logoutAndRedirect()}>Log out</button>
                    </>
				) : (
					<div>you are not logged in</div>
				)
			}
		</nav>
	)
}
