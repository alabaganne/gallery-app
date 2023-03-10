require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
const port = process.env.PORT || 3000;
let authMiidelware = require("./middlewares/auth");

// connect to mongodb databse
async function main() {
	mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB_CONNECTION_URL);
}
main().catch((err) => console.log("error when connecting to mongodb:", err));


app.use(express.json());
app.use(cors({
  origin: "*",
}));
app.use(function(req, res, next) {
  console.log(`server running on port ${port} received a request`);
  next();
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', authMiidelware, require('./routes/images'));
app.use('/api/users', require('./routes/users'));

app.listen(port, function () {
  console.log("gallery app running on port " + port);
});
