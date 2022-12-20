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
		// get user from the DB using email address
		const user = await User.findOne({ email: req.body.email });
		if(user) {
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
					res.send('invalid credentials');
				}
			});
		} else {
			res.send(404).send('invalid credentials');
		}
	}
);

router.post(
	'/register',
	// validate user data
	body('name').isLength({ min: 8, max: 50 }),
	body('email').isEmail(),
	body('password').isLength({ min: 8 }).equals('passwordConfirmation'),
	function(req, res) {
		// check if email is available
		let user = User.findOne({ email: req.body.email });
		console.log('user', user);
		if(user) {
			return res.status(400).send('email is used');
		}

		bcrypt.hash(req.body.password, saltRounds, async function(err, hashedPassword) {
			if(err) {
				console.log(err);
				res.status(500).send('error');
			}

			try {
				// save new record
				user = new User({
					name: req.body.email,
					email: req.body.email,
					password: hashedPassword
				});

				await user.save();

				// success response, redirect user to sign up page
				res.status(201).send('user created');
			} catch(err) {
				console.log(err);
			}


		})
	}
);