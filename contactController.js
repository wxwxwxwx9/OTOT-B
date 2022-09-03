// Import contact model
import Contact from './contactModel.js';

const contactController = {};

// Handle index actions
contactController.index = (req, res) => {
	Contact.get((err, contacts) => {
		if (err) {
			res.json({
				status: "error",
				message: err,
			});
		}
		res.json({
			status: "success",
			message: "Contacts retrieved successfully",
			data: contacts
		});
	});
};

// Handle create contact actions
contactController.new = (req, res) => {
	const contact = new Contact();
	contact.name = req.body.name ? req.body.name : contact.name;
	contact.gender = req.body.gender;
	contact.email = req.body.email;
	contact.phone = req.body.phone;

	contact.save((err) => {
		if (err) {
		    res.json(err);
		}
		res.json({
			message: 'New contact created!',
			data: contact
		});
	});
};

// Handle view contact info
contactController.view = (req, res) => {
	Contact.findById(req.params.contact_id, (err, contact) => {
		if (err) {
			res.send(err);
		}
		res.json({
			message: 'Contact details loading..',
			data: contact
		});
	});
};

contactController.update = (req, res) => {
	Contact.findById(req.params.contact_id, (err, contact) => {
		if (err) {
			res.send(err);
		}
		contact.name = req.body.name ? req.body.name : contact.name;
		contact.gender = req.body.gender;
		contact.email = req.body.email;
		contact.phone = req.body.phone;

		contact.save((err) => {
			if (err) {
				res.json(err);
			}
			res.json({
				message: 'Contact Info updated',
				data: contact
			});
		});
	});
};

contactController.delete = (req, res) => {
	Contact.deleteOne({
		_id: req.params.contact_id
	}, (err, _contact) => {
		if (err) {
			res.send(err);
		}
		res.json({
			status: "success",
			message: 'Contact deleted'
		});
	});
};

export default contactController;