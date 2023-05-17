const User=require('../model/User')
const{StatusCodes}=require('http-status-codes')
const {BadrequestError}=require('../error/badRequest-error')


const registerUser= async (req,res)=>{
  const {name,email,password}=req.body
  if(!name||!email||!password){throw new BadrequestError('') }
  const user= await User.create({...req.body})
    res.status(StatusCodes.CREATED).send({user})
}

const login = async (req, res) => {
  res.send("Login.....");
};

module.exports={login,registerUser}