import React, { useReducer } from 'react';
// Generates random id for hard coded data
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERTS } from '../types';

const AlertState = props => {
	const initialState = {
		alerts: []
	};

	const [state, dispatch] = useReducer(alertReducer, initialState);

	const setAlert = msg => {
		const id = uuidv4();
		dispatch({ type: SET_ALERT, payload: { msg, id } });
	};

	const removeAlerts = () => {
		dispatch({ type: REMOVE_ALERTS });
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state.alerts,
				setAlert,
				removeAlerts
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
