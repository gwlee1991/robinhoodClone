import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import searchResultsReducer from './searchReducer'

const rootReducer = combineReducers({
	currentUser: currentUserReducer,
	searchResults: searchResultsReducer
});

export default rootReducer;