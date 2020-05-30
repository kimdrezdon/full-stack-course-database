import { USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				loading: false
			};
		case LOGIN_SUCCESS:
			// Sets token in local storage
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				loading: false
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
			// Clear token in local storage
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				user: null,
				loading: false,
				token: null,
				error: action.payload
			};
		default:
			return state;
	}
};
