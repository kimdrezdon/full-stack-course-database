import { SET_ERROR, REMOVE_ERROR } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ERROR:
			return [...state, action.payload];
		case REMOVE_ERROR:
			return state.filter(error => error.id !== action.payload);
		default:
			return state;
	}
};
