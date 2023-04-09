const express = require("express");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const storeRouter = require("./route/store-route");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send('<h1>Store AP1</h1> <a href="/api/v1/point"> more</a>');
});

//middleware
app.use(express.json());
app.use("/api/v1/produtcs", storeRouter);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(
      port,
      console.log(`Server is listening on port :${port}.........`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
