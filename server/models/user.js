const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String,
		required: false,
		default: null
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;