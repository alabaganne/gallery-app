let router = require('express').Router();
let { body, validationResult } = require('express-validator');
let User = require('../models/user');

const userProjections = ['_id', 'name', 'username', 'email'];

router.get('/', async function(req, res) {
	let users = await User.find({}, userProjections);

	res.send(users);
});

router.get('/:id/', async function(req, res) {
	let user = await User.findOne({ _id: req.params.id }, userProjections);

	res.send(user);
});

module.exports = router;