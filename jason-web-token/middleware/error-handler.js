//const errorHandler = (error, req, res, next) => {
//console.log(error)

//res.json({msg:'something went wrong....Try again later'})
//};

//module.exports = errorHandler;
const CustomAPIError = require("../error/custom-error");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  } 
    return res
      .status(500)
      .json({ msg: "something went wrong....Try again later" });
 
};

module.exports = errorHandler;
