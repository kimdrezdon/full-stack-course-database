import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import {} from '../types';

const AuthState = props => {
	const initialState = {};

	const [state, dispatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider value={}>{props.children}</AuthContext.Provider>
	);
};

export default AuthState;
