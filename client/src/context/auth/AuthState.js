import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
//use the JavaScript Cookie library
import Cookies from 'js-cookie';
import {} from '../types';

const AuthState = props => {
	const initialState = {
\
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const getUser = () => {
		const res = await axios.get('/users')
	}

	return (
		<AuthContext.Provider value={

		}>{props.children}</AuthContext.Provider>
	);
};

export default AuthState;
