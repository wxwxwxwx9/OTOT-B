import { useState } from 'react';
import axios from 'axios';

export default function AddContact() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [phone, setPhone] = useState('');

	const addContact = (event) => {
		event.preventDefault();

		const contact = {
			name,
			email,
			gender,
			phone,
		};

		console.log(contact);

		axios.post(`http://localhost:8080/api/contacts`, contact)
			.then(res => {
				console.log(res);	
			})
	};

	const renderAddContact = () => {
		return (
			<div className="add-contact">
				<div class="field">
					<label class="label">Name</label>
					<input class="input is-info" type="text" placeholder="" onChange={(e) => setName(e.target.value)}/>
				</div>
				<div class="field">
					<label class="label">Email</label>
					<input class="input is-info" type="text" placeholder="" onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div class="field">
					<label class="label">Gender</label>
					<input class="input is-info" type="text" placeholder="" onChange={(e) => setGender(e.target.value)}/>
				</div>
				<div class="field">
					<label class="label">Phone</label>
					<input class="input is-info" type="text" placeholder="" onChange={(e) => setPhone(e.target.value)}/>
				</div>
				<div class="field">
					<button class="button" onClick={addContact}>Add</button>
				</div>
			</div>
		);
	};

	return (
		<section class="section">
			<div class="field">
				<label class="label">Add Contact</label>
			</div>
			<div class="field">
				{renderAddContact()}
			</div>
		</section>
	);
}