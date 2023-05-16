const CustomAPIError = require("../error/custom-error");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
 // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token Provided", 401);
  }
  const token = authHeader.split(" ")[1];

try {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const {id,username}=decode
  req.user={id,username }
   next();
} catch (error) {
  throw new CustomAPIError("Not Authorized", 400);
}
 


};

module.exports = authentication;
