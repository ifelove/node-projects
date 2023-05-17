const mongoose = require("mongoose");
//import validator from 'validator'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "username is required"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    // validate: {
    //   validator: validator.isEmail,
    //   message: "Please provide a valid email",
    // },
    unique: true,
  },
  password: {
    type: String,
    require: [true, "username is required"],
    minlength: 6,
  },
});

module.exports = mongoose.model("User", UserSchema);
