const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	stockSymbol: {
		type: String,
		required: true
	},
	purchasePrice: {
		type: Number,
		required: true
	},
	purchaseDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	buy: Boolean
});

const Transaction = mongoose.model('transactions', transactionSchema);
module.exports = Transaction;