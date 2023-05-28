const express = require('express')

const router = express.Router()
const { register, login,updateUser } = require('../controllers/auth')
const authenticateUser=require('../middleware/authentication')
const testUser=require('../middleware/testUser')

const rateLimiter=require('express-rate-limit')
const apiLimiiter=rateLimiter({
    windowsMs:15*60*1000,
    max:10,
   message:{ msg:"Too many request from this api please try again later"}
})


router.post('/register',apiLimiiter, register)
router.post('/login',apiLimiiter, login)
router.patch('/updateUser',authenticateUser,testUser,updateUser)

module.exports = router
