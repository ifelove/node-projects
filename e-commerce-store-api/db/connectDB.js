const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.connect(url).then(() => {
    console.log("connect to DB successfully");
  });
};


module.exports=connectDB