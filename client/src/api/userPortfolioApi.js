import axios from 'axios';

export const addWatchList = async (watchListName) => {
	const res = await axios.post('/api/v1/watchlist/add', { watchListName });
	return res.data;
}

export const addBuyingPower = async (buyingPower) => {
	const res = await axios.post('/api/v1/buyingpower/add', { buyingPower });
	return res.data;
}
