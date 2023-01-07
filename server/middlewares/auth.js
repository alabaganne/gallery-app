const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	// check Authorization header
	let authHeader = req.get('Authorization');
	console.log('authHeader:', authHeader);
	if(!authHeader) return res.status(403).send('Unauthenticated');

	let token = authHeader.split(' ')[1];
	console.log('token:', token);

	try {
		let decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log('decoded', decoded);

		req.userId = decoded.userId;
		return next();
	} catch(err) {
		// invalid token
		return res.status(401).send('Invalid token');
	}

}