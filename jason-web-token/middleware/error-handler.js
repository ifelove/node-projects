//const errorHandler = (error, req, res, next) => {
//console.log(error)

//res.json({msg:'something went wrong....Try again later'})
//};

//module.exports = errorHandler;
const { CustomAPIError } = require("../error");
const {StatusCodes}=require('http-status-codes')

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  } 
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong....Try again later" });
 
};

module.exports = errorHandler;
