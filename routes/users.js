//Require Express
const express = require('express');

//Require Express router
const router = express.Router();

//Import tool to hash user passwords
const bcryptjs = require('bcryptjs');

//User model
const { User } = require('../db').models;

const { authenticateUser, asyncHandler } = require('./tools');

//Send a GET request to /users to return the currently authenticated user (200)
router.get(
	'/',
	authenticateUser,
	asyncHandler(async (req, res) => {
		const user = await User.findByPk(req.currentUser.dataValues.id, {
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
		});
		res.status(200).json(user);
	})
);

//Send a POST request to /users to create a user, set the Location header to '/' and return no content (201). Validate that an account doesn't already exist with the specified email address (200)
router.post(
	'/',
	asyncHandler(async (req, res, next) => {
		try {
			const user = req.body;
			if (user.password) {
				user.password = bcryptjs.hashSync(user.password);
			}
			if (!user.emailAddress) {
				user.emailAddress = '';
			}
			await User.findOrCreate({
				where: { emailAddress: user.emailAddress },
				defaults: user
			}).then(([user, created]) => {
				if (created) {
					console.log('New user successfully created');
					res.status(201).set('Location', '/').end();
				} else {
					res.status(200)
						.set('Location', '/')
						.json({
							message: `An account already exists with the email address ${user.emailAddress}`
						});
				}
			});
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				const errorMessages = error.errors.map(error => error.message);
				res.status(400).json({ errors: errorMessages });
			} else {
				throw error;
			}
		}
	})
);

module.exports = router;
