//Require Express
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//Import tool to hash user passwords
const bcrypt = require('bcryptjs');

// Import config in order to access values in default.json
const config = require('config');

// Import JSON Web Token
const jwt = require('jsonwebtoken');

//User model
const { User } = require('../db').models;

const asyncHandler = require('../middleware/async');

// @route    POST api/users
// @desc     Register user
// @access   Public
// Send a POST request to /users to create a user, set the Location header to '/' and return no content (201). Validate that an account doesn't already exist with the specified email address (200)
router.post(
	'/',
	[
		check('firstName', 'Please add a first name').not().isEmpty(),
		check('lastName', 'Please add a last name').not().isEmpty(),
		check('emailAddress', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please provide a password with 6 or more characters'
		).isLength({ min: 6 })
	],
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map(error => error.msg);
			return res.status(400).json({ errors: errorMessages });
		}

		const user = req.body;
		const { password, emailAddress } = user;

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await User.findOrCreate({
			where: { emailAddress },
			defaults: user
		}).then(([user, created]) => {
			if (created) {
				console.log('New user successfully created');

				// Grab the user's id automatically generated by database
				const payload = {
					user: {
						id: user.id
					}
				};

				// Generate json web token
				jwt.sign(
					payload,
					config.get('jwtSecret'),
					{
						// Expires in 3600 sec which is an hour
						expiresIn: 10800
					},
					(err, token) => {
						if (err) throw err;
						// Respond with jwt token
						res.status(201).json({ token });
					}
				);
			} else {
				res.status(200)
					.set('Location', '/')
					.json({
						message: `An account already exists with the email address ${emailAddress}`
					});
			}
		});
	})
);

module.exports = router;
