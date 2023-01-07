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
		type: String, // path to profile image, e.g: images/profile-{userId}.jpg
		required: false,
		default: null
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;