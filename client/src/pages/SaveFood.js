import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import MyNavbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function SaveFood() {

	const [donations, setDonation] = useState([])

	const storedToken = localStorage.getItem('authToken')
	const { user } = useContext(AuthContext)

    // console.log("Das hier ist der User",user);
    const userId = user._id

	// display all Donations
	const getAllDonations = () => {
		axios.get('/api/donate', { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				setDonation(() => response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		// get all the donations from the server
		getAllDonations()
	}, [])

	// function to handel the on / off reserved-boolean
	const handleSwitch = (documentId, subDocumentId) => {
		axios.post('/api/donate/reserved', {userId, documentId, subDocumentId }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log("Response from Server: ",response)
				getAllDonations()
			})
	}

	return (
		<>
            <MyNavbar />
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
							<th>Reserved by:</th>
						</tr>
					</thead>
					<tbody>
						{donations.map(donation => {
							return (
								<tr key={donation._id}>
									<td>{donation.items[0].name}</td>
									<td>{donation.items[0].quantity}</td>
									<td>{donation.items[0].category}</td>
									<td>{donation.userId.email}</td>
									<td>
										<BootstrapSwitchButton 
										onChange={()=>{handleSwitch(donation._id, donation.items[0]._id)}} 
										onlabel={"reserved"} 
										offlabel={"available"} 
										checked={donation.items[0].reserved} 
										width={100} 
										onstyle="success" />
									</td>
									<td>{donation.items[0].reservedBy?.email}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}