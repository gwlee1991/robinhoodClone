const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

module.exports = app => {
	app.post('/api/v1/signup', userController.signUp);
	app.post('/api/v1/login', userController.logIn);
	app.get('/api/v1/currentuser', auth, userController.getCurrentUser);
	app.post('/api/v1/login/demo', userController.demoLogin);
	// deposit money
	// withdraw money
	// edit profile
	// add to watchlist
	// remove from watchlist
}