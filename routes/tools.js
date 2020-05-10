//Import tool to hash user passwords
const bcryptjs = require('bcryptjs');

//Import tool to parse the authorization header
const auth = require('basic-auth');

//User model
const { User } = require('../db').models;

module.exports = {
	//Middleware to handle errors without using try/catch blocks in every route. Takes in a callback function, wraps it in a try/catch block, and passes errors to the global error handling middleware
	asyncHandler: function (cb) {
		return async (req, res, next) => {
			try {
				await cb(req, res, next);
			} catch (err) {
				next(err);
			}
		};
	},

	//Custom authentication middleware function
	authenticateUser: async function (req, res, next) {
		let message = null;
		// Parse the user's credentials from the Authorization header. will be set to an object containing the user's key and secret
		const credentials = auth(req);
		// If the user's credentials are available and successfully parsed from the Authorization header...
		if (credentials) {
			// Attempt to retrieve the user from the database by their username (emailAddress)
			const user = await User.findOne({
				where: { emailAddress: credentials.name }
			});
			// If a user was successfully retrieved from the data store...
			if (user) {
				// Use the bcryptjs npm package to compare the user's password (from the Authorization header) to the user's password that was retrieved from the database.
				const authenticated = bcryptjs.compareSync(
					credentials.pass,
					user.password
				);
				// If the passwords match...
				if (authenticated) {
					console.log(
						`Authentication successful for username: ${user.emailAddress}`
					);
					// Then store the retrieved user object on the request object so any middleware functions that follow this middleware function will have access to the user's information.
					req.currentUser = user;
				} else {
					message = `Authentication failure for username: ${user.emailAddress}`;
				}
			} else {
				message = `User not found for username: ${credentials.name}`;
			}
		} else {
			message = 'Auth header not found';
		}
		// If user authentication failed...
		if (message) {
			console.warn(message);
			// Return a response with a 401 Unauthorized HTTP status code. Message is 'access denied' so as not to provide the user a hint to what went wrong.
			res.status(401).json({ message: 'Access Denied' });
		} else {
			// Or if user authentication succeeded... Call the next() method.
			next();
		}
	}
};
