const notFound=(req,res)=>{
    res.status(401).json('Page not found')
}

module.exports=notFound