const jwt = require('jsonwebtoken');
const signature = require('../configs').jwtSecret;

module.exports = (req, res, next) => {
	try {
		const token = req.cookies.access_token;
		if (!token) {
			res.send(null);
		} else {
			const decoded = jwt.verify(token, signature);
			req.user = decoded.data;
			next();
		}
	} catch (err) {
		res.status(400).send({ message: 'Unkown error has occurred'});
	}
}