//Require Express
const express = require('express');

//Require Express router
const router = express.Router();

//User and Course models
const { User, Course } = require('../db').models;

const asyncHandler = require('../middleware/async');
// Auth middleware to use on protected routes
const authenticateUser = require('../middleware/auth');

//Send a GET request to /courses to return a list of courses, including the user that owns each course (200)
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const courses = await Course.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			include: [
				{
					model: User,
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt']
					}
				}
			] //list of associations to load
		});
		res.status(200).json(courses);
	})
);

//Send a GET request to /courses/:id to return the course, including the user that owns the course, for the provided course ID (200)
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const course = await Course.findByPk(req.params.id, {
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			include: [
				{
					model: User,
					attributes: {
						exclude: ['password', 'createdAt', 'updatedAt']
					}
				}
			] //list of associations to load
		});
		if (course) {
			res.status(200).json(course);
		} else {
			res.sendStatus(404);
		}
	})
);

//Send a POST request to /courses to create a course, set the Location header to the URI for the course, and return no content (201)
router.post(
	'/',
	authenticateUser,
	asyncHandler(async (req, res) => {
		const user = req.currentUser;

		req.body.userId = user.dataValues.id;
		const course = await Course.create(req.body);
		const courseId = course.dataValues.id;
		res.status(201).set('Location', `/courses/${courseId}`).end();
	})
);

//Send a PUT request to /courses/:id to update a course and return no content (204)
router.put(
	'/:id',
	authenticateUser,
	asyncHandler(async (req, res) => {
		const user = req.currentUser;

		const course = await Course.findByPk(req.params.id);
		if (course) {
			if (course.userId === user.dataValues.id) {
				if (req.body.title && req.body.description) {
					req.body.userId = user.dataValues.id; //prevent accidental override of course owner
					await course.update(req.body);
					res.status(204).end();
				} else {
					res.status(400).json({
						message: 'Please provide both a title and a description'
					});
				}
			} else {
				res.status(403).json({ message: 'Access Denied' });
			}
		} else {
			res.sendStatus(404);
		}
	})
);

//Send a DELETE request to /courses/:id to delete a course and return no content
router.delete(
	'/:id',
	authenticateUser,
	asyncHandler(async (req, res) => {
		const user = req.currentUser;
		const course = await Course.findByPk(req.params.id);
		if (course) {
			if (course.userId === user.dataValues.id) {
				await course.destroy();
				res.status(204).end();
			} else {
				res.status(403).json({ message: 'Access Denied' });
			}
		} else {
			res.sendStatus(404);
		}
	})
);

//Export the router
module.exports = router;
