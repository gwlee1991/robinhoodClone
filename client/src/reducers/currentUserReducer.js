import { RECEIVE_CURRENT_USER, CLEAR_SESSION_ERROR, RECEIVE_SESSION_ERROR } from '../actions/types';

const defaultCurrentUser = {
	info: null,
	errors: []
};

const currentUserReducer = (state = defaultCurrentUser, action) => {
	Object.freeze(state);
	switch(action.type) {
		case RECEIVE_CURRENT_USER:
			return { info: action.payload, errors: [] }
		case RECEIVE_SESSION_ERROR:
			return { ...state, errors: [ ...action.payload.response.data ] }
		case CLEAR_SESSION_ERROR:
			return { ...state, errors: [] };
		default:
			return state;
	}
}

export default currentUserReducer;