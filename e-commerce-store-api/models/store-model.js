const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["nike", "sony", "samsung", "gucci"],
      message: "{VALUE} is not supported",
    },

    //["Nike", " Sony", "Samsung", "Gucci"],
  },
});

module.exports = mongoose.model("Product", productSchema);
