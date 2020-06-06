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
	CLEAR_CURRENT,
	COURSE_ERROR
} from '../types';

const CourseState = props => {
	const initialState = {
		courses: null,
		current: null,
		error: null,
		courseChange: false,
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
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
		}
	};

	// Get Course Detail
	const getCourse = async courseId => {
		try {
			const res = await axios.get(`/api/courses/${courseId}`);
			// returns course data if course exists
			dispatch({ type: GET_COURSE, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
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
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
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
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
		}
	};

	const deleteCourse = async courseId => {
		try {
			await axios.delete(`/api/courses/${courseId}`);
			// returns no content
			dispatch({ type: DELETE_COURSE });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
		}
	};

	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	return (
		<CourseContext.Provider
			value={{
				courses: state.courses,
				current: state.current,
				error: state.error,
				loading: state.loading,
				courseChange: state.courseChange,
				getCourses,
				getCourse,
				deleteCourse,
				clearCurrent,
				createCourse,
				updateCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
