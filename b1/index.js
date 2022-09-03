// Setup express 
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
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
mongoose.connect('mongodb://localhost/app', { useNewUrlParser: true });

const db = mongoose.connection;
if (!db) {
	console.log("Error connecting db");
} else {
	console.log("Db connected successfully");
}

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port
app.listen(port, function () {
	console.log("Running app on port " + port);
});

export default app;