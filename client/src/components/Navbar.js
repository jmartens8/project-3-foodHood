import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import axios from 'axios'


export default function Navbar() {
    const navigate = useNavigate()
	const { isLoggedIn, logoutUser } = useContext(AuthContext)
    const storedToken = localStorage.getItem('authToken')

    const [user, setUser] = useState("")

    const getUserInfo = () => {
		axios.get('/api/projects', { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log(response)
				setUser(response.data)
			})
			.catch(err => console.log(err))
	}

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
			{isLoggedIn ?
				(
                    <>
                        <div>Hello,</div>
                        <button onClick={()=> logoutAndRedirect()}>Log out</button>
                    </>
				) : (
					<div>you are not logged in</div>
				)
			}
		</nav>
	)
}
