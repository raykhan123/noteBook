const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./routes/route"); // Import routes
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON
app.get('/', (req, res) => res.send('Server is up on UAT'))
app.use('/', route); // Use the router for all routes

mongoose.connect(process.env.Mongo_String, {
  useNewUrlParser: true,
})
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err));

// Test route
app.get('/', (req, res) => res.send('Hello World'));

// Start the server
app.listen(port, () => {
  console.log("App is running on port " + port);
});
