require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
const port = 3000;
let authMiidelware = require("./middlewares/auth");
let cors = require("cors");

// connect to mongodb databse
async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_URL);
}
main().catch((err) => console.log("error when connecting to mongodb:", err));

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', authMiidelware, require('./routes/images'));
app.use('/api/users', require('./routes/users'));

app.listen(port, function () {
  console.log("gallery app running on port " + port);
});
