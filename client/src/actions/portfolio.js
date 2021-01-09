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

export const addBuyingPower = buyingPower => async dispatch => {
	try {
		dispatch(receiveCurrentUser(await portfolioApi.addBuyingPower(buyingPower)));
		dispatch(clearSessionError());
	} catch (err) {
		receiveSessionError(err);
	}
}