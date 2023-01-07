let router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Image = require('../models/image');

// localhost:3000/api/images/
router.get('/', async function(req, res) {
	// get auth user images
	const { userId } = req; // coming from the auth middleware

	let images = await Image.find({ userId }, ['_id', 'imageUrl']);
	
	res.send(images);
});

router.post(
	'/',
	body('imageUrl').isLength({ min: 8 }), // no url is shorter than 8 chars
	body('userId').exists({ checkFalsy: true }),
	function(req, res) {
		// request body should contain imageUrl and userId
		let { userId, imageUrl } = req.body;
		if(!userId || !imageUrl) {
			return res.status(422).send({
				message: 'imageUrl and userId are required'
			});
		}

		let image = new Image({ userId, imageUrl });
		image.save(function(err) {
			if(err) return res.status(400).send('error: ' + err);

			// send back image object (contains new image id)
			res.status(201).send({
				message: 'Image saved',
				data: image
			});
		})
	}
);

router.delete('/:id/', async function(req, res) {
	try {
		const result = await Image.deleteOne({ _id: req.params.id });
		if(result.deletedCount > 0) res.send('Image deleted');
		else res.send('Image does not exist');
	} catch(err) {
		console.log('err', err);
		res.status(400).send({
			message: 'Error deleting image'
		});
	}
});


module.exports = router;
