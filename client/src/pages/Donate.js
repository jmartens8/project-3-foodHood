import Navbar from "../components/Navbar"
import axios from 'axios'
import React, { useState } from 'react'

export default function Donate(props) {
    const [name, setName] = useState('')
	const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState([])

    const storedToken = localStorage.getItem('authToken')

	const handleSubmit = e => {
		e.preventDefault()
		// send the form data to the backend
		axios.post('/api/donate', { name, quantity, category }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log(response)
				// reset the form
				setName('')
				setQuantity('')
                setCategory('')

				// refresh the list of projects in 'ProjectsList'
				// props.getAllProjects()
			})
			.catch(err => console.log(err))
	}

	return (
		<>
            <Navbar />
			<h1>Donate your food</h1>
            <h4>to your neighbors around</h4>
			<form onSubmit={handleSubmit}>
                <label>Food:</label>
				<input
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
                <label>Quantitiy:</label>
				<input
					type="number"
					value={quantity}
					onChange={e => setQuantity(e.target.value)}
				/>
                <label>Category:</label>
				<select name="category" onChange={e => setCategory(e.target.selectedOptions)} multiple={true} value={category.category}>
                    <option value="">--Please choose the categories--</option>
                    <option value="fruits&vegetables">Fruits & Vegetables</option>
                    <option value="backery">Backery</option>
                    <option value="chees&dairy">Cheese & Dairy</option>
                    <option value="meat&fish">Meat & Fish</option>
                    <option value="coldcuts">Cold cuts</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks&sweets">Snacks & Sweets</option>
                    <option value="frozen">Frozen</option>
                    <option value="other">Other</option>
                </select>

				<button type="submit">Donate</button>
			</form>
		</>
	)
}