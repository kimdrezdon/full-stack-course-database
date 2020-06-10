//Require Express
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//User and Course models
const { User, Course } = require('../db').models;

const asyncHandler = require('../middleware/async');
// Auth middleware to use on protected routes
const auth = require('../middleware/auth');

// @route    GET api/courses
// @desc     Get all courses
// @access   Public
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

// @route    GET api/courses/:id
// @desc     Get course
// @access   Public
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
			res.status(404).json({ message: 'Course not found' });
		}
	})
);

// @route    POST api/courses
// @desc     Add a course
// @access   Private
//Send a POST request to /courses to create a course, set the Location header to the URI for the course, and return no content (201)
router.post(
	'/',
	[
		auth,
		check('title', 'Please add a title').not().isEmpty(),
		check('description', 'Please add a description').not().isEmpty()
	],
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map(error => error.msg);
			return res.status(400).json({ errors: errorMessages });
		}

		const user = req.user;

		req.body.userId = user.id;
		const course = await Course.create(req.body);
		if (course) {
			res.status(201).json(course);
		}
	})
);

// @route    PUT api/courses/:id
// @desc     Update a course
// @access   Private
//Send a PUT request to /courses/:id to update a course and return no content (204)
router.put(
	'/:id',
	[
		auth,
		check('title', 'Please add a title').not().isEmpty(),
		check('description', 'Please add a description').not().isEmpty()
	],
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map(error => error.msg);
			return res.status(400).json({ errors: errorMessages });
		}

		const user = req.user;

		const course = await Course.findByPk(req.params.id);
		if (course) {
			if (course.userId === user.id) {
				req.body.userId = user.id; //prevent accidental override of course owner
				await course.update(req.body);
				res.status(204).end();
			} else {
				res.status(403).json({ message: 'Access Denied' });
			}
		} else {
			res.sendStatus(404);
		}
	})
);

// @route    DELETE api/courses/:id
// @desc     Delete a course
// @access   Private
//Send a DELETE request to /courses/:id to delete a course and return no content
router.delete(
	'/:id',
	auth,
	asyncHandler(async (req, res) => {
		const user = req.user;
		const course = await Course.findByPk(req.params.id);
		if (course) {
			if (course.userId === user.id) {
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

module.exports = router;
