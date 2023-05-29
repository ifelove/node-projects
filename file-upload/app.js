require('dotenv').config();
require('express-async-errors');
const fileupload=require('express-fileupload')
const cloudinary=require('cloudinary').v2
cloudinary.config({clod_name:process.env.CLOUD_NAME,cloud_api_key:process.env.CLOUD_API_KEY,cloud_api_secret:process.env.CLOUD_API_SECRET})

const productRouter=require('./routes/productRoutes')

const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.static('./public'))
app.use(express.json())
//app.use(fileupload())
app.use(fileupload());//to use tempfile

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products',productRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
