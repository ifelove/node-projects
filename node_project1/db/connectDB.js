const mongoose = require("mongoose");



// to let  us connect to database first before spinning up the server

const connectDB = (url) => {
  return mongoose.connect(url).then(() => console.log("connected to DB"));
};

module.exports = connectDB
