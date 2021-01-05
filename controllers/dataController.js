const axios = require('axios');
const User = require('../models/User');
const keys = require('../configs');
const { finnhubToken } = keys;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

const getStockData = async stock => {
	const ENDPOINT = '/quote';
	try {
		const res = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}?symbol=${stock}&token=${finnhubToken}`);
		return res.data;
	} catch (err) {
		throw err;
	}
}

const getStocksData = async (res, stocks) => {
	let executed = 0;
	let total = stocks.length;
	let responseBody = [];
	try {
		stocks.forEach(async stock => {
			const response = await getStockData(stock);
			responseBody.push({
				name: stock,
				info: response
			})
			executed++;
			if (total === executed) {
				res.send(responseBody);
			}
		})
	} catch (err) {
		console.log(err);
		throw ['Unknown error has occurred.']
	}
}

const getWatchlistStocksData = async (req, res) => {
	const user = req.user;
	console.log(user);
	try {
		const existingUser = await User.findById(user._id);
		const watchlist = existingUser.watchList;
		getStocksData(res, watchlist);
	} catch (err) {
		console.log(err);
		res.status(400).send(['Unknown error has occurred.']);
	}

}


const getOwnedStocksData = async (req, res) => {
	const user = req.user;
	try {
		const existingUser = await User.findById(user._id);
		const ownedStocks = existingUser.ownedStocks;
		getStocksData(res, ownedStocks);
	} catch (err) {
		console.log(err);
		res.status(400).send(['Unknown error has occurred.'])
	}
}

const getNewsData = async (req, res) => {
	const ENDPOINT = '/news?category=general&mindId=10';
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}&token=${finnhubToken}`);
		res.send(response.data)
	} catch (err) {
		res.status(400).send(['Unknown error has occurred.']);
	}
}

module.exports = {
	getWatchlistStocksData,
	getOwnedStocksData,
	getNewsData
}