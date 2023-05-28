const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    require: [true, "Please Provide Company"],
    maxlength: 50,
  },
  position: {
    type: String,
    require: [true, "Please Provide Position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "decline", "pending"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: [true, "Please provide user"],
  },
},{timestamps:true});

module.exports = mongoose.model("Job", JobSchema);
