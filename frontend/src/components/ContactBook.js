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

	const renderContacts = () => {
		return contacts.map((contact, idx) => {
			return (
				<div className="contact" key={idx}>
					<div class="field">
						<label class="label">Number</label>
						{idx}
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