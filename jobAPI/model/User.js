const mongoose = require("mongoose");
//import validator from 'validator'
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

UserSchema.pre('save',async function(){

   const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//usin instance method of mongoose
UserSchema.methods.creatJWT=function () {
  return jwt.sign({ userID: this._id, name: this.name }, "jwtSecrete", {
    expiresIn: "30d",
  });//return must be there

}


module.exports = mongoose.model("User", UserSchema);
