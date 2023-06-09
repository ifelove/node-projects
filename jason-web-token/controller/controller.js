const jwt = require("jsonwebtoken");
//const CustomAPIError = require("../error/custom-error");
const { BadRequestError } = require("../error");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const id = new Date().getDate(); //in production,id should be coming from the database
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).send({
    msg: `Hello ${req.user.username} `,
    secret: `Here is your authorised data,your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
