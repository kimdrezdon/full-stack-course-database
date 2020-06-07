import {
	CREATE_COURSE,
	GET_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	COURSE_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_COURSES:
			return {
				...state,
				courses: action.payload,
				current: null,
				loading: false
			};
		case GET_COURSE:
			return {
				...state,
				current: action.payload,
				loading: false
			};
		case UPDATE_COURSE:
			return {
				...state,
				courses: state.courses.map(course =>
					course.id === action.payload.id ? action.payload : course
				),
				loading: false
			};
		case CREATE_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
				loading: false
			};
		case DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter(
					course => course.id !== action.payload
				),
				loading: false
			};
		case COURSE_ERROR:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};
