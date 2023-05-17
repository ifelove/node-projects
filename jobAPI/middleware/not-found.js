const notFound=(req,res,next)=>{
    res.status(401).json('Page not found')
}

module.exports=notFound