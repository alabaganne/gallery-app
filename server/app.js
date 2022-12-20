const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.route('/', require('routes/index'));
app.listen(port, function() {
	console.log('gallery app running on port ' + port);
});