const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Image = require('../models/image');

router.get('/', function(req, res) {
	// get auth user images
});

// lcalhost:3000/api/images/
router.post(
	'/',
	function(req, res) {
		// req.bodt should contain imageUrl and userId
		let { userId, imageUrl } = req.body;
		if(!userId || !imageUrl) {
			return res.status(422).send('request body should contain both userId and imageUrl');
		}

		let image = new Image({ userId, imageUrl });
		image.save(function(err) {
			if(err) return res.status(400).send('error: ' + err);

			// sned back image id
			res.status(201).send({
				message: 'Image saved successfully',
				data: image
			});
		})
	}
);

router.put(
	'/:id/',
	function(req, res) {
		// update image (description for example)
	}
);

router.delete('/:id/', function(req, res) {
	// delete image
});

