import {
	CREATE_COURSE,
	GET_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	SET_CURRENT,
	CLEAR_CURRENT,
	COURSE_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_COURSES:
			return {
				...state,
				courses: action.payload,
				loading: false
			};
		case GET_COURSE:
			return {
				...state,
				current: action.payload,
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
