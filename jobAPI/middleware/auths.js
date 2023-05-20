const User=require('../model/User')
const jwt=require('jsonwebtoken')
const {UnauthenticatedError}=require('../error')



const auth= async (req,res,next)=>{
    //check headers

    const authHeader=req.headers.authorization
    if(!authHeader || ! authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Aunthentication inValid')
    }
    const token=authHeader.split(' ')[1]

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET); //result coming from user model when sign in jwt
      //attached user to the job route
      /** this work the same way,but since we dont av functionality to remove user we go with the other one
const user=User.findById(payload.id).select(-password)
req.user=user
  */
      req.user = { userID: payload.userID, name: payload.name };
      next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid token')
    }
    
}




module.exports=auth