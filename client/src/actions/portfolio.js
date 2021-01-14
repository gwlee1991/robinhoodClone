import { receiveCurrentUser, receiveSessionError, clearSessionError } from './session';
import * as portfolioApi from '../api/userPortfolioApi';

export const addWatchList = (watchListName) => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await portfolioApi.addWatchList(watchListName)));
		dispatch(clearSessionError());
	} catch(err){
		receiveSessionError(err);
	}
}

export const deleteWatchList = (watchlistName) => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await portfolioApi.deleteWatchList(watchlistName)));
		dispatch(clearSessionError());
	} catch (err) {
		receiveSessionError(err);
	}
}

export const editWatchList = (payload) => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await portfolioApi.editWatchList(payload)));
		dispatch(clearSessionError());
	} catch (err) {
		receiveSessionError(err);
	}
}

export const addBuyingPower = buyingPower => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await portfolioApi.addBuyingPower(buyingPower)));
		dispatch(clearSessionError());
	} catch (err) {
		receiveSessionError(err);
	}
}