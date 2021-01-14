const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signature = require('../configs').jwtSecret;

const generateToken = ({ _id, firstName, lastName, email }) => {
	const data = { _id, firstName, lastName, email };
	const expiration = 60 * 1000 * 60 * 24; // 1 day
	return jwt.sign({ data }, signature, { expiresIn: expiration });
}

const sendToken = (res, user) => {
	const token = generateToken(user);
	res.cookie('access_token', token);
	res.send({
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		watchLists: user.watchLists,
		buyingPower: parseFloat(user.buyingPower).toFixed(2),
		ownedStocks: user.ownedStocks,
		phoneNumber: user.phoneNumber,
		address1: user.address1,
		address2: user.address2,
	})
}

const signUp = async (req, res) => {
	const errors = [];
	const defaultWatchLists = [
		{
			name: 'My First List',
			stocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NFLX']
		}
	];
	const defaultOwnedStocks = [];
	try {
		const { firstName, lastName, email, password } = req.body;
		const emailPattern = /\w+@\w+.\w+/;
		if (!email) errors.push('Please enter your email.')
		if (!emailPattern.test(email)) errors.push('Please enter a valid email address.');
		if (!firstName) errors.push('Please enter a first name.');
		if (!lastName) errors.push('Please enter a last name.');
		if (password.length < 10) errors.push('Password needs to be at least 10 characters.');
		if (errors.length > 0) throw { name: "Validation Error", message: errors};
		const existingUser = await User.findOne({ email });
		if (existingUser) res.status(409).send(['This email already exists.']);

		const passwordDigest = await bcrypt.hash(password, 10);

		const user = await new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
			passwordDigest: passwordDigest,
			ownedStocks: defaultOwnedStocks,
			watchLists: defaultWatchLists
		}).save();
		sendToken(res, user);
	} catch (err) {
		if (err.name === "Validation Error") {
			res.status(422).send(err.message);
		} else {
			res.status(400).send(['Unknown error has occurred']);
		}
	}
}

const logIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (!existingUser) throw { name: 'Validation Error', message: [`Your email address could not be found.`] }

		const match = await bcrypt.compare(password, existingUser.passwordDigest);

		if (match) { 
			sendToken(res, existingUser);
		} else {
			throw { name: 'validation Error', message: ['Incorrect password. Please try again.']};
		}
	} catch (err) {
		if (err.name === "Validation Error") {
			res.status(422).send(err.message);
		} else {
			res.status(400).send(["Unknown error has occurred."]);
		}
	}
}

const getCurrentUser = async (req, res) => {
	try {
		const { _id } = req.user;
		const user = await User.findById(_id);
		sendToken(res, user);
	} catch (err) {
		console.log(err);
		res.status(400).send(['Unknown error has occurred.']);
	}
}

const demoLogin = async (req, res) => {
	try {
		const demoUser = await User.findOne({ email: 'demo_account@demo.com' });
		sendToken(res, demoUser);
	} catch (err) {
		res.status(400).send(['Unknown error has occurred.'])
	}
}

const addWatchList = async (req, res) => {
	try {
		const { _id } = req.user;
		const user = await User.findById(_id);
		const { watchListName } = req.body;
		const existsDuplicateName = () => {
			let exists = false;
			user.watchLists.forEach(list => {
				if (list.name === watchListName) {
					exists = true;
				}
			})
			return exists;
		}
		if (existsDuplicateName(watchListName)) {
			throw { name: 'Duplicate Entry', message: 'Same watch list name already exists.'};
		}

		user.watchLists.push({ name: watchListName });
		await user.save();
		sendToken(res, user);
	} catch (err) {
		console.log(err);
		if (err.name === 'Duplicate Entry') {
			res.status(409).send([err.message]);
		} else {
			res.status(400).send(['Unknown error has occurred.']);
		}
	}
}

const deleteWatchList = async (req, res) => {
	const { _id } = req.user;
	try {
		let user = await User.findById(_id);
		console.log(req.body);
		const { watchlistName } = req.body;
		user.watchLists = user.watchLists.filter(watchlist => watchlist.name !== watchlistName);
		user = await user.save();
		sendToken(res, user);
	} catch (err) {
		res.status(400).send(['Unknown error has occurred']);
	}
}

const editWatchList = async (req, res) => {
	const { _id } = req.user;
	try {
		let user = await User.findById(_id);
		const { watchlistName, newWatchlistName } = req.body;
		user.watchLists = user.watchLists.map(watchlist => {
			if (watchlist.name === watchlistName) {
				watchlist.name = newWatchlistName;
			}
			return watchlist;
		});
		user = await user.save();
		sendToken(res, user);
	} catch (err) {
		res.status(400).send(['Unknown error has occurred']);
	}
}

const addStockToWatchList = () => {}
const removeStockToWatchList = () => {}

const addBuyingPower = async(req, res) => {
	const { _id } = req.user;
	try {
		let user = await User.findById(_id);
		const { buyingPower } = req.body;
		if (parseFloat(buyingPower) < 0) throw { name: "Invalid Entry", message: ['Please enter a valid amount.']}
		user.buyingPower += parseFloat(buyingPower);
		user = await user.save()
		sendToken(res, user);
	} catch(err) {
		console.log(err);
		switch (err.name) {
			case "Invalid Entry":
				res.status(422).send(err.message);
			default:
				res.status(400).send(['Unknown error has occurred.']);
		}
	}
}

module.exports = {
	signUp, logIn, getCurrentUser, demoLogin, addWatchList, addBuyingPower, deleteWatchList, editWatchList
}