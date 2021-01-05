import axios from 'axios';

export const getOwnedStocksData = async () => {
	const res = await axios.get('/api/v1/data/ownedstocks');
	return res.data;
}

export const getWatchlistStocksData = async () => {
	const res = await axios.get('/api/v1/data/watchlist');
	return res.data;
}

export const getNewsData = async () => {
	const res = await axios.get('/api/v1/data/news');
	return res.data;
}
