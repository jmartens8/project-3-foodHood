import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import Donation from '../components/DonationComp/Donation'

export default function SaveFood() {

	const [donations, setDonation] = useState([])

	const storedToken = localStorage.getItem('authToken')

	const getAllDonations = () => {
		axios.get('/api/donate', { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log(response)
				setDonation(response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		// get all the projects from the server
		getAllDonations()
	}, [])

	return (
		<>
            <Navbar />
            <h1>See a list of all donation</h1>
			{donations.map(donation => <Donation key={donation._id} {...donation} />)}
            
			{/* <AddProject getAllProjects={getAllProjects} /> */}
		</>
	)
}