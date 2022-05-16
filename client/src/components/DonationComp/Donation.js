import React from 'react'
import { Link } from 'react-router-dom'

export default function Donation({ name, _id }) {
	return (
		<div>
			<Link to={`/projects/${_id}`}>
				<h3>{name}</h3>
			</Link>
		</div>
	)
}
