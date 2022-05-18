import Navbar from "../components/Navbar"
import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/auth'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


export default function MyDonation() {
    
    const [donations, setDonation] = useState([])
    const storedToken = localStorage.getItem('authToken')
    const { user } = useContext(AuthContext)

    // console.log("Das hier ist der User",user);
    const id = user._id
    
    // display all Donations
    const getMyDonations = () => {
        axios.get(`/api/donate/user/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                // console.log("DAS IST DIE ANTWORT VOM SERVER: ",response)
                setDonation(response.data)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        // get all the donations from the server
        getMyDonations()
    }, [])

    // function to handel the on / off reserved boolean
	const handleSwitch = (documentId, subDocumentId) => {
		axios.post('/api/donate/reserved', {documentId, subDocumentId }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log("Response from Server: ",response)
			})
	}

    return (
        <>
            <Navbar />
			<h1>See a list of your Donations</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
				<table>
					<thead>
						<tr>
							<th>Donation</th>
							<th>Quantity</th>
							<th>Category</th>
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
		</>
	)
}