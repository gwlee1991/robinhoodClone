import axios from 'axios';

export const addWatchList = async (watchListName) => {
	const res = await axios.post('/api/v1/watchlist/add', { watchListName });
	return res.data;
}

export const editWatchList = async (payload) => {
	const res = await axios.post('/api/v1/watchlist/edit', payload);
	return res.data;
}

export const deleteWatchList = async (watchlistName) => {
	const res = await axios.post('/api/v1/watchlist/delete', { watchlistName })
	return res.data;
}

export const addBuyingPower = async (buyingPower) => {
	const res = await axios.post('/api/v1/buyingpower/add', { buyingPower });
	return res.data;
}

export const addStockToWatchList = async (payload) => {
	/*
	payload = {
		stock: "TSLA",
		watchListName: "watchlist1"
	}
	*/

	const res = await axios.post('/api/v1/watchlist/stock/add', payload);
	return res.data;
};

export const removeStockFromWatchList = async (payload) => {
	const res = await axios.post('/api/v1/watchlist/stock/delete', payload);
	return res.data;
};