import { 
	CLEAR_SEARCH_RESULTS, 
	RECEIVE_SEARCH_ERROR, 
	RECEIVE_SEARCH_RESULTS, 
	CLEAR_SEARCH_ERROR 
} from '../actions/types';

const defaultSearchResults = {
	data: [],
	error: []
};

const searchReducer = (state = defaultSearchResults, action) => {
	Object.freeze(state);
	switch(action.type) {
		case RECEIVE_SEARCH_RESULTS:
			return { ...state, data: action.payload };
		case RECEIVE_SEARCH_ERROR:
			return { ...state, error: [ ...state.error, ...action.payload ] };
		case CLEAR_SEARCH_RESULTS:
			return { ...state, data: [] };
		case CLEAR_SEARCH_ERROR:
			return { ...state, error: [] };
		default:
			return state;
	}
}

export default searchReducer;