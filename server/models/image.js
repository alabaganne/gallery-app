const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	// name (randomly generated)
	// path
	// userId
});

const imageModel = mongoose.model('image', imageSchema);