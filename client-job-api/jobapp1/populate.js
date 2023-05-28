
require('dotenv').config();

const mockData = require("./MOCK_DATA1.json");
const Job = require("./models/Job");
const connectDB = require("./db/connect");



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
      await Job.deleteMany()
    await Job.create(mockData);
    console.log('successful')
    process.exit(0)
  } catch (error) {
    console.log(error);
  }
};

start()