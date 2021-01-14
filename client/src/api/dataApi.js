import axios from 'axios';

export const getOwnedStocksData = async () => {
	const res = await axios.get('/api/v1/data/ownedstocks');
	return res.data;
}

export const getWatchlistStocksData = async (name) => {
	const res = await axios.get(`/api/v1/data/watchlist?watchlistName=${name}`);
	return res.data;
}

export const getNewsData = async () => {
	const res = await axios.get('/api/v1/data/news');
	return res.data;
}

export const getStockData = async (ticker) => {
	const res = await axios.get(`/api/v1/data/stock?ticker=${ticker}`);
	return res.data;
}

export const querySearch = async (searchTerm) => {
	const res = await axios.get(`/api/v1/data/search?searchTerm=${searchTerm}`);
	return res.data;
}