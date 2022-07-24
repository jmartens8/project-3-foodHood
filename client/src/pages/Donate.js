import MyNavbar from "../components/Navbar"
import axios from 'axios'
import React, { useState, useRef } from 'react'
import {Multiselect} from 'multiselect-react-dropdown';

export default function Donate(props) {
    const [name, setName] = useState('')
	const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState(["Backery", "Beverages", "Cheese & Dairy", "Cold Cuts", "Fruits & Vegetables", "Frozen", "Meat & Fish", "Snacks & Sweets", "Other"])

    const storedToken = localStorage.getItem('authToken')

	const handleSubmit = e => {
		e.preventDefault()
		// send the form data to the backend
		axios.post('/api/donate', { name, quantity, category }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				// console.log("This is the response from the axios post request in Donate.js: ", response)
				// reset the form
				setName('')
				setQuantity('')
				// multiselectRef.current.resetSelectedValues()
			})
			.catch(err => console.log(err))
	}

	// change the state to the selected categroies from the drop down
    const onSelect = (selecetedList) => {
        setCategory(selecetedList)
    }
	// selectable option for the drop down
	const options = ["Backery", "Beverages", "Cheese & Dairy", "Cold Cuts", "Fruits & Vegetables", "Frozen", "Meat & Fish", "Snacks & Sweets", "Other"]

	// after submissiont the drop down shall reset
	const multiselectRef = useRef()

	const resetSelectField = () => {
		multiselectRef.current.resetSelectedValues();
	};

	return (
		<>
            <MyNavbar />
			<h1>Donate your food</h1>
            <h4>to your neighbors around</h4>
			<form class="donationForm" onSubmit={handleSubmit}>
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
                <Multiselect
                    isObject={false}
                    onKeyPressFn={function noRefCheck(){}}
                    onRemove={function noRefCheck(){}}
                    onSearch={function noRefCheck(){}}
                    onSelect={onSelect}
                    options={options}
					ref={multiselectRef}
                    showCheckbox
                    />
				<button type="submit" onClick={resetSelectField}>Donate</button>
			</form>
		</>
	)
}