const StockDataController = require('../controllers/dataController');
const auth = require('../middlewares/auth');

module.exports = (app) => {
	app.get('/api/v1/data/watchlist', auth, StockDataController.getWatchlistStocksData);
	app.get('/api/v1/data/ownedstocks', auth, StockDataController.getOwnedStocksData);
	app.get('/api/v1/data/news', auth, StockDataController.getNewsData);
	app.get('/api/v1/data/search', auth, StockDataController.searchQuery);
}