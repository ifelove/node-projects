const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 7000;
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");



//extra security packages
const xssClean=require('xss-clean')
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");




//connectdb
const connectDB = require("./db/connectDB");
const authenticateUser= require("./middleware/auths");

//router
const authRoute = require("./route/auth");
const jobRoute = require("./route/job");

//middleware




//swagger
const swaggerUI=require('swagger-ui-express')
const YAML=require("yamljs")
const swaggerdoc=YAML.load('./swagger.yaml')


app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerdoc))

app.get("/", (req, res) => {
  res.send(`<h1> api docs is in the link</h1><a href="/api-docs">docs</a>`);
});










app.set('trust proxy',1)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit eaach ip to 100 request per window
  })
);
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xssClean())


//route
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/jobs", authenticateUser ,jobRoute);

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
