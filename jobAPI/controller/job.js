const Job=require('../model/Job')
const {StatusCodes}=require('http-status-codes')
const {NotFoundError,BadRequestError}=require('../error')



const getAllJobs = async (req, res) => {
  //we are looking for all the jobs for a particular user
 const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdAt');
  res.status(StatusCodes.OK).json({jobs,count:jobs.length});

};


const getSingleJob = async (req, res) => {
  res.send("getting Single jobs");
};

const createJob = async (req, res) => {
 // res.json(req.user); //remember user is now availabe as a request too
 req.body.createdBy=req.user.userID
 const job=await Job.create(req.body)
 res.status(StatusCodes.CREATED).json({job})
};

const updateJob= async (req, res) => {
  res.send("Updating....");
};

const deleteJob = async (req, res) => {
  res.send("Deleting.....");
};






module.exports = { getAllJobs,getSingleJob,deleteJob,updateJob,createJob};
