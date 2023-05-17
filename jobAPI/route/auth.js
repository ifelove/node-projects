const express = require("express");
const router = express.Router();

const {
  login,registerUser
} = require("../controller/auth");



//router.route('/login').get(login)
router.post('/login',login)
router.post('/register',registerUser)


module.exports=router