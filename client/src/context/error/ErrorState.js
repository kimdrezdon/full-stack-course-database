import React, { useReducer } from 'react';
// Generates random id for hard coded data
import { v4 as uuidv4 } from 'uuid';
import ErrorContext from './errorContext';
import errorReducer from './errorReducer';
import { SET_ERROR, REMOVE_ERROR } from '../types';

const ErrorState = props => {
	const initialState = [];

	const [state, dispatch] = useReducer(errorReducer, initialState);

	const setError = (msg, timeout = 5000) => {
		const id = uuidv4();
		dispatch({ type: SET_ERROR, payload: { msg, id } });

		setTimeout(
			() => dispatch({ type: REMOVE_ERROR, payload: id }),
			timeout
		);
	};

	return (
		<ErrorContext.Provider
			value={{
				errors: state,
				setError
			}}
		>
			{props.children}
		</ErrorContext.Provider>
	);
};

export default ErrorState;
