const CustomAPIError = require("../error/customAPIError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
  let customErrorObject = {
    //set default
    statusCodes: error.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something went wrong...try again",
  };
  /**
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
 */

if(error.name==='ValidationEror'){
  customErrorObject.msg=Object.values(error.errors).map((item)=>item.message).join(',')
  customErrorObject.statusCodes=400
}
if(error.name==='CastError'){ customErrorObject.msg = `No tem find with the ID ${error.value}`;
customErrorObject.statusCodes = 404;}


  if (error.code && error.code === 11000) {
    customErrorObject.msg = `Duplicate value enter for ${Object.keys(
      error.keyValue
    )} field,please  choose another`;
    customErrorObject.statusCodes = 400;
  }
  //these two codes are not nececessary again, just to show some giant objects now
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  // return res.status(customErrorObject.statusCodes).json({ msg:customErrorObject.msg });
};

module.exports = errorHandler;
