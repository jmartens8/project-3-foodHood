import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function SaveFood() {

	const [donations, setDonation] = useState([])

	const storedToken = localStorage.getItem('authToken')

	// display all Donations
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

	// -----------> HIER GEHTS WEITER <------------------
	const handleSwitch = (documentId, subDocumentId) => {

		axios.post('/api/donate/reserved', {documentId, subDocumentId }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log("Response from Server: ",response)
			})

	}

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
							<th>Reserve</th>
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
										<BootstrapSwitchButton 
										onChange={()=>{handleSwitch(donation._id, donation.items[0]._id)}} 
										onlabel={"reserved"} 
										offlabel={"click"} 
										checked={donation.items[0].reserved} 
										width={100} 
										onstyle="success" />
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

// donation.items[0].reserved