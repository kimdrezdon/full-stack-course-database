import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true, // Used by PrivateRoute
		error: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load User - need to do on each page load to keep the user authenticated because jwt is stateless. Get the user data from the backend and put it into our state
	const loadUser = async () => {
		// Load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			// Response will be the user, password excluded
			const res = await axios.get('/api/auth');
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	const signIn = async formData => {
		// Add header to request
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			// Send post request to back-end with login form data in the req.body
			const res = await axios.post('/api/auth', formData, config);
			// Response will be the jwt token from back-end
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
		}
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				loadUser,
				signIn
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
