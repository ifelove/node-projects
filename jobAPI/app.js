const express=require('express')
const app=express()
require('dotenv').config()
require("express-async-errors");
const port =process.env.PORT || 4000




//middleware

app.use(express.json())







app.listen(port,()=>{console.log(`server listening on ${port}......`)})