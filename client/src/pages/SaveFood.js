import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from "../components/Navbar"

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
		// get all the donations from the server
		getAllDonations()
	}, [])

	return (
		<>
            <Navbar />
			<h1>See a list of all donation</h1>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<table>
					<thead>
						<tr>
							<th>Donation</th>
							<th>Quantity</th>
							<th>Category</th>
							<th>Donated by:</th>
						</tr>
					</thead>
					<tbody>
						{donations.map(donation => {
							return (
								<tr key={donation._id}>
									<td>{donation.items[0].name}</td>
									<td>{donation.items[0].quantity}</td>
									<td>{donation.items[0].category}</td>
									<td>{donation.userId.name}</td>
									<td>
					
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			{/* {donations.map(donation => <Donation key={donation._id} {...donation} />)} */}
            
			{/* <AddProject getAllProjects={getAllProjects} /> */}
		</>
	)
}