const Job = require("../model/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../error");
const { trusted } = require("mongoose");

const getAllJobs = async (req, res) => {
  //we are looking for all the jobs for a particular user
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
  const job = await Job.findOne({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`No job with ifd ${jobID}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // res.json(req.user); //remember user is now availabe as a request too
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company,position },
    user: { userID },
    params: { id: jobID },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("company or position must not be empty");
  }

 // const job = await Job.findByIdAndUpdate
    const job = await Job.findOneAndUpdate(
    { _id: jobID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobID}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
  //Job.findByIdAndRemove
  const job = await Job.findOneAndDelete({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobID}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getSingleJob, deleteJob, updateJob, createJob };
