const path =require('path')
const { StatusCodes } = require("http-status-codes");

const uploadProduct = async (req, res) => {
console.log(req.files)
const productImage=req.files.image
const imagePath=path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
await productImage.mv(imagePath)
res.send('upload')
};



module.exports = { uploadProduct };
