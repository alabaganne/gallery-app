const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

require('dotenv').config();

// connect to mongodb databse
async function main() {
	await mongoose.connect(process.env.DB_CONNECTION_URL);
}
main().catch(err => console.log('error when connecting to mongodb:', err));

app.use(express.json());

app.route('/api/images', require('./routes/images'));
app.route('/auth', require('./routes/auth'));


app.listen(port, function() {
	console.log('gallery app running on port ' + port);
});                                                                                   