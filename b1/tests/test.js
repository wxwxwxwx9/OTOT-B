import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import contactModel from '../contactModel.js';

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
	describe("GET /api/contacts", () => {
		it("should get all contacts", async () => {
			chai.request(app)
				.get('/api/contacts')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
				});
		});
	});
	describe("POST /api/contacts", () => {
		it("should add a new contact", async () => {
			chai.request(app)
				.post('/api/contacts')
				.send(testContact)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
				});
		});
	});
	describe("PUT /api/contacts/{id}", () => {
		it("should update an existing contact", async () => {
			const contacts = await contactModel
				.find(testContact)
				.exec();

			chai.request(app)
				.put(`/api/contacts/${contacts[0]._id}`)
				.send(testContact)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
				});
		});
	});
	describe("DELETE /api/contacts/{id}", () => {
		it("should delete an existing contact", async () => {
			const contacts = await contactModel
				.find(testContact)
				.exec();
			assert(contacts.length > 0, 'must have at least 1 contact from previous POST test');

			contacts.forEach((contact) => {
				chai.request(app)
					.delete(`/api/contacts/${contact._id}`)
					.send(testContact)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
					});
			});
		});
	});
});
