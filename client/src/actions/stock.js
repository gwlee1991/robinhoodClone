import * as dataApi from '../api/dataApi';
import {RECEIVE_STOCKINFO, RECEIVE_STOCKINFO_ERROR, CLEAR_STOCKINFO, CLEAR_STOCKINFO_ERROR} from './types';

// sync action creators

export const receiveStockInfo = (stockInfo) => ({
	type: RECEIVE_STOCKINFO,
	payload: stockInfo
});

export const clearStockInfo = () => ({
	type: CLEAR_STOCKINFO,
});

export const receiveStockInfoError = err => ({
	type: RECEIVE_STOCKINFO_ERROR,
	payload: err
});

export const clearStockInfoError = () => ({
	type: CLEAR_STOCKINFO_ERROR
})

// async action creators

export const fetchStockInfo = (tickerSymbol) => async dispatch => {
	try {
		dispatch(receiveStockInfo(await dataApi.getStockData(tickerSymbol)));
		dispatch(clearStockInfoError());
	} catch (err) {
		dispatch(receiveStockInfoError(err));
	}
}