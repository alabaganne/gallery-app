const router = require('express').Router();
const { body, validationResult } = require('epxress-validator');

router.get('/', function(req, res) {
	// get auth user images
});

router.post(
	'/',
	function(req, res) {
		// store new image
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

