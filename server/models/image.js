let { Schema, model } = require('mongoose');

const imageSchema = new Schema({
	imageUrl: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

imageSchema.index({ email: 1, userId: 1 }, { unique: true });

const Image = model('Image', imageSchema);

module.exports = Image;