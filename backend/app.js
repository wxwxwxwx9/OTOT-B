import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';

const app = express();

// Setup bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Enable cors regardless of PROD or not
app.use(cors());

// Setup routes
app.use('/api', routes);

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

export default app;