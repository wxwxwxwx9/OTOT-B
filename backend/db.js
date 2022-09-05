import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let MONGODB_URI = 'mongodb://localhost/app'; 

const open = async () => {
	// if (process.env.NODE_ENV === 'test') {
	const mongod = await MongoMemoryServer.create();
	MONGODB_URI = mongod.getUri();
	// }

	await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
	mongoose.connection.on('connected', () => {
		console.log('mongoose now connected')
	});
};

const close = async () => {
	await mongoose.disconnect();
}

export default { open, close };
