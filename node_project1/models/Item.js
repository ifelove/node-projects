const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, " not more than 20 "],
  },
  age: Number,
});

module.exports = mongoose.model("Item", ItemSchema);
