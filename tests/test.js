import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import db from '../db.js';
import contactModel from '../contactModel.js';

await db.open();

// Configure chai
chai.use(chaiHttp);
chai.should();

const testContact = {
	'name': 'test',
	'email': 'test@u.nus.edu',
	'phone': '123',
	'gender': 'male',
};

describe("Contacts", () => {
	describe("API test", () => {
		// before(async () => {
		// 	await db.open();
		// });

		// after(() => {
		// 	db.close();
		// });

		step("GET /api/contacts", async () => {
			const res = await chai
				.request(app)
				.get('/api/contacts')

			res.should.have.status(400);
			res.body.should.be.a('object');
		});

		step("POST /api/contacts", async () => {
			const res = await chai
				.request(app)
				.post('/api/contacts')
				.send(testContact);

			res.should.have.status(200);
			res.body.should.be.a('object');
		});

		step("PUT /api/contacts/{id}", async () => {
			const contacts = await contactModel
				.find(testContact)
				.exec();

			const res = await chai
				.request(app)
				.put(`/api/contacts/${contacts[0]._id}`)
				.send(testContact);

			res.should.have.status(200);
			res.body.should.be.a('object');
		});

		step("DELETE /api/contacts/{id}", async () => {
			const contacts = await contactModel
				.find(testContact)
				.exec();

			assert(contacts.length > 0, 'must have at least 1 contact from previous POST test');

			const outcome = await Promise.all(
				contacts.map(async (contact) => {
					const res = await chai.request(app)
						.delete(`/api/contacts/${contact._id}`)
						.send(testContact);

					return res.status === 200 && typeof res.body === 'object';
				})
			);
			if (outcome.includes(false)) {
				assert(false, 'failed to delete one of the contacts');
			}
		});
	});
});
