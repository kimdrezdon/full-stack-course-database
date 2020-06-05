import {
	CREATE_COURSE,
	GET_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	CLEAR_CURRENT,
	COURSE_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_COURSES:
			return {
				...state,
				courses: action.payload,
				current: null,
				courseChange: false,
				loading: false
			};
		case GET_COURSE:
			return {
				...state,
				current: action.payload,
				loading: false
			};
		case CREATE_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
				courseChange: true,
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
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
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
