import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const MONGODB_URI = 'mongodb://localhost/app'; 

const open = async () => {
	if (process.env.NODE_ENV === 'test') {
		const mockgoose = new Mockgoose(mongoose);
		throw new Error("before");
		await mockgoose.prepareStorage();
	}

	mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
	mongoose.connection.on('connected', () => {
		console.log('mongoose now connected')
	});
};

const close = () => {
	return mongoose.disconnect();
}

export default { open, close };
