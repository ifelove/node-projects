
const mongoose=require('mongoose')


const connectDB=(url)=>{
return mongoose.connect(url).then(()=>{console.log('...conected to DB')})

}

module.exports=connectDB