import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactBook() {
	const [ contacts, setContacts ] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:8080/api/contacts`)
			.then((res) => {
				console.log(res);
				setContacts(res.data.data);
			});
	});

	const deleteContact = (id) => {
		// server must still run when deleting non-existent id
		axios.delete(`http://localhost:8080/api/contacts/${id}`)
			.then((res) => {
				console.log(res);
			});
	};

	const renderContacts = () => {
		return contacts.map((contact, idx) => {
			return (
				<div className="contact" key={idx}>
					<div class="field">
						<label class="label">No.</label>
						{idx}
					</div>
					<div class="field">
						<label class="label">ID</label>
						{contacts[idx]._id}
					</div>
					<div class="field">
						<label class="label">Name</label>
						{contact.name}
					</div>
					<div class="field">
						<label class="label">Email</label>
						{contact.email}
					</div>
					<div class="field">
						<label class="label">Gender</label>
						{contact.gender}
					</div>
					<div class="field">
						<label class="label">Phone</label>
						{contact.phone}
					</div>
					<div class="field">
						<button class="button" onClick={() => deleteContact(contacts[idx]._id)}>Delete</button>
					</div>
				</div>
			);
		});
	};

	return (
		<section class="section">
			<div className="contacts">
				<div class="field">
					<label class="label">Existing Contacts</label>
				</div>
				<div class="field">
					{renderContacts()}
				</div>
			</div>
		</section>
	);
}