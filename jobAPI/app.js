const express=require('express')
const app=express()
require('dotenv').config()
require("express-async-errors");
const port =process.env.PORT || 4000
const notFound=require('./middleware/not-found')
const errorHandler = require("./middleware/errorHandler");





//middleware

app.use(express.json())





app.use(errorHandler)
app.use(notFound);


//route
app.get('/',(req,res)=>{res.status(201).send("hello world")})






app.listen(port,()=>{console.log(`server listening on ${port}......`)})