import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
	CREATE_COURSE,
	GET_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	COURSE_ERROR
} from '../types';

const CourseState = props => {
	const initialState = {
		courses: null,
		current: null,
		error: null,
		loading: true
	};

	const [state, dispatch] = useReducer(courseReducer, initialState);

	// Get Courses
	const getCourses = async () => {
		try {
			const res = await axios.get('/api/courses');
			// returns all course data if successful
			dispatch({ type: GET_COURSES, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response });
		}
	};

	// Get Course Detail
	const getCourse = async courseId => {
		try {
			const res = await axios.get(`/api/courses/${courseId}`);
			// returns course data if course exists
			dispatch({ type: GET_COURSE, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response });
		}
	};

	const updateCourse = async (formData, courseId) => {
		// Add header to request
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.put(
				`/api/courses/${courseId}`,
				formData,
				config
			);
			dispatch({ type: UPDATE_COURSE, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response });
		}
	};

	const createCourse = async formData => {
		// Add header to request
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/courses', formData, config);
			dispatch({ type: CREATE_COURSE, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response });
		}
	};

	const deleteCourse = async courseId => {
		try {
			await axios.delete(`/api/courses/${courseId}`);
			// returns no content
			dispatch({ type: DELETE_COURSE });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response });
		}
	};

	return (
		<CourseContext.Provider
			value={{
				courses: state.courses,
				current: state.current,
				error: state.error,
				loading: state.loading,
				getCourses,
				getCourse,
				deleteCourse,
				createCourse,
				updateCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
