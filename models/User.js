const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	passwordDigest: {
		type: String
	},
	buyingPower: {
		default: 0,
		type: Number,
		required: true
	},
	portfolioValue: {
		default: 0,
		type: Number,
		required: true
	},
	ownedStocks: [
		{
			name: String,
			averagePrice: Number,
			numberOfStocks: Number,
		}
	],
	watchLists: [
		{
			name: String,
			stocks: [String]
		}
	],
	phoneNumber: {
		default: "",
		type: String
	},
	address1: {
		default: "",
		type: String
	},
	address2: {
		default: "",
		type: String
	},
	created: {
		type: Date,
		default: Date.now,
		required: true
	}
})

const User = mongoose.model('users', userSchema);
module.exports = User;