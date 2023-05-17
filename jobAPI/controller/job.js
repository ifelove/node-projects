



const getAllJobs = async (req, res) => {
  res.send("getting all jobs");
};


const getSingleJob = async (req, res) => {
  res.send("getting Single jobs");
};

const createJob = async (req, res) => {
  res.send("Creating job");
};

const updateJob= async (req, res) => {
  res.send("Updating....");
};

const deleteJob = async (req, res) => {
  res.send("Deleting.....");
};






module.exports = { getAllJobs,getSingleJob,deleteJob,updateJob,createJob};
