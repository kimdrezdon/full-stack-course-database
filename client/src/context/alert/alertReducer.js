import { SET_ALERT, REMOVE_ALERTS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				alerts: [...state.alerts, action.payload]
			};
		case REMOVE_ALERTS:
			return {
				...state,
				alerts: []
			};
		default:
			return state;
	}
};
