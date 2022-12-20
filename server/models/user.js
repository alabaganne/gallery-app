const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profileImage: {
		type: String, // path to profile image, e.g: images/profile-{userId}.jpg
		required: false
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;