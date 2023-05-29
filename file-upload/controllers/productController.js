const Product=require('../models/Product')
const {StatusCodes}=require('http-status-codes')

const createProduct=async(req,res)=>{
    console.log(req.bod)
    const product=await Product.create(req.body)
    res.status(StatusCodes.OK).json({product})
}

const getAllProducts = async (req, res) => {
  res.send("getting product");
};

module.exports={createProduct,getAllProducts}