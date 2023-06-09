const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const { BadrequestError, UnauthenticatedError } = require("../error");
const bcrypt = require("bcryptjs");
//const jwt=require('jsonwebtoken')

const registerUser = async (req, res) => {
  /**
  const {name,email,password}=req.body
 // if(!name||!email||!password){throw new BadrequestError(`Please provide email and password`) }
 const salt=await bcrypt.genSalt(10)
 const hashedPassword=await bcrypt.hash(password,salt)
const tempUser={name,email,password:hashedPassword}

  const user= await User.create({...tempUser})  // Already set up on the user model
   */

  const user = await User.create({ ...req.body });

  // const token=jwt.sign({userID:user._id,name:user.name},'jwtSecrete',{expiresIn:'30d'})
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

  // res.status(StatusCodes.CREATED).send({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadrequestError("Password or Email not provided");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid creadentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).send({ user: { name: user.name }, token });
};

module.exports = { login, registerUser };
