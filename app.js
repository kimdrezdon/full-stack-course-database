//Require express
const express = require('express');
const app = express();

const path = require('path');

//Setup morgan
const morgan = require('morgan');
app.use(morgan('dev'));

//Add CORS to support secure cross origin requests and data transfers between browsers and web servers
const cors = require('cors');
app.use(cors());

// variable to enable global error logging
const enableGlobalErrorLogging =
	process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// imports the database from index.js
const db = require('./db');

//Express middleware parses incoming JSON from the client and makes it available to our Express server via req.body
app.use(express.json());

//test the connection to the database
(async () => {
	try {
		await db.sequelize.authenticate();
		console.log('Connected to the database');
	} catch (error) {
		console.error('Error connecting to the database', error);
	}
})();

// sync all tables. force:true drops the table that exists each time the app is started and recreates it from the model definition
db.sequelize.sync();

// Define the routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

//Global error handling middleware
app.use((err, req, res, next) => {
	if (err.name === 'SequelizeValidationError') {
		const errorMessages = err.errors.map(error => error.message);
		res.status(400).json({ errors: errorMessages });
	} else {
		if (enableGlobalErrorLogging) {
			console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
		}
		res.status(err.status || 500).json({
			message: err.message,
			error: {}
		});
	}
});

// Heroku deployment setup
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
	console.log(
		`Express server is listening on port: ${server.address().port}`
	);
});
