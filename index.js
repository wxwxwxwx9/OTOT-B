import app from './app.js';
import db from './db.js';

await db.open();

const port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log("Running app on port " + port);
});

export default app;