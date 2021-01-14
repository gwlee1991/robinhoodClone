const axios = require('axios');
const url = require('url');
const User = require('../models/User');
const keys = require('../configs');
const { finnhubToken } = keys;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

const monthInMilliseconds = 1000 * 60 * 60 * 24 * 30;

// helpers
const fetchStockData = async stock => {
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
			const response = await fetchStockData(stock);
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

const getCompanyNews = async (ticker) => {
	const now = Date.now();
	const past = now - monthInMilliseconds;
	const nowDate = new Date(now);
	const pastDate = new Date(past);
	const toString = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1 < 10 ? `0${nowDate.getMonth() + 1}` : `${nowDate.getMonth() + 1}`}-${nowDate.getDate()}`;
	const fromString = `${pastDate.getFullYear()}-${pastDate.getMonth() + 1 < 10 ? `0${pastDate.getMonth() + 1}` : `${pastDate.getMonth() + 1}`}-${pastDate.getDate()}`;
	const ENDPOINT = `/company-news?symbol=${ticker}&from=${fromString}&to=${toString}&token=${finnhubToken}`;
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}`);
		return response.data;
	} catch (err) {
		throw { message: ['Unknown error has occurred.'] }
	}
}

const getStockPeers = async ticker => {
	const ENDPOINT = `/stock/peers?symbol=${ticker}`;
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}&token=${finnhubToken}`)
		return response.data;
	} catch (err) {
		console.log(err);
		throw { message: ['Unknown error has occurred'] };
	}
}

const getStockRecommendation = async ticker => {
	const ENDPOINT = `/stock/recommendation?symbol=${ticker}&token=${finnhubToken}`;
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}`);
		return response.data;
	} catch (err) {
		console.log(err);
		throw { message: ['Unknown error has occurred'] };
	}	
}

const companyFinance = async ticker => {
	const ENDPOINT = `/stock/metric?symbol=${ticker}&metric=all&token=${finnhubToken}`;
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}`);
		return response.data;
	} catch (err) {
		throw { message: ['Unknown error has occurred'] };
	}
}

const earningSurprises = async ticker => {
	const ENDPOINT = `/stock/earnings?symbol=${ticker}&token=${finnhubToken}`;
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}`);
		return response.data;
	} catch (err) {
		throw { message: ['Unknown error has occurred.'] };
	}
};

// controllers

const getStockData = async (req, res) => {
	const queryObject = url.parse(req.url, true).query;
	try {
		const { ticker } = queryObject;
		const quote = new Promise(async (resolve, reject) => {
			try {
				const res = await fetchStockData(ticker);
				resolve(res.data);
			} catch (err) {
				reject(err);
			}
		});

		const news = new Promise(async (resolve, reject) => {
			try {
				const news = await getCompanyNews(ticker);
				resolve(news);
			} catch (err) {
				reject (err)
			}
		})

		const peers = new Promise(async (resolve, reject) => {
			try {
				const peerData = await getStockPeers(ticker);
				resolve(peerData);
			} catch (err) {
				reject (err);
			}
		})
		
		const analystRecommendation = new Promise(async (resolve, reject) => {
			try {
				const recommendation = await getStockRecommendation(ticker);
				resolve(recommendation);
			} catch (err) {
				reject(err);
			}
		})

		const finance = new Promise(async(resolve,reject) => {
			try {
				const financeData = await companyFinance(ticker);
				resolve(financeData);
			} catch (err) {
				reject (err);
			}
		})

		const earnings = new Promise(async(resolve, reject) => {
			try {
				const earningsData = await earningSurprises(ticker);
				resolve(earningsData);
			} catch(err) {
				reject(err)
			}
		})

		Promise.all([quote, news, peers, analystRecommendation, finance, earnings]).then((values) => {
			res.send({
				name: ticker,
				info: {
					quote: values[0],
					peers: values[2],
					recommendation: values[3],
					finance: values[4],
					earnings: values[5]
				},
				news: values[1]
			});
		})
	} catch (err) {
		res.status(400).send(['Unknown error has occurred']);
	}
}

const getWatchlistStocksData = async (req, res) => {
	const user = req.user;
	const queryObject = url.parse(req.url, true).query;
	try {
		const watchListName = queryObject.watchlistName;
		const existingUser = await User.findById(user._id);
		const watchlist = existingUser.watchLists.filter(watchlist => watchlist.name === watchListName)[0];
		getStocksData(res, watchlist.stocks);
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

const searchQuery = async (req, res) => {
	const queryObject = url.parse(req.url, true).query;
	const ENDPOINT = '/search';
	try {
		const response = await axios.get(`${FINNHUB_BASE_URL}${ENDPOINT}?q=${queryObject.searchTerm}&token=${finnhubToken}`);
		if (response.data.count > 6) {
			res.send(response.data.result.slice(0, 6));
		} else {
			res.send(response.data.result);
		}
	} catch (err) {
		res.status(400).send(['Unknown error has occurred']);
	}
}

module.exports = {
	getWatchlistStocksData,
	getOwnedStocksData,
	getNewsData,
	searchQuery,
	getStockData
}