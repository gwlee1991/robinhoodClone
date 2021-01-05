import { combineReducers } from 'redux';
import currentUserReducers from './currentUserReducer';

const rootReducer = combineReducers({
	currentUser: currentUserReducers
});

export default rootReducer;