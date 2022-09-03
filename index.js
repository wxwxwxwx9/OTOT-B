// Setup express 
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import routes from './routes.js';

const app = express();

// Setup bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Setup routes
app.use('/api', routes)

// Setup mongoose
const MONGODB_URI = 'mongodb://localhost/app'; 

// if (process.env.NODE_ENV === 'test') {
// 	const mockgoose = new Mockgoose(mongoose);
// 	await mockgoose.prepareStorage();
// }	

await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
	console.log('mongoose now connected')
});

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port
app.listen(port, function () {
	console.log("Running app on port " + port);
});

export default app;