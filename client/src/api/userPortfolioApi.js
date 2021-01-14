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