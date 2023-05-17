const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 7000;
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");




//connectdb
const connectDB = require("./db/connectDB");

//router
const authRoute = require("./route/auth");
const jobRoute = require("./route/job");

//middleware

app.use(express.json());

app.use("/api/v1/jobs", jobRoute);
app.use("/api/v1/auth", authRoute);
//route
//app.get("/", (req, res) => {
//  res.status(201).send("hello world");
//});

app.use(errorHandler);
app.use(notFound);

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`server listening on ${port}......`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
