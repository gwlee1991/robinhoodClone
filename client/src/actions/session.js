import { RECEIVE_CURRENT_USER, CLEAR_SESSION_ERROR, RECEIVE_SESSION_ERROR } from './types';
import * as sessionApi from '../api/sessionApi';

// sync action creators
export const receiveCurrentUser = currentUser => ({
	type: RECEIVE_CURRENT_USER,
	payload: currentUser
})

export const clearSessionError = () => ({
	type: CLEAR_SESSION_ERROR,
})

export const receiveSessionError = (err) => ({
	type: RECEIVE_SESSION_ERROR,
	payload: err
})

// async action creators
export const signup = user => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await sessionApi.signUp(user)));
		dispatch(clearSessionError());
	} catch (err) {
		dispatch(receiveSessionError(err));
	}
}

export const login = user => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await sessionApi.logIn(user)));
		dispatch(clearSessionError());
	} catch (err) {
		dispatch(receiveSessionError(err))
	}
}

export const getCurrentUser = () => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await sessionApi.getCurrentUser()));
		dispatch(clearSessionError());
	} catch(err) {
		dispatch(receiveSessionError(err));
	}
}

export const logout = () => async dispatch => {
	try {
		document.cookie = "access_token=;";
		dispatch(receiveCurrentUser(null));
	} catch (err) {
		console.log(err);
	}
}

export const demoLogin = () => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await sessionApi.demoLogIn()));
		dispatch(clearSessionError());
	} catch (err) {
		dispatch (receiveSessionError(err));
	}
}