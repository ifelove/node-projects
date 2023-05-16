const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const mainRoute=require('./route/route')

const port = process.env.port || 4000;

//middleware
//app.use('/login',express.static("./public"));
app.use(express.static("./public"));
app.use(express.json());
app.use('/api/v1',mainRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server listening on port 4000");
});
