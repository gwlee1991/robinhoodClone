import { 
	RECEIVE_SEARCH_RESULTS,
	RECEIVE_SEARCH_ERROR, 
	CLEAR_SEARCH_ERROR, 
	CLEAR_SEARCH_RESULTS
} from './types';
import * as dataApi from '../api/dataApi';

// sync action creators
export const receiveSearchResults = searchResults => ({
	type: RECEIVE_SEARCH_RESULTS,
	payload: searchResults
});

export const receiveSearchError = err => ({
	type: RECEIVE_SEARCH_ERROR,
	payload: err
});

export const clearSearchError = () => ({
	type: CLEAR_SEARCH_ERROR
});

export const clearSearchResults = () => ({
	type: CLEAR_SEARCH_RESULTS
});

// async action creators

export const fetchSearchResults = searchTerm => async dispatch => {
	try {
		dispatch(receiveSearchResults(await dataApi.querySearch(searchTerm)));
		dispatch(clearSearchError())
	} catch (err) {
		dispatch(receiveSearchError(err));
	}
} 