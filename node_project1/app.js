var cors = require("cors");

const connectDB = require("./db/connectDB");

const express = require("express");
const app = express();
app.use(cors());
const port = 4000;
const items = require("./route/item");
require("dotenv").config();




//middleware
app.use(express.json());
//route


app.use("/api/vi/items", items);

//app.get('/api/vi/items') all the items
//app.post('/api/vi/items') new grocery
//app.patch('/api/vi/items/:id') update a particular grocery
//app.get('/api/vi/items/:id') get a single item
//app.delete('/api/vi/items/:id') delete item

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL); //to extract the MONGO_URL variable stored in .envfile using the dotenv libary
    app.listen(port, console.log(`server listening on port ${port}.......`));
  } catch (error) {
    console.log(error);
  }
};

start();
