let { Schema, model } = require('mongoose');

const imageSchema = new Schema({
	imageUrl: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

imageSchema.index({ imageUrl: 1, userId: 1 }, { unique: true });

const Image = model('Image', imageSchema);

module.exports = Image;