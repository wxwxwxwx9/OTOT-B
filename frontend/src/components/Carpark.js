import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactBook() {
	const [ min, setMin] = useState(0);
	const [ carparks, setCarparks ] = useState([]);

	const query = () => {
		axios.get(`https://nlttiphca7w3wttzauitlexs4e0thtor.lambda-url.ap-southeast-1.on.aws`, { params: { min } })
			.then((res) => {
				console.log(res.data);
				setCarparks(res.data);
			});
	};

	return (
		<section class="section">
			<div className="carparks">
				<div class="field">
					<label class="label">Carparks with minimum car lots</label>
					<input class="input is-info" type="text" placeholder="Find out how many carparks have a min. car lots of your choosing!" onChange={(e) => setMin(e.target.value)}/>
				</div>
				<div class="field">
					<button class="button" onClick={query}>Submit</button>
				</div>
				<div class="field">
					<label class="label">No. of carparks</label>
				</div>
				<div class="field">
					{ carparks.length }
				</div>
			</div>
		</section>
	);
}