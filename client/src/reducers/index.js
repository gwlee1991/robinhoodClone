import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import searchResultsReducer from './searchReducer'
import stockReducer from './stockReducer';

const rootReducer = combineReducers({
	currentUser: currentUserReducer,
	searchResults: searchResultsReducer,
	stockInfo: stockReducer
});

export default rootReducer;