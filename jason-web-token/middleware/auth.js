//const CustomAPIError = require("../error/custom-error");
const {UnauthenticatedError}=require('../error')
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
 // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
   // throw new CustomAPIError("No token Provided", 401);
   throw new UnauthenticatedError("No token Provided");
  }
  const token = authHeader.split(" ")[1];

try {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);
  const {id,username}=decode
  req.user={id,username }
   next();
} catch (error) {
 // throw new CustomAPIError("Not Authorized", 400);
 throw new UnauthenticatedError("Not Authorized");
}
 


};

module.exports = authentication;
