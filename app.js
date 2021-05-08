/*

*/

const express = require("express");
const mongoose = require("mongoose");

const customerRoute = require('./routes/customerRoute');

const app = express();

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/customer",
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    } 
    );
    console.log("You are successfully connected with DB! ");
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
})();

app.use(express.json());

app.use('/checkemail', customerRoute);

module.exports = app;
