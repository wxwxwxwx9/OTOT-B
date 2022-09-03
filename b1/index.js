// Setup express 
let express = require('express')
let app = express();

// Setup bodyparser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
// app.use(express.json());

// Setup routes
let apiRoutes = require("./api-routes")
app.use('/api', apiRoutes)

// Setup mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });

var db = mongoose.connection;
if (!db) {
	console.log("Error connecting db");
} else {
	console.log("Db connected successfully");
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});