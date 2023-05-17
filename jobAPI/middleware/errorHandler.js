const errorHandler=(error,req,res,next)=>{
    console.log(error)
    res.status(500).json({ msg: "something happened.....try again later" });
}

module.exports=errorHandler