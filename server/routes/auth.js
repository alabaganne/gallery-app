const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const saltRounds = 10;

router.post(
	'/login',
	body('email').isEmail(),
	body('password').isLength({ min: 8 }),
	async function(req, res) {
		// validate request
		const errors = validationResult(req);
		if(!errors.isEmpty()) return res.status(422).send({ errors: errors.array() });

		const { email, password } = req.body;

		// get user from the DB using email address or username
		const user = await User.findOne({ '$or': [{ email }, { password }] });
		if(!user) return res.status(404).send({
			message: 'Invalid credentials'
		});
		
		// compare password in the db with hashed request body password
		bcrypt.compare(req.body.password, user.password, function(err, same) {
			if(same === true) {
				// create and send auth token
				const token = jwt.sign(
					{ userId: user._id },
					process.env.JWT_SECRET
				);

				res.send(token);
			} else {
				res.status(404).send({
					message: 'Invalid credentials'
				});
			}
		});
	}
);

router.post(
	'/register',
	// validate user data
	body('name').isLength({ min: 8, max: 50 }),
	body('username').isLength({ min: 4, max: 50 }),
	body('email').isEmail(),
	body('password').isLength({ min: 8 }),
	async function(req, res) {
		// validate request
		const errors = validationResult(req);
		if(!errors.isEmpty()) return res.status(422).send({ errors: errors.array() });

		const { name, username, email, password } = req.body;
		
		// check if email is available
		let user = await User.findOne({ '$or': [{username}, {password}] });
		if(user) return res.status(400).send({
			message: 'Duplicate email or username'
		});

		bcrypt.hash(password, saltRounds, async function(err, hashedPassword) {
			if(err) {
				console.log(err);
				return res.status(500).send('error');
			}

			try {
				// save new record
				user = new User({ name, username, email, password: hashedPassword }); // _id is generated at this step and added to the variable user
				user.save();

				// success response, redirect user to the login page
				res.status(201).send({
					message: 'User created',
					data: user
				});
			} catch(err) {
				console.log(err);
				res.status(400).send({
					message: 'Error creating user'
				});
			}
		});
	}
);

module.exports = router;