require("dotenv").config();

const connectDB = require("./db/connectDB");
const Product = require("./models/store-model");
const jsonProducts = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany(); //delete all product in the database
    await Product.create(jsonProducts);
    console.log("product added successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
