// Require Express
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import config in order to access values in default.json
const config = require('config');

// Import tool to hash user passwords
const bcrypt = require('bcryptjs');

// Import JSON Web Token
const jwt = require('jsonwebtoken');

// User model
const { User } = require('../db').models;

// Middleware
const asyncHandler = require('../middleware/async');
const auth = require('../middleware/auth');

// @route 	GET api/auth
// @desc  	Get logged in user
// @access 	Private
router.get(
	'/',
	auth,
	asyncHandler(async (req, res) => {
		// User id comes from auth middleware decoding the token
		const user = await User.findByPk(req.user.id, {
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
		});
		res.status(200).json(user);
	})
);

// @route    POST api/auth
// @desc     Login user & get token
// @access   Public
router.post(
	'/',
	[
		check('emailAddress', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists()
	],
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map(error => error.msg);
			console.log(errorMessages);
			return res.status(400).json({ errors: errorMessages });
		}

		const { emailAddress, password } = req.body;

		const user = await User.findOne({
			where: { emailAddress }
		});

		// If a user wasn't found in the database
		if (!user) {
			return res.status(401).json({ message: 'Invalid Credentials' });
		}

		// Use bcrypt to compare the user's password to the user's password that was retrieved from the database.
		const matched = await bcrypt.compare(password, user.password);

		// If the passwords don't match
		if (!matched) {
			return res.status(401).json({ message: 'Invalid Credentials' });
		}

		// Grab the user's id automatically generated by the database
		const payload = {
			user: {
				id: user.id
			}
		};

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
				res.status(200).json({ token });
			}
		);
	})
);

module.exports = router;
